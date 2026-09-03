/* ============================================================
   house-nav.js — one include, four jobs:
     1. the room-to-room pill nav along the bottom
     2. the departure veil, so leaving a page fades into the
        colour the next page fades in from
     3. idle prefetch of the other rooms
     4. the CV: a button beside Contact that opens the PDF in an
        overlay, with download and open-in-a-tab beside it. The
        file is already fetched by preload.js, so the overlay
        opens on a document rather than on a spinner.
   Every page carries its own arrival fade (#fade); this script
   only has to match its colour on the way out for the cut to
   be invisible.
   ============================================================ */
(function(){
"use strict";

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
  /* not a room: opens the CV overlay in place, no navigation */
  {cv:true,              label:'CV',                         section:'my CV, one page'}
];

/* where the file lives. preload.js owns the copy in the browser; this is
   the address for download and for opening in a tab, and the fallback the
   frame uses if the preload has not landed yet. */
var CV_URL  = 'CV/Rand%20Halasa%20Resume.pdf';
var CV_NAME = 'Rand-Halasa-CV.pdf';

var here = location.pathname.split('/').pop() || 'entrance.html';
var reduced = matchMedia('(prefers-reduced-motion: reduce)');

function pageFor(file){
  for(var i=0;i<PAGES.length;i++) if(PAGES[i].file === file) return PAGES[i];
  return null;
}

/* ---- styles -------------------------------------------------- */
var css = [
'#house-nav{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:40;',
'  display:flex;align-items:center;gap:2px;padding:6px;',
'  background:#fffdf9;border-radius:999px;box-shadow:0 8px 30px rgba(28,22,14,.20);',
'  font-family:"Helvetica Neue",Inter,system-ui,-apple-system,"Segoe UI",sans-serif;',
'  max-width:min(94vw,calc(100vw - 200px));overflow-x:auto;scrollbar-width:none;',
'  -webkit-overflow-scrolling:touch;white-space:nowrap;}',
'#house-nav::-webkit-scrollbar{display:none}',
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
/* lift the HUD furniture that lives where the nav now sits */
'#back{bottom:88px !important}',
'#hint{bottom:92px !important}',
'@media (max-width:820px){',
'  #house-nav{bottom:12px;max-width:94vw}',
'  #house-nav a{padding:8px 11px;font-size:12px}',
'  #full,#lights{bottom:72px !important}',
'  #back{bottom:78px !important}',
'  #hint{bottom:128px !important}',
'}',
'@media (prefers-reduced-motion:reduce){#house-veil{transition-duration:.01ms}}',

/* ---- the CV button and its overlay ----
   Every overlay in the house is the same object seen from a different
   room: a cream sheet on a blurred, darkened scrim, a serif title over
   a small-caps kicker, actions as underlined text, and a hairline
   glyph for the close. This one is the printed CV, so it follows the
   letter on the coffee table and the journal on the nightstand rather
   than inventing a viewer of its own. */
'#house-nav .nav-cv{flex:0 0 auto;display:block;padding:8px 14px;border-radius:999px;',
'  font:inherit;font-size:13px;letter-spacing:.02em;color:#1c1a17;cursor:pointer;',
'  background:transparent;border:1px solid rgba(28,26,23,.28);margin-left:4px;',
'  transition:background .25s,color .25s,border-color .25s,transform .25s cubic-bezier(.2,.8,.2,1);}',
'#house-nav .nav-cv:hover{background:#1c1a17;border-color:#1c1a17;color:#fffdf9;transform:translateY(-1px)}',
'#house-nav .nav-cv:focus-visible{outline:2px solid #1c1a17;outline-offset:2px}',

'#cv-overlay{position:fixed;inset:0;z-index:100;padding:20px;',
'  display:flex;align-items:center;justify-content:center;',
'  background:rgba(14,10,5,.58);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);',
'  opacity:0;pointer-events:none;visibility:hidden;',
'  transition:opacity .35s ease,visibility 0s linear .35s;',
'  font-family:"Helvetica Neue",Inter,system-ui,-apple-system,"Segoe UI",sans-serif;',
'  color:#2b2823}',
/* visibility, not display: it keeps the closed sheet out of the tab
   order without costing the fade the rooms' overlays all have */
'#cv-overlay.open{opacity:1;pointer-events:auto;visibility:visible;transition-delay:0s}',

/* shaped like the page it holds, not like a window: the height leads,
   and the width is whatever the fitted page needs under the header.
   0.7078 is the CV's own ratio (596 x 842pt, one page) — the viewer
   paints its own ground around the paper, and matching the proportion
   is what keeps that ground from showing. A CV of another size wants
   its own number here. */
'#cv-sheet{position:relative;display:flex;flex-direction:column;overflow:hidden;',
'  --cv-h:min(90vh,1120px);--cv-head:104px;',
'  height:var(--cv-h);width:min(94vw,calc((var(--cv-h) - var(--cv-head)) * 0.7078));',
'  background:#f7f1e1;color:#2b2823;border-radius:4px;',
'  box-shadow:0 34px 90px rgba(0,0,0,.6);',
'  transform:translateY(12px) scale(.97);',
'  transition:transform .35s cubic-bezier(.2,.8,.2,1)}',
'#cv-overlay.open #cv-sheet{transform:none}',
/* the fore-edge of the rest of the stack, the same detail the projects
   book uses to say paper rather than panel */
'#cv-sheet::after{content:"";position:absolute;left:0;right:0;bottom:0;height:6px;',
'  background:repeating-linear-gradient(90deg,#e6dcc4 0 1.6px,#f6efdd 1.6px 3px);',
'  pointer-events:none}',

'#cv-head{flex:none;display:flex;align-items:flex-end;gap:18px;overflow:hidden;',
'  padding:22px 20px 16px 26px;background:#f7f1e1;',
'  border-bottom:1px solid rgba(90,70,40,.18)}',
'#cv-head .cv-kicker{margin:0 0 5px;font-size:11px;letter-spacing:.18em;',
'  text-transform:uppercase;color:#8c8375}',
'#cv-head h2{margin:0;font-family:Georgia,"Times New Roman",serif;font-weight:600;',
'  font-size:24px;line-height:1.1;color:#241f18}',

'#cv-acts{margin-left:auto;display:flex;align-items:baseline;gap:18px;min-width:0}',
/* the same underlined link the letter and the book pages use, so an
   action here reads like an action anywhere else in the house */
'#cv-acts .cv-btn{font:inherit;font-size:13.5px;line-height:1.2;cursor:pointer;',
'  color:#2c4a66;background:none;border:0;padding:0 0 1px;text-decoration:none;',
'  border-bottom:1px solid rgba(44,74,102,.4);transition:border-color .2s,color .2s}',
'#cv-acts .cv-btn:hover{border-bottom-color:#2c4a66}',
'#cv-acts .cv-btn:focus-visible,#cv-close:focus-visible{outline:2px solid #2c4a66;',
'  outline-offset:3px;border-radius:3px}',
'#cv-close{flex:none;align-self:flex-start;margin:-6px -4px 0 0;background:none;border:0;',
'  color:#8c8375;font:inherit;font-size:17px;line-height:1;cursor:pointer;padding:6px 8px;',
'  transition:color .2s}',
'#cv-close:hover{color:#1c1a17}',

/* the page itself. The viewer paints its own ground, so the sheet gives
   it the whole width rather than framing it in a cream border it would
   only sit awkwardly inside. */
'#cv-frame{flex:1;width:100%;border:0;background:#efe8d8;display:block}',

'#cv-alt{flex:1;display:none;flex-direction:column;align-items:center;justify-content:center;',
'  gap:18px;padding:34px 28px;text-align:center;background:#f7f1e1}',
'#cv-overlay.no-embed #cv-frame{display:none}',
/* the panel below already offers both, and a header that repeats
   them is what pushes the close glyph off a narrow screen */
'#cv-overlay.no-embed #cv-dl,#cv-overlay.no-embed #cv-tab{display:none}',
'#cv-overlay.no-embed #cv-alt{display:flex}',
'#cv-alt p{max-width:32ch;margin:0;font-size:14.5px;line-height:1.65;color:#3c3730}',
'#cv-alt .cv-btn{font-size:15px;color:#2c4a66;text-decoration:none;',
'  border-bottom:1px solid rgba(44,74,102,.4);padding-bottom:2px}',
'#cv-alt .cv-btn:hover{border-bottom-color:#2c4a66}',
'#cv-alt .cv-btn:focus-visible{outline:2px solid #2c4a66;outline-offset:3px;border-radius:3px}',

'@media (max-width:820px){',
'  #house-nav .nav-cv{padding:7px 11px;font-size:12px}',
'  #cv-overlay{padding:0}',
'  #cv-sheet{width:100vw;height:100svh;max-height:none;border-radius:0}',
/* a fore-edge belongs to a sheet you can see the edges of */
'  #cv-sheet::after{display:none}',
'  #cv-head{padding:18px 12px 14px 18px;gap:12px}',
'  #cv-head h2{font-size:20px}',
'  #cv-acts{gap:14px}',
'  #cv-acts .cv-btn{font-size:13px}',
'}',
'@media (prefers-reduced-motion:reduce){',
'  #cv-overlay{transition-duration:.01ms}',
'  #cv-sheet{transition-duration:.01ms;transform:none}',
'}'
].join('\n');

var style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

/* ---- the nav ------------------------------------------------- */
var nav = document.createElement('nav');
nav.id = 'house-nav';
nav.setAttribute('aria-label', 'House rooms');
PAGES.forEach(function(p){
  if(p.divider){
    var d = document.createElement('span');
    d.className = 'nav-div';
    d.setAttribute('aria-hidden', 'true');
    nav.appendChild(d);
    return;
  }
  if(p.cv){
    /* a button, because it opens something in place rather than going
       anywhere — and because a link that does not navigate is a lie to
       anyone middle-clicking or reading with a screen reader */
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'nav-cv';
    b.textContent = p.label;
    b.title = p.section;
    b.setAttribute('aria-haspopup', 'dialog');
    b.addEventListener('click', openCV);
    nav.appendChild(b);
    return;
  }
  var a = document.createElement('a');
  a.href = p.file;
  a.textContent = p.label;
  a.title = p.section;
  if(p.file === here) a.setAttribute('aria-current', 'page');
  nav.appendChild(a);
});
document.body.appendChild(nav);

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

/* ---- idle prefetch of the other rooms ------------------------ */
function prefetch(){
  PAGES.forEach(function(p){
    if(!p.file || p.file === here) return;
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = p.file;
    document.head.appendChild(l);
  });
}
if('requestIdleCallback' in window) requestIdleCallback(prefetch, {timeout:4000});
else setTimeout(prefetch, 2500);

/* ---- the CV overlay ------------------------------------------ */
/* The PDF is already in the browser: preload.js fetches it on every
   page, during idle, and hands back a blob: URL. The frame is pointed
   at that when it exists and at the file's own address when it does
   not, so the button behaves the same either way — one just opens
   sooner than the other.

   Inline PDF viewing is not universal: phone browsers either refuse an
   embedded PDF or render one unscrollable page. Rather than showing
   that, those get a panel with the two things that do work everywhere —
   download it, or open it in its own tab. */

var cvEl = null, cvOpen = false, cvReturn = null;

function cvSrc(){
  var pre = window.HOUSE_PRELOAD && window.HOUSE_PRELOAD.cv;
  var base = (pre && pre.blobUrl && pre.blobUrl()) || CV_URL;
  /* no viewer chrome and fit to width: the page should read as a page
     laid on the sheet, not as a second browser inside the first */
  return base + '#toolbar=0&navpanes=0&view=FitH';
}

/* an embedded PDF is only worth showing where the browser will really
   draw one — desktop engines with room for it. Everywhere else the
   fallback panel is the honest answer. */
function canEmbed(){
  var ua = navigator.userAgent || '';
  if(/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return false;
  /* iPadOS reports itself as a Mac; touch points give it away */
  if(/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return false;
  return innerWidth >= 760;
}

function buildCV(){
  if(cvEl) return cvEl;

  var wrap = document.createElement('div');
  wrap.id = 'cv-overlay';
  wrap.innerHTML =
    '<div id="cv-scrim"></div>' +
    '<div id="cv-sheet" role="dialog" aria-modal="true" aria-labelledby="cv-title">' +
      '<div id="cv-head">' +
        '<div>' +
          '<p class="cv-kicker">Curriculum vitae</p>' +
          '<h2 id="cv-title">Rand Halasa</h2>' +
        '</div>' +
        '<div id="cv-acts">' +
          '<a class="cv-btn" id="cv-dl">Download the PDF</a>' +
          '<a class="cv-btn" id="cv-tab" target="_blank" rel="noopener">Open in a tab</a>' +
          '<button type="button" id="cv-close" aria-label="Put the CV down">&#10005;</button>' +
        '</div>' +
      '</div>' +
      '<iframe id="cv-frame" title="Rand Halasa — CV"></iframe>' +
      '<div id="cv-alt">' +
        '<p>This browser will not lay a PDF out in place. It opens fine ' +
        'in a tab of its own, and the file is already here if you would ' +
        'rather keep a copy.</p>' +
        '<a class="cv-btn" id="cv-alt-tab" target="_blank" rel="noopener">Open the CV</a>' +
        '<a class="cv-btn" id="cv-alt-dl">Download the PDF</a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(wrap);

  /* the plain address for both, never the blob: what a visitor saves
     or bookmarks should have a real name and a real URL */
  ['cv-dl','cv-alt-dl'].forEach(function(id){
    var a = wrap.querySelector('#' + id);
    a.href = CV_URL;
    a.setAttribute('download', CV_NAME);
  });
  ['cv-tab','cv-alt-tab'].forEach(function(id){
    wrap.querySelector('#' + id).href = CV_URL;
  });

  wrap.querySelector('#cv-close').addEventListener('click', closeCV);
  wrap.querySelector('#cv-scrim').addEventListener('click', closeCV);

  cvEl = wrap;
  return wrap;
}

/* the width above is derived from the header's height, and a header's
   height depends on the font that actually loaded. Measure it instead of
   trusting the guess in the CSS, so the frame is the page's proportion
   on the first open and after every resize. */
function cvMeasure(){
  if(!cvEl) return;
  var h = cvEl.querySelector('#cv-head').offsetHeight;
  if(h) cvEl.querySelector('#cv-sheet').style.setProperty('--cv-head', h + 'px');
}

function cvFocusable(){
  return Array.prototype.filter.call(
    cvEl.querySelectorAll('a[href],button'),
    function(el){ return el.offsetParent !== null; }
  );
}

/* while the sheet is up it owns the keyboard — otherwise Escape, Tab and
   any room's movement keys all fire at a scene nobody can see */
function cvKeys(e){
  if(!cvOpen) return;
  if(e.key === 'Escape'){ e.stopPropagation(); e.preventDefault(); closeCV(); return; }
  if(e.key === 'Tab'){
    var f = cvFocusable();
    if(!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    e.stopPropagation();
    return;
  }
  /* the frame has focus for its own scrolling and zoom shortcuts; the
     room behind it should hear nothing */
  e.stopPropagation();
}

var cvScrollLock = '';

function openCV(){
  if(cvOpen) return;
  var w = buildCV();
  cvReturn = document.activeElement;

  w.classList.toggle('no-embed', !canEmbed());
  var frame = w.querySelector('#cv-frame');
  /* set the source every time: the first open may have fallen back to
     the plain URL before the preload landed */
  if(canEmbed()) frame.src = cvSrc();

  cvOpen = true;
  cvScrollLock = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';

  /* a layout read first, so a sheet built this instant still fades in
     from its closed state rather than appearing already open */
  void w.offsetWidth;
  w.classList.add('open');

  cvMeasure();
  addEventListener('resize', cvMeasure);

  document.addEventListener('keydown', cvKeys, true);
  w.querySelector('#cv-close').focus();
}

function closeCV(){
  if(!cvOpen || !cvEl) return;
  cvOpen = false;
  document.removeEventListener('keydown', cvKeys, true);
  removeEventListener('resize', cvMeasure);
  document.documentElement.style.overflow = cvScrollLock;
  cvEl.classList.remove('open');

  /* drop the document once the sheet is gone, so a hidden PDF viewer is
     not left running behind the room */
  var w = cvEl;
  function finish(){ w.querySelector('#cv-frame').removeAttribute('src'); }
  if(reduced.matches) finish();
  else setTimeout(finish, 360);

  if(cvReturn && cvReturn.focus) cvReturn.focus();
  cvReturn = null;
}

/* any page in the house can link straight to the CV with #cv, which is
   also the address to hand someone who only wants that one thing */
if(location.hash === '#cv') setTimeout(openCV, 0);

/* the entrance's doors (and anything else) can use the same exit */
window.HOUSE = { go: go, pages: PAGES, openCV: openCV, closeCV: closeCV };

})();
