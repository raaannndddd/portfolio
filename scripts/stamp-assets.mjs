/* ============================================================
   stamp-assets.mjs — put a fingerprint on the shared scripts.

   The pages are hand-written and there is no build step, so every
   room links its scripts by bare name: house-nav.js, lite.js, and
   the rest. That is pleasant to edit and it has one bad property.
   A visitor who has been here before holds those files in their
   browser cache; the HTML around them revalidates in minutes, but
   the scripts do not. Deploy a new nav and the phone that already
   had the old one keeps drawing the old one — new page, last
   week's furniture — until its cache lets go days later.

   The cure is to make the URL change when the file changes. This
   walks the shared scripts, hashes each one, and writes the hash
   into every `src` that points at it:

       <script src="house-nav.js?v=8f2c1a90"></script>

   Edit the script, run this, and the address is new, so no cache
   anywhere — the browser's, Cloudflare's, or Vercel's — can answer
   with the old bytes. Leave the script alone and the hash is the
   same, so a run makes no diff and the file stays cached.

   Run it after touching anything in ASSETS, before committing:

       node scripts/stamp-assets.mjs

   It prints what it changed and exits non-zero if it had nothing
   to write to, which is the only way it can be wrong.
   ============================================================ */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* The scripts every page shares. vendor/three.r128.min.js is not
   here on purpose: it carries its version in its own name and is
   served immutable, which is the same idea by another route. */
const ASSETS = [
  'lite.js',
  'preload.js',
  'house-nav.js',
  'tap-hints.js',
  'projects/projects.js'
];

/* eight hex characters is plenty — this has to survive collisions
   between successive versions of one file, not between all files. */
const fingerprint = (path) =>
  createHash('sha256').update(readFileSync(join(root, path))).digest('hex').slice(0, 8);

/* A src pointing at the asset, with or without a stamp already on
   it. The quote is captured so the `only3D('<script src="...">')`
   spelling — a script tag written inside a JS string — is matched
   by exactly the same rule as a plain tag. */
const srcRe = (path) =>
  new RegExp('(src=)(["\'])' + path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
             '(?:\\?v=[0-9a-f]+)?\\2', 'g');

const stamps = new Map(ASSETS.map((a) => [a, fingerprint(a)]));

const pages = readdirSync(root).filter((f) => f.endsWith('.html'));
let touched = 0;

for (const page of pages) {
  const file = join(root, page);
  const before = readFileSync(file, 'utf8');
  let after = before;

  for (const [asset, hash] of stamps) {
    after = after.replace(srcRe(asset), `$1$2${asset}?v=${hash}$2`);
  }

  if (after !== before) {
    writeFileSync(file, after);
    console.log('stamped', page);
    touched++;
  }
}

for (const [asset, hash] of stamps) console.log(`  ${asset} -> ?v=${hash}`);

if (!pages.length) {
  console.error('no .html pages found — is this the repo root?');
  process.exit(1);
}
console.log(touched ? `\n${touched} page(s) updated.` : '\nAlready up to date.');
