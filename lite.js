/* ============================================================
   lite.js — the first script on every page, and the only one
   that runs before a single byte of the house is requested.

   It answers one question, up front, and writes the answer onto
   <html> so the first paint is already the right shape:

     .house-full   the tour
     .lite         the written portfolio. Text, contact, CV.

   The house is the site on every device now, phones included. It
   is the thing worth showing, and a room on a small screen is
   still a room — what has to change is the furniture around it,
   which the pages do for themselves in media queries.

   The written version is not a fallback and never was. It is the
   same content, it is what Google and a screen reader read either
   way, it is one tap from the entrance — and ?lite=1 makes it the
   whole visit. What it no longer is is somewhere anybody gets
   sent by the size of their screen.
   ============================================================ */
(function(){
"use strict";

/* ---- house or written ---------------------------------------
   The house, unless this visit has asked for the other one.
   Remembered for the session so it survives walking page to
   page, since the nav links carry no query of their own. */
var can3D = true;

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

window.HOUSE_LITE   = !can3D;
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

/* ---- a room asked for on the light path ----------------------
   Only reachable now by asking for it — ?lite=1, or a session
   that already has. Every room has a written counterpart under
   its own heading, so a shared link to the kitchen lands on
   About rather than on the top of a long page. replace() rather
   than assign() so the back button goes where the visitor came
   from instead of bouncing off the room again. */
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
   Three pages carry one, and they say opposite things: the two
   written pages point at the house, and the entrance — on a small
   screen, where the house is the harder read — points at the
   written version. Each page decides in its own CSS whether its bar
   applies to this visit; all that is settled here is whether the
   visitor has already waved one away.

   Dismissed for the session rather than forever: a phone that is
   a laptop tomorrow should be told again. The flag is read here,
   in the head, and answered with a class rather than by deleting
   the bar later — a bar removed after the page has painted takes
   a line of text out from under whoever was already reading it. */
var NOTICE = 'house-notice';
var dismissed = false;
try { dismissed = sessionStorage.getItem(NOTICE) === 'seen'; } catch(e){}
if(dismissed) document.documentElement.className += ' notice-seen';

if(!dismissed){
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
