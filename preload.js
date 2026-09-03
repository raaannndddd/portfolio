/* ============================================================
   preload.js — the whole house's pictures, fetched once.

   The problem this solves: every room is its own HTML document,
   so walking from the kitchen to the living room is a real
   navigation. Without this, each room discovers its photographs
   only after three.js has finished building the furniture, and
   the visitor watches them arrive one at a time — worst of all
   on a room they have already been in once.

   What happens instead:

     1. This file is the FIRST script on every page, so the
        pictures are already in flight before three.js has been
        asked for.
     2. The room you are standing in is warmed first, at normal
        priority, and its promise is what the loading screen
        waits on.
     3. Every other room follows at low priority once the first
        batch is done, so by the time you open a door that room's
        photographs are already in the browser's cache.
     4. Decoded images are kept alive in `held`, so a texture
        built from one costs nothing but the GPU upload — no
        second fetch, no second decode.

   Adding a picture: put its path in MANIFEST under the page that
   shows it. That is the only edit.
   ============================================================ */
(function(){
"use strict";

/* ---- what each room hangs on its walls ----------------------- */
var MANIFEST = {
  'entrance.html': [],

  'kitchen.html': [
    'images/fridge/food.jpg',
    'images/fridge/rand_and_karaz.jpg',
    'images/fridge/bodypump.jpg',
    'images/fridge/brisbane_marathon.jpg',
    'images/fridge/nature.JPG',
    'images/fridge/peojects.jpg',
    'images/fridge/claw_machine.jpg',
    'images/fridge/friends.jpeg',
    'images/fridge/family.jpg'
  ],

  'living.html': [
    'images/projects/medical.png',
    'images/projects/advertise.png',
    'images/projects/jla.png',
    'images/projects/chart_chat.png',
    'images/projects/vol_control.png',
    'projects/img/placeholder.svg'
  ],

  'bedroom.html': [
    'images/education/usyd.png',
    'images/education/kings_academy.png'
  ],

  'office.html': [],

  'dining.html': [
    'images/logos/searchitlocal.jpeg',
    'images/logos/arabbank.png',
    'images/logos/winboard.jpeg',
    'images/logos/mobisoft.jpg'
  ],

  'writing.html': [],
  'contact.html': []
};

/* which room to warm after this one, when nothing better is known.
   Ordered the way the nav is, so it matches the way people walk. */
var ORDER = ['entrance.html','kitchen.html','living.html','bedroom.html',
             'office.html','dining.html','writing.html','contact.html'];

var here = location.pathname.split('/').pop() || 'entrance.html';

/* ---- the cache ----------------------------------------------- */
/* keyed by absolute URL, so 'images/x.jpg' and '/images/x.jpg' —
   both spellings appear in the room files — are one entry, not two */
function key(src){
  try { return new URL(src, location.href).href; } catch(e){ return src; }
}

var held = Object.create(null);   /* url -> HTMLImageElement, kept from GC */
var jobs = Object.create(null);   /* url -> Promise<HTMLImageElement|null> */

/* one picture. Resolves when it is decoded and ready to paint —
   never rejects, because a missing photograph is a gap in a room,
   not a reason to hold the door shut. */
function warm(src, priority){
  var url = key(src);
  if(jobs[url]) return jobs[url];

  jobs[url] = new Promise(function(resolve){
    var img = new Image();
    /* same-origin throughout, so this costs nothing and lets a
       texture built from the result stay untainted */
    img.crossOrigin = 'anonymous';
    if('fetchPriority' in img) img.fetchPriority = priority || 'auto';
    img.decoding = 'async';

    function done(ok){
      if(ok){ held[url] = img; resolve(img); }
      else  { resolve(null); }
    }
    img.onload = function(){
      /* decode() moves the expensive part off the moment of first
         paint — without it the cost merely moves to the frame that
         first draws the picture, which is exactly the stutter we
         are here to remove */
      if(img.decode) img.decode().then(function(){ done(true); }, function(){ done(true); });
      else done(true);
    };
    img.onerror = function(){ done(false); };
    img.src = src;
  });
  return jobs[url];
}

function warmAll(list, priority){
  return Promise.all(list.map(function(s){ return warm(s, priority); }));
}

/* ---- the run ------------------------------------------------- */
/* this room first: this is the promise the loading screen waits on */
var mine = warmAll(MANIFEST[here] || [], 'high');

/* then the rest of the house, quietly. Low priority so it can never
   compete with the room being looked at right now. */
var rest = mine.then(function(){
  return new Promise(function(resolve){
    function run(){
      var others = [];
      ORDER.forEach(function(page){
        if(page === here) return;
        (MANIFEST[page] || []).forEach(function(s){ others.push(s); });
      });
      warmAll(others, 'low').then(resolve);
    }
    if('requestIdleCallback' in window) requestIdleCallback(run, {timeout: 1500});
    else setTimeout(run, 300);
  });
});

/* ---- the CV --------------------------------------------------- */
/* One PDF, ~90 KB, fetched on the same terms as the photographs: not
   in the way of the room you are looking at, but on the wire long
   before anyone presses the CV button, so the preview opens on an
   already-downloaded file rather than a spinner.

   The blob is kept because the preview frame can be pointed straight
   at it — no second request, no dependence on the disk cache still
   holding the file by the time the button is pressed. The plain URL
   stays the download and open-in-a-tab target, so what the visitor
   saves has a real address and a real name. */
var CV_URL = 'CV/Rand%20Halasa%20Resume.pdf';
var cvBlobUrl = null;

var cvReady = mine.then(function(){
  return new Promise(function(resolve){
    function run(){
      fetch(CV_URL, {credentials:'same-origin'})
        .then(function(r){ return r.ok ? r.blob() : null; })
        .then(function(b){
          /* a wrong type here means a redirect or an error page dressed
             as a 200 — better to fall back to the plain URL than to
             hand the frame something that will not render */
          if(b && b.type.indexOf('pdf') !== -1) cvBlobUrl = URL.createObjectURL(b);
          resolve(cvBlobUrl);
        })
        .catch(function(){ resolve(null); });
    }
    if('requestIdleCallback' in window) requestIdleCallback(run, {timeout: 2500});
    else setTimeout(run, 600);
  });
});

/* ---- what the rooms use -------------------------------------- */
window.HOUSE_PRELOAD = {
  /* the pictures this page needs, decoded. Rooms and loading
     screens await this. */
  here: mine,

  /* every picture in the house. Nothing blocks on this — it is
     here so a page can know when the walk ahead is free. */
  all: rest,

  /* the decoded element for a path, or null if it has not landed
     yet. Callers fall back to their own loader on null. */
  image: function(src){ return held[key(src)] || null; },

  /* a THREE texture off an already-decoded image, skipping both the
     second fetch and the second decode. Falls back to TextureLoader
     when the picture has not arrived, so a call site is correct
     whether or not the preload beat it there. */
  texture: function(THREE, src, onLoad, onError){
    var img = held[key(src)];
    if(img){
      var t = new THREE.Texture(img);
      t.needsUpdate = true;
      if(onLoad) onLoad(t);
      return t;
    }
    return new THREE.TextureLoader().load(src, onLoad, undefined, onError);
  },

  /* warm something not in the manifest (a picture built from data,
     say) on the same terms as everything else */
  warm: warm,

  /* the CV. `ready` resolves with a blob: URL for the preview frame,
     or null if the fetch did not land — callers fall back to `url`. */
  cv: {
    url: CV_URL,
    ready: cvReady,
    blobUrl: function(){ return cvBlobUrl; }
  },

  manifest: MANIFEST
};

})();
