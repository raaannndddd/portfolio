/* ============================================================
   tap-hints.js — the badges that say "this one answers"

   A room full of beautifully baked furniture looks exactly as
   pressable as a photograph. The name tag only appears once the
   cursor is already on the thing, which is no help to anyone who
   never thought to move it there.

   Two badges, and the difference between them is the point:

     kind:'tap'   the hand, with a slow ripple. One per room — the
                  headline object, the thing the room is *for*. The
                  bedroom gets two only because its headline is a
                  pair of certificates.
     kind:'write' the pen. The one badge in a room that opens a way
                  to write to me — the letter, the note, the place
                  card. It carries an icon for the same reason the
                  hand does: it is a thing worth finding, and the
                  drawing says what pressing it gets you.
     kind:'dot'   an empty circle. Everything else that answers to a
                  press. No drawing at all — a lamp switch does not
                  need explaining, it needs noticing, and a bare disc
                  is quiet enough to sit on furniture while still
                  reading as a control. Leaving these blank is what
                  makes the two drawn badges mean something.

   Both are real <button>s: they can be tabbed to, they say what
   they do out loud, and pressing one runs the same code the 3D
   object runs. That is the whole keyboard route into a WebGL
   canvas, thrown in for free.

   Usage, from inside a room's script:

     const hints = TapHints.init({
       THREE: THREE, camera: camera,
       enabled: function(){ return openIndex < 0; }   // optional
     });
     hints.add({ kind:'tap', object: shelf,
                 label: 'Open the projects book',
                 onActivate: openBookAt });
     ...
     hints.update();            // once a frame, after the camera moves

   add() options
     kind        'tap', 'write' or 'dot' (the default)
     object      the thing to pin to. The badge sits at the centre of
                 its bounding box unless told otherwise
     local       [x,y,z] in the object's own space — use this on
                 anything rotated, like a side-wall door
     offset      [x,y,z] in world space, added last
     position    [x,y,z] — a fixed world point, no object at all
     label       what the badge says on hover, and to a screen reader
     onActivate  what a press runs
     visible     a predicate, for props that fade in and out
     roomy       true to widen the press target past the drawn disc, for a
                 badge whose near-misses land on something costly
   ============================================================ */
(function(){
"use strict";

var HAND =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74a4.5 4.5 0 1 0-9 0c0 1.56.79 2.93 2 3.74z"/>' +
  '<path d="M18.84 15.87l-4.54-2.26a1.5 1.5 0 0 0-.54-.11H13v-6a1.5 1.5 0 0 0-3 0v10.74l-3.44-.72a1 1 0 0 0-1.02.31l-.75.76 4.87 4.87c.28.28.66.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27a1.5 1.5 0 0 0-.82-1.58z"/>' +
  '</svg>';

/* the pen. Nothing else in a room writes, so it never has to compete for
   its meaning — wherever it turns up, the answer at the other end is a box
   to type in. Drawn as a nib on a diagonal rather than a full quill, which
   stays legible at 14 pixels. */
var PEN =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<path d="M4 20.2 4.9 16l10.4-10.4a2 2 0 0 1 2.8 0l.3.3a2 2 0 0 1 0 2.8L8 19.1z"/>' +
  '<path d="M13.4 7.5 16.5 10.6"/></svg>';

var CSS = [
'#tap-hints{position:fixed;inset:0;z-index:4;pointer-events:none}',
'.tap-hint{position:absolute;left:0;top:0;margin:0;padding:0;border:0;',
'  border-radius:999px;background:#fffdf9;color:#1c1a17;',
'  display:grid;place-items:center;cursor:pointer;pointer-events:auto;',
'  font-family:"Helvetica Neue",Inter,system-ui,-apple-system,"Segoe UI",sans-serif;',
'  transition:opacity .3s ease,background .25s ease,color .25s ease,box-shadow .25s ease}',
'.tap-hint[hidden]{display:none}',
/* `roomy` badges carry an invisible collar of extra hit area. A badge on a
   25-pixel disc floating over a room where the wrong near-miss walks the
   camera somewhere else is a target with a real cost to missing — so the
   ones that sit next to an expensive mistake get a wider catchment than
   they look like they have. Deliberately not the default: badges that sit
   near each other would start stealing one another's presses. */
'.tap-hint.roomy::after{content:"";position:absolute;inset:-16px;border-radius:999px}',
'.tap-hint svg{display:block;transition:transform .25s cubic-bezier(.2,.8,.2,1)}',
'.tap-hint:hover{background:#1c1a17;color:#fffdf9}',
'.tap-hint:hover svg{transform:scale(1.1)}',
'.tap-hint:active svg{transform:scale(.9)}',
'.tap-hint:focus-visible{outline:2px solid #1c1a17;outline-offset:3px}',
/* --- the hand: the one thing the room is for ------------------- */
'.tap-hint.tap{width:38px;height:38px;box-shadow:0 6px 18px rgba(28,22,14,.22)}',
'.tap-hint.tap svg{width:21px;height:21px;fill:currentColor}',
'.tap-hint.tap:hover{box-shadow:0 10px 24px rgba(28,22,14,.30)}',
/* one slow ring, so it reads as "press me" rather than as a sticker
   somebody left on the furniture */
'.tap-ring{position:absolute;inset:-3px;border-radius:999px;',
'  border:2px solid rgba(28,26,23,.5);opacity:0;pointer-events:none;',
'  animation:tapRing 2.8s cubic-bezier(.2,.7,.3,1) infinite}',
'@keyframes tapRing{',
'  0%{transform:scale(.88);opacity:0}',
'  14%{opacity:.55}',
'  72%,100%{transform:scale(1.8);opacity:0}}',
'.tap-hint.used .tap-ring{animation:none}',
/* --- the empty circle: everything else that answers ------------ */
'.tap-hint.dot{width:25px;height:25px;opacity:.82;',
'  box-shadow:0 3px 10px rgba(28,22,14,.20)}',
'.tap-hint.dot:hover,.tap-hint.dot:focus-visible{opacity:1}',
/* --- the pen: the way to write to me --------------------------- */
'.tap-hint.write{width:29px;height:29px;opacity:1;',
'  box-shadow:0 4px 14px rgba(28,22,14,.22)}',
'.tap-hint.write svg{width:16px;height:16px;fill:none;stroke:currentColor;',
'  stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}',
'.tap-hint.write:hover{box-shadow:0 8px 20px rgba(28,22,14,.28)}',
/* the name, shown only once the badge itself is under the cursor —
   out in the room the object keeps its own tag */
'.tap-label{position:absolute;left:50%;top:calc(100% + 8px);transform:translateX(-50%);',
'  white-space:nowrap;background:#1c1a17;color:#fffdf9;border-radius:8px;',
'  padding:5px 9px;font-size:12px;letter-spacing:.01em;line-height:1.2;',
'  opacity:0;pointer-events:none;transition:opacity .2s ease}',
'.tap-hint:hover .tap-label,.tap-hint:focus-visible .tap-label{opacity:1}',
/* once it has been pressed it steps back — the lesson has landed */
'.tap-hint.tap.used{opacity:.55}',
'.tap-hint.used:hover,.tap-hint.used:focus-visible{opacity:1}',
'#tap-hints.off .tap-hint{opacity:0;pointer-events:none}',
'@media (max-width:820px){',
'  .tap-hint.tap{width:34px;height:34px}.tap-hint.tap svg{width:19px;height:19px}',
'  .tap-hint.dot{width:23px;height:23px}',
'  .tap-hint.write{width:27px;height:27px}.tap-hint.write svg{width:15px;height:15px}}',
'@media (prefers-reduced-motion:reduce){',
'  .tap-ring{animation:none;opacity:.4;transform:scale(1.08)}',
'  .tap-hint,.tap-hint svg{transition:none}}'
].join('\n');

var styled = false;
function ensureStyle(){
  if(styled) return;
  styled = true;
  var s = document.createElement('style');
  s.textContent = CSS;
  document.head.appendChild(s);
}

function clamp(v, lo, hi){ return v < lo ? lo : v > hi ? hi : v; }

function init(opts){
  opts = opts || {};
  var THREE  = opts.THREE || window.THREE;
  var camera = opts.camera;
  if(!THREE || !camera) throw new Error('TapHints.init needs THREE and a camera');

  ensureStyle();
  var layer = document.getElementById('tap-hints');
  if(!layer){
    layer = document.createElement('div');
    layer.id = 'tap-hints';
    document.body.appendChild(layer);
  }

  var hints = [];
  var enabled = opts.enabled || function(){ return true; };
  var v = new THREE.Vector3(), c = new THREE.Vector3(), box = new THREE.Box3();
  var wasOn = true;

  function anchorAt(cfg, out){
    if(cfg.position) return out.fromArray(cfg.position);
    var o = cfg.object;
    o.updateWorldMatrix(true, true);
    if(cfg.local){
      out.fromArray(cfg.local);
      o.localToWorld(out);
    } else {
      box.setFromObject(o);
      if(box.isEmpty()) o.getWorldPosition(out);
      else box.getCenter(out);
    }
    if(cfg.offset){
      out.x += cfg.offset[0]; out.y += cfg.offset[1]; out.z += cfg.offset[2];
    }
    return out;
  }

  var api = {
    /* ---- pin one badge to one thing ---------------------------- */
    add: function(cfg){
      var tap   = cfg.kind === 'tap';
      var write = cfg.kind === 'write';
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'tap-hint ' + (tap ? 'tap' : write ? 'dot write' : 'dot') +
                     (cfg.roomy ? ' roomy' : '');
      el.setAttribute('aria-label', cfg.label || 'Open this');
      el.innerHTML = (tap ? '<span class="tap-ring" aria-hidden="true"></span>' + HAND :
                      write ? PEN : '') +
                     '<span class="tap-label">' + (cfg.label || '') + '</span>';
      layer.appendChild(el);

      /* where it lives in the world, measured once. Objects that move —
         a wardrobe door, a lifted photo — are followed by carrying the
         measurement as an offset from their own origin. */
      var world = anchorAt(cfg, new THREE.Vector3());
      var h = {
        cfg: cfg, el: el,
        fixed: cfg.position ? world.clone() : null,
        object: cfg.object || null,
        delta: new THREE.Vector3(),
        ref: Math.max(0.6, camera.position.distanceTo(world)),
        visible: cfg.visible || null,
        x: -1e6, y: -1e6, s: 0, shown: true
      };
      if(h.object){
        h.object.getWorldPosition(c);
        h.delta.copy(world).sub(c);
      }
      el.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        /* the ripple has done its job the moment it is pressed */
        el.classList.add('used');
        if(cfg.onActivate) cfg.onActivate();
      });
      hints.push(h);

      var labelEl = el.querySelector('.tap-label'), labelText = cfg.label || '';
      return {
        el: el,
        /* safe to call every frame — a room can just paint its labels from
           state in the loop and never think about who toggled what */
        label: function(text){
          if(text === labelText) return;
          labelText = text;
          el.setAttribute('aria-label', text);
          labelEl.textContent = text;
        },
        remove: function(){
          var i = hints.indexOf(h);
          if(i > -1) hints.splice(i, 1);
          if(el.parentNode) el.parentNode.removeChild(el);
        }
      };
    },

    /* ---- once a frame, after the camera has been placed --------- */
    update: function(){
      var on = enabled();
      if(on !== wasOn){
        wasOn = on;
        layer.classList.toggle('off', !on);
      }
      var W = innerWidth, H = innerHeight;
      for(var i = 0; i < hints.length; i++){
        var h = hints[i];
        var show = on && (!h.visible || h.visible());
        if(show){
          if(h.fixed) v.copy(h.fixed);
          else { h.object.getWorldPosition(v); v.add(h.delta); }
          var dist = camera.position.distanceTo(v);
          v.project(camera);
          /* behind the eye, or well off the side of the screen */
          if(v.z > 1) show = false;
          else {
            var x = ( v.x*0.5 + 0.5)*W;
            var y = (-v.y*0.5 + 0.5)*H;
            if(x < -70 || y < -70 || x > W + 70 || y > H + 70) show = false;
            else {
              /* a badge on something across the room is smaller, but never
                 so small it stops being a target */
              var s = clamp(h.ref/dist, 0.62, 1.25);
              if(Math.abs(x - h.x) > 0.4 || Math.abs(y - h.y) > 0.4 ||
                 Math.abs(s - h.s) > 0.006){
                h.x = x; h.y = y; h.s = s;
                h.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' +
                  y.toFixed(1) + 'px,0) translate(-50%,-50%) scale(' + s.toFixed(3) + ')';
              }
            }
          }
        }
        if(show !== h.shown){ h.shown = show; h.el.hidden = !show; }
      }
    },

    /* the room can hand over a new rule at any time — an overlay opening,
       a walk starting — rather than reaching in and hiding badges itself */
    setEnabled: function(fn){
      enabled = (typeof fn === 'function') ? fn : function(){ return !!fn; };
    },

    /* how many are on the board, for the rooms that want to know */
    count: function(){ return hints.length; }
  };

  /* a badge is a fixed-position button over a canvas that eats gestures —
     make sure a press on one never also reaches the room behind it */
  ['pointerdown', 'pointerup', 'wheel'].forEach(function(type){
    layer.addEventListener(type, function(e){
      if(e.target.closest && e.target.closest('.tap-hint')) e.stopPropagation();
    });
  });

  return api;
}

window.TapHints = { init: init };

})();
