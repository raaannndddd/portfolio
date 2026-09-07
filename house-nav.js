/* ============================================================
   house-nav.js — one include, four jobs:
     1. the room-to-room nav: a rail along the bottom where there
        is width for it, one bar across the top where there is not
     2. the departure veil, so leaving a page fades into the
        colour the next page fades in from
     3. getting the next room ready before it is asked for
     4. the CV: a link beside Contact that opens the PDF in a tab
        of its own. The file is already fetched by preload.js, so
        the tab opens on a document rather than on a download.
   Every page carries its own arrival fade (#fade); this script
   only has to match its colour on the way out for the cut to
   be invisible.
   ============================================================ */
(function(){
"use strict";

/* On the light path the written page and the contact page are the whole
   site, and each carries its own links. A pinned rail of room names would
   only offer doors lite.js is going to shut behind them — and the
   speculation further down would prefetch, and prerender, five WebGL
   rooms nobody on that path can open. */
if(window.HOUSE_LITE) return;

var PAGES = [
  {file:'entrance.html', label:'Entrance',   fade:'#0e0c09', section:'the front room'},
  {file:'dining.html',   label:'Experience', fade:'#efece6', section:'experience'},
  {file:'living.html',   label:'Projects',   fade:'#0e0c09', section:'projects'},
  {file:'office.html',   label:'Skills',     fade:'#0e0c09', section:'skills'},
  {file:'bedroom.html',  label:'Education',  fade:'#0e0c09', section:'education'},
  {file:'kitchen.html',  label:'About',      fade:'#0e0c09', section:'about me'},
  {divider:true},
  {file:'writing.html',  label:'Writing',    fade:'#f4ede0', section:'the whole house, on paper'},
  {file:'contact.html',  label:'Contact',    fade:'#f4ede0', section:'say hello'},
  /* not a room: the PDF, opened in a tab of its own */
  {cv:true,              label:'CV',                         section:'my CV, one page'}
];

/* where the file lives — the address the nav link opens in a new tab.
   preload.js has usually pulled it into the cache by then. */
var CV_URL  = 'CV/Rand_Halasa_Resume.pdf';

var here = location.pathname.split('/').pop() || 'entrance.html';
var reduced = matchMedia('(prefers-reduced-motion: reduce)');

function pageFor(file){
  for(var i=0;i<PAGES.length;i++) if(PAGES[i].file === file) return PAGES[i];
  return null;
}

/* ---- styles --------------------------------------------------
   Two shapes, and the viewport picks one. The test is the same
   one lite.js asks — 900px of width and a fine pointer — written
   as a media query rather than read off its class, so a laptop
   window dragged narrow changes shape with it and there is never
   a moment with two bars up or none.

     roomy    the rail: nine destinations laid out along the
              bottom, out of the way of a room you are looking at

     compact  one bar across the top, carrying where you are and
              a button for everywhere else. Nine pills do not fit
              across 390px at a size worth tapping, and a rail
              that scrolls sideways hides its own ends.

   The compact bar sits at z-index 7: above the room's own HUD (5)
   and below every overlay in the house (8), so opening the book
   or a photograph covers it rather than fighting it.
   ------------------------------------------------------------- */
var ROOMY   = '@media (min-width:900px) and (pointer:fine){';
var COMPACT = '@media (max-width:899px),(pointer:coarse){';

var css = [
'#house-nav{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:40;',
'  padding:6px;background:#fffdf9;border-radius:999px;',
'  box-shadow:0 8px 30px rgba(28,22,14,.20);',
'  font-family:"Helvetica Neue",Inter,system-ui,-apple-system,"Segoe UI",sans-serif;}',
'#hn-bar{display:none}',
'#hn-links{display:flex;align-items:center;gap:2px;',
'  max-width:min(94vw,calc(100vw - 200px));overflow-x:auto;scrollbar-width:none;',
'  -webkit-overflow-scrolling:touch;white-space:nowrap;}',
'#hn-links::-webkit-scrollbar{display:none}',
'#house-nav a{flex:0 0 auto;display:block;padding:9px 14px;border-radius:999px;',
'  font-size:13px;letter-spacing:.02em;color:#1c1a17;text-decoration:none;',
'  transition:background .25s,color .25s,transform .25s cubic-bezier(.2,.8,.2,1);}',
'#house-nav a:hover{background:rgba(28,26,23,.07);transform:translateY(-1px)}',
'#house-nav a:focus-visible{outline:2px solid #1c1a17;outline-offset:2px}',
'#house-nav a[aria-current="page"]{background:#1c1a17;color:#fffdf9}',
'#house-nav .nav-div{flex:0 0 auto;width:1px;height:18px;margin:0 6px;',
'  background:rgba(28,26,23,.18)}',
'#house-veil{position:fixed;inset:0;z-index:80;opacity:0;pointer-events:none;',
'  transition:opacity .28s ease}',

/* --- the rail, and the HUD furniture it displaces ------------- */
ROOMY,
'  #back{bottom:88px !important}',
'  #hint{bottom:92px !important}',
'}',

/* --- the bar -------------------------------------------------- */
COMPACT,
'  #house-nav{top:0;left:0;right:0;bottom:auto;transform:none;z-index:7;',
'    max-width:none;padding:0;border-radius:0;',
'    background:rgba(255,253,249,.95);',
'    -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);',
'    box-shadow:0 1px 0 rgba(28,26,23,.10),0 6px 18px rgba(28,22,14,.10);',
'    padding-top:env(safe-area-inset-top,0px);}',
/* where you are, and the way to everywhere else */
'  #hn-bar{display:flex;align-items:center;justify-content:space-between;',
'    gap:12px;padding:9px 12px 9px 16px;}',
'  #hn-where{font-size:14px;font-weight:600;letter-spacing:.01em;color:#1c1a17;',
'    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
'  #hn-toggle{flex:none;display:flex;align-items:center;gap:8px;cursor:pointer;',
'    font-family:inherit;font-size:13px;color:#1c1a17;background:#fffdf9;',
'    border:1px solid rgba(28,26,23,.16);border-radius:999px;padding:7px 13px;}',
'  #hn-toggle:focus-visible{outline:2px solid #1c1a17;outline-offset:2px}',
'  .hn-burger{display:block;width:14px}',
'  .hn-burger i{display:block;height:1.5px;background:#1c1a17;border-radius:2px;',
'    transition:transform .2s ease,opacity .2s ease}',
'  .hn-burger i + i{margin-top:3.5px}',
/* the three bars become a cross while the panel is open, so the button
   says how to close what it opened */
'  [aria-expanded="true"] .hn-burger i:nth-child(1){transform:translateY(5px) rotate(45deg)}',
'  [aria-expanded="true"] .hn-burger i:nth-child(2){opacity:0}',
'  [aria-expanded="true"] .hn-burger i:nth-child(3){transform:translateY(-5px) rotate(-45deg)}',
/* the panel: every destination, wrapped, nothing scrolled out of sight */
'  #hn-links{display:none;flex-wrap:wrap;justify-content:flex-start;gap:7px;',
'    max-width:none;overflow:visible;white-space:normal;',
'    padding:2px 14px 13px;border-top:1px solid rgba(28,26,23,.08);}',
'  #house-nav.open #hn-links{display:flex}',
'  #house-nav a{padding:9px 13px;font-size:13.5px;',
'    border:1px solid rgba(28,26,23,.14);background:#fffdf9}',
'  #house-nav a:hover{transform:none}',
'  #house-nav .nav-div{display:none}',
/* the bar names the room, so the room nameplate would say it twice */
'  #plaque{display:none !important}',
/* nothing is pinned along the bottom any more, so nothing has to dodge it */
'  #back{bottom:22px !important}',
'  #hint{bottom:26px !important}',
/* the written page brings its own sections bar, and one bar is the rule */
'  #house-nav.hn-doc{display:none}',
'}',
'@media (prefers-reduced-motion:reduce){#house-veil{transition-duration:.01ms}}'
].join('\n');

var style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

/* ---- the nav ------------------------------------------------- */
var nav = document.createElement('nav');
nav.id = 'house-nav';
nav.setAttribute('aria-label', 'House rooms');

/* the bar. Present in both shapes and shown in one: building it here
   rather than only on small screens means a window dragged narrow has
   it already, with nothing to construct at the moment of the resize. */
var hereLabel = 'Rand Halasa';
for(var i=0;i<PAGES.length;i++){
  if(PAGES[i].file === here) hereLabel = PAGES[i].label;
}
var bar = document.createElement('div');
bar.id = 'hn-bar';
bar.innerHTML =
  '<span id="hn-where">' + hereLabel + '</span>' +
  '<button type="button" id="hn-toggle" aria-expanded="false" aria-controls="hn-links">' +
    '<span class="hn-burger" aria-hidden="true"><i></i><i></i><i></i></span>' +
    '<span>Rooms</span>' +
  '</button>';
nav.appendChild(bar);

var links = document.createElement('div');
links.id = 'hn-links';
nav.appendChild(links);

PAGES.forEach(function(p){
  if(p.divider){
    var d = document.createElement('span');
    d.className = 'nav-div';
    d.setAttribute('aria-hidden', 'true');
    links.appendChild(d);
    return;
  }
  if(p.cv){
    /* a plain link like every other item, only it leaves the house: the
       PDF opens in its own tab, so the room behind it is never disturbed
       and middle-click, cmd-click and save-as all mean what they say */
    var c = document.createElement('a');
    c.href = CV_URL;
    c.target = '_blank';
    c.rel = 'noopener';
    c.textContent = p.label;
    c.title = p.section;
    links.appendChild(c);
    return;
  }
  var a = document.createElement('a');
  a.href = p.file;
  a.textContent = p.label;
  a.title = p.section;
  if(p.file === here) a.setAttribute('aria-current', 'page');
  links.appendChild(a);
});

/* the written page is a document with its own sticky sections bar, and
   two bars stacked on a phone is one too many. It keeps the rail on a
   wide screen, where the rail sits along the bottom out of the way. */
if(here === 'writing.html') nav.className = 'hn-doc';

document.body.appendChild(nav);

/* ---- opening and closing the panel --------------------------- */
var toggle = document.getElementById('hn-toggle');
function setOpen(open){
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
}
toggle.addEventListener('click', function(){
  setOpen(!nav.classList.contains('open'));
});
/* a tap on a destination is an answer, so the panel has done its job —
   and the room behind it should not be uncovered by a bar still open */
links.addEventListener('click', function(e){
  if(e.target.closest && e.target.closest('a')) setOpen(false);
});
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape' && nav.classList.contains('open')){
    setOpen(false);
    try{ toggle.focus(); }catch(_){}
  }
});
document.addEventListener('click', function(e){
  if(nav.classList.contains('open') && !nav.contains(e.target)) setOpen(false);
});

/* ---- the departure veil -------------------------------------- */
var veil = null, leaving = false;
function go(file){
  if(leaving) return;
  leaving = true;
  var dest = pageFor(file);
  if(reduced.matches || !dest){ location.href = file; return; }
  if(!veil){
    veil = document.createElement('div');
    veil.id = 'house-veil';
    document.body.appendChild(veil);
  }
  veil.style.background = dest.fade;
  veil.style.pointerEvents = 'auto';
  /* force a layout so the opacity change actually transitions */
  void veil.offsetWidth;
  veil.style.opacity = '1';
  /* matches the veil's .28s ramp — navigate the moment it is opaque,
     rather than sitting on a finished fade doing nothing. */
  setTimeout(function(){ location.href = file; }, 300);
}

nav.addEventListener('click', function(e){
  var a = e.target.closest ? e.target.closest('a') : null;
  if(!a) return;
  if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  /* anything opening in its own tab is not a departure — no veil, and
     the browser's own handling is exactly what we want */
  if(a.target === '_blank') return;
  var file = a.getAttribute('href');
  if(file === here) { e.preventDefault(); return; }
  e.preventDefault();
  go(file);
});

/* coming back via bfcache: lift the veil, we're home again */
addEventListener('pageshow', function(e){
  if(e.persisted && veil){
    veil.style.opacity = '0';
    veil.style.pointerEvents = 'none';
    leaving = false;
  }
});

/* ---- getting the next room ready before it is asked for ------- */
/*
   Every room is its own document with its own three.js scene, so a
   click is a cold start: parse 130 KB of markup, hand three.js the
   furniture, build it, paint it. Prefetching the file removes the
   download from that list but leaves the build, which is the part
   you actually feel.

   Speculation rules remove both. Two rulesets, deliberately unequal:

     prefetch   every other room, straight away. It is only the
                document, it is ~30 KB over the wire, and it makes
                even an unguessed click start from a warm cache.

     prerender  the room under the cursor, and only that one. Chrome
                loads it in a hidden tab: three.js runs, the scene is
                built, the first frame is drawn — all before the
                click. Activating it is a swap, not a load.

   "moderate" is what keeps this honest. Prerendering all seven rooms
   would mean seven WebGL contexts for six rooms nobody opened; on
   hover it is at most a couple, for the ones a hand is already
   moving towards.

   Rooms need no changes to be safe here. The arrival veil lifts on a
   composited frame, so it lifts inside the prerender and the room is
   simply already up; audio is built on first tap, never on load.
*/
function speculate(){
  /* someone paying for their bytes gets the cheap version */
  var conn = navigator.connection;
  if(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return;

  var urls = [];
  PAGES.forEach(function(p){
    if(p.file && p.file !== here) urls.push(p.file);
  });
  if(!urls.length) return;

  var supported = typeof HTMLScriptElement !== 'undefined' &&
                  HTMLScriptElement.supports &&
                  HTMLScriptElement.supports('speculationrules');

  if(!supported){
    /* Safari and Firefox: the download, at least */
    urls.forEach(function(u){
      var l = document.createElement('link');
      l.rel = 'prefetch';
      l.href = u;
      document.head.appendChild(l);
    });
    return;
  }

  var s = document.createElement('script');
  s.type = 'speculationrules';
  s.textContent = JSON.stringify({
    prefetch:  [{ source:'list', urls: urls, eagerness:'immediate' }],
    prerender: [{ source:'list', urls: urls, eagerness:'moderate'  }]
  });
  document.head.appendChild(s);
}
function speculateWhenIdle(){
  if('requestIdleCallback' in window) requestIdleCallback(speculate, {timeout:4000});
  else setTimeout(speculate, 2500);
}

/* If this page is itself being prerendered, it has not been looked at
   yet and has no cursor to follow — speculating from here would be
   guessing on behalf of a visitor who has not arrived. Wait until the
   room is actually activated, then behave normally. */
if(document.prerendering){
  document.addEventListener('prerenderingchange', speculateWhenIdle, {once:true});
} else {
  speculateWhenIdle();
}

/* the entrance's doors (and anything else) can use the same exit */
window.HOUSE = { go: go, pages: PAGES, cv: CV_URL };

})();
