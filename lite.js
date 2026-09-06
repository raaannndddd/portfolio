/* ============================================================
   lite.js — the first script on every page, and the only one
   that runs before a single byte of the house is requested.

   The house is five WebGL rooms. On a phone that is 600 KB of
   three.js, ~6 MB of baked photographs and a prerender of every
   other room — slow on 4G and, often enough, a tab Safari kills
   outright. Hiding the canvas in CSS does not help: the browser
   has already fetched all of it by the time the stylesheet has
   an opinion.

   So the decision is made here, up front, and everything heavy
   is written into the document only on the branch that wants it.
   Nothing on the light path is downloaded and then discarded;
   it is never asked for.

     .lite         — the written portfolio. Text, contact, CV.
     .house-full   — the tour.

   The written page is not a fallback. It is the same content,
   and it is what Google and a screen reader read either way.
   ============================================================ */
(function(){
"use strict";

/* ---- the test ------------------------------------------------
   Two conditions, and a visit has to pass both:

     min-width:900px   room to stand back and look at a room
     pointer:fine      a mouse — the rooms are hover-and-drag,
                       and there is no touch equivalent of
                       "the cursor is over the fridge"

   A phone fails both. A tablet passes the first and fails the
   second, which is the answer we want: an iPad has the screen
   for it and not the input. A narrow window on a laptop fails
   the width and gets the readable page, which is also right.

   Deliberately not user-agent sniffing. The question is what
   this visit can comfortably do, not what device it claims. */
var can3D;
try {
  can3D = matchMedia('(min-width: 900px) and (pointer: fine)').matches;
} catch(e) {
  /* a browser too old to answer gets the written version, which
     is the one that works everywhere */
  can3D = false;
}

/* ---- the override --------------------------------------------
   Someone who wants the tour on a tablet is allowed to have it,
   and someone on a laptop is allowed the plain page. Remembered
   for the session so it survives walking room to room, since the
   nav links carry no query of their own. */
var KEY = 'house-force';
var forced = null;
try { forced = sessionStorage.getItem(KEY); } catch(e){}

if(/[?&]tour=1/.test(location.search))      forced = 'full';
else if(/[?&]lite=1/.test(location.search)) forced = 'lite';
else if(/[?&]tour=0/.test(location.search)) forced = null;

if(forced){
  can3D = (forced === 'full');
  try { sessionStorage.setItem(KEY, forced); } catch(e){}
}

window.HOUSE_LITE  = !can3D;
window.HOUSE_FORCED = forced;
document.documentElement.className += can3D ? ' house-full' : ' lite';

/* ---- the gate ------------------------------------------------
   Writes markup into the document only on the 3D path, at the
   exact spot the tag used to sit. document.write is the right
   tool for once: it is the only thing that keeps a script in
   the parser's own order, so three.js is still guaranteed to be
   defined before the scene below it runs.

   On the light path this is a no-op and the tag simply never
   exists — no request, no preload scanner hit, nothing to abort. */
window.only3D = function(html){
  if(can3D) document.write(html);
};

/* ---- a room asked for on a phone -----------------------------
   Every room has a written counterpart under its own heading, so
   a shared link to the kitchen lands on About rather than on the
   top of a long page. replace() rather than assign() so the back
   button goes where the visitor came from instead of bouncing
   off the room again. */
var ROOM_SECTION = {
  'entrance.html': '',
  'kitchen.html':  'about',
  'living.html':   'projects',
  'bedroom.html':  'education',
  'office.html':   'skills',
  'dining.html':   'experience'
};

if(!can3D){
  var here = location.pathname.split('/').pop() || 'entrance.html';
  if(ROOM_SECTION.hasOwnProperty(here)){
    var section = ROOM_SECTION[here];
    location.replace('writing.html' + (section ? '#' + section : ''));
  }
}

/* ---- the notice ----------------------------------------------
   The written pages carry a one-line bar in their own markup
   saying what this is. It sits in the flow above everything, so
   nothing is covered and there is no modal to trap a focus ring
   in, and it is dismissed for the session rather than forever —
   a phone that is a laptop tomorrow should be told again.

   The flag is read here, in the head, and answered with a class
   rather than by deleting the bar later: a bar removed after the
   page has painted takes a line of text out from under whoever
   was already reading it. */
var NOTICE = 'house-notice';
var dismissed = false;
try { dismissed = sessionStorage.getItem(NOTICE) === 'seen'; } catch(e){}
if(dismissed) document.documentElement.className += ' notice-seen';

if(!can3D && !dismissed){
  document.addEventListener('DOMContentLoaded', function(){
    var x = document.getElementById('liteNoticeX');
    if(!x) return;
    x.addEventListener('click', function(){
      document.documentElement.className += ' notice-seen';
      try { sessionStorage.setItem(NOTICE, 'seen'); } catch(e){}
    });
  });
}

})();
