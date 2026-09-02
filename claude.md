# Personal Portfolio — Interactive 3D House

An interactive personal website. The visitor arrives at a front door, is welcomed in,
and tours a house where each room maps to a section of the portfolio. A skippable
experience layered on top of a conventional, fully functional website.

---

## Non-negotiables

Read this section before any task. These constraints override convenience.

1. **The 2D site is the real site.** Every piece of content must exist at a plain
   route (`/about`, `/projects`, `/education`, `/experience`, `/contact`) rendered
   as ordinary accessible HTML. The 3D house is an enhancement layered on top.
   If a change would make content reachable *only* in 3D, it is wrong.

2. **Build 2D before 3D, always.** For any new content, ship the flat HTML route
   first and confirm it works. Only then build the room. This ordering means a
   half-finished project is still a working portfolio.

3. **Content never lives in components or in the GLB.** All copy lives in
   `src/content/*.ts` as typed data. Adding a project must be a one-line data edit,
   never a Blender re-export and never a JSX change.

4. **User-facing text is DOM, not 3D geometry.** Use drei `<Html>`. Text must be
   selectable, copyable, translatable, and readable by a screen reader. Never
   `<Text3D>` or texture-baked copy for anything a person needs to read.

5. **No real-time lights.** All room lighting is baked into the textures. Ambient
   light only, and keep it near-neutral so it doesn't fight the bake. Adding a
   `<pointLight>` or `<directionalLight>` to a room scene is a bug.

6. **The escape hatch is mandatory.** A visible "Skip the tour" control within
   3 seconds of load, persisted to `localStorage`. A returning visitor who skipped
   once is never forced through the tour again.

7. **Attribution stays.** Room models are CC-BY. The footer credit is a licence
   obligation, not decoration. Do not remove or bury it.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React + Vite |
| Language | TypeScript, strict mode |
| 3D | React Three Fiber + drei |
| Animation | GSAP for camera paths, R3F springs for micro-interactions |
| Styling | CSS Modules |
| Asset pipeline | `@gltf-transform/cli` |

Do not introduce a state management library. React state and context are sufficient
at this size.

---

## Rooms

| Room | Section | Model | Source triangles |
|---|---|---|---|
| Living room | Projects | `living-room.glb` | 73.6k |
| Kitchen | About me | `kitchen.glb` | 73k |
| Bedroom | Education | `bedroom.glb` | 56.2k |
| Office | Experience & skills | `office.glb` | 101.7k |
| Dining room | Contact | `dining-room.glb` | 97.2k |

All five are by **dylanheyes** on Sketchfab, licensed **CC BY 4.0**, with baked
lighting. Using one artist across all rooms is deliberate — it is what makes five
separate models read as a single house. Do not substitute a model from another
artist without flagging the style mismatch.

---

## Asset pipeline

Source models live in `assets/models/raw/` (git-ignored, they are large).
Optimised output goes to `public/models/`.

```bash
gltf-transform optimize assets/models/raw/kitchen.glb public/models/kitchen.glb \
  --texture-size 1024 \
  --compress draco
```

Budget per room: **under 6 MB** after optimisation. If a room exceeds this,
reduce texture size before reducing geometry — the bakes are where the weight is.

Before writing any code that references a model, run:

```bash
node scripts/inspect-glb.js public/models/kitchen.glb
```

This prints **node names** (what `getObjectByName` matches), mesh names, world
positions, and the scene bounding box. Never guess an object name — the script
output is the source of truth. If you need a name and don't have the output,
ask for it rather than inventing one.

---

## Performance budget

- Room scene interactive in **under 3 seconds** on a mid-range Android over 4G
- Only the current room's GLB is loaded; rooms are code-split and lazy-loaded
- Preload the *next likely* room during idle time, never all five upfront
- Test on real mobile hardware before considering a room finished
- If a room can't hit the budget, cut visual fidelity, not the 2D fallback

---

## Interaction conventions

- **Discoverability first.** Interactive objects pulse once on room entry and lift
  with a subtle emissive on hover. The most common failure mode for 3D portfolios
  is a beautiful room where nothing looks clickable.
- Cursor becomes a pointer over anything interactive.
- `Escape` closes any open panel.
- Everything reachable by `Tab`, with visible focus rings.
- Respect `prefers-reduced-motion`: cut camera travel to instant cuts, disable
  idle animation, keep all content reachable.
- Narration audio is always paired with visible text. Audio is never the only
  way to receive information — assume sound is off.

---

## Content architecture

```
src/content/
  about.ts        # kitchen
  projects.ts     # living room
  education.ts    # bedroom
  experience.ts   # office
  contact.ts      # dining room
  site.ts         # name, tagline, attribution, socials
```

Each file exports typed data consumed by **both** the 2D route and the 3D room.
A single source, two renderers. If the two ever diverge, the 2D route is correct.

### Object mapping

Content attaches to physical objects in each room. The split that matters:
**professional narrative is spoken, personality is physical.**

**Kitchen (about me)** — career summary appears as the arrival speech bubble;
everything personal hangs on objects:

| Object | Content |
|---|---|
| Speech bubble on arrival | USyd software engineering graduate; production engineer at Search it Local; full-stack builds tuned to rank on Google and AI assistants |
| Fridge magnet — running | Running |
| Fridge magnet — beach | Beach |
| Fridge magnet — music | Music |
| Fridge note — French | Learning French ("oui oui 😎" — keep this line, it carries the voice) |
| Recipe card on counter | Exploring dishes and cuisines from different places |

**Living room (projects)** — wall paintings become project screenshots; TV plays a
muted looping showreel. Current projects: the language academy client site (Jordan)
and the honours thesis on bias in medical AI chatbots.

**Bedroom (education)** — framed certificates on the wall, bookshelf spines as
coursework.

**Office (experience & skills)** — monitor shows an editor or terminal; sticky
notes are skills.

**Dining room (contact)** — one place setting across from the camera, contact form
as `<Html>` on the table.

---

## The host

The visitor is greeted and guided, but there is **no animated character**. The
camera is the visitor, first-person. The host is represented by a static photo
cutout plane at seated height in the kitchen and dining room, lit to match the
bake. No rigging, no walk cycles, no lip sync — this is a deliberate scope
decision, not a limitation to work around later.

---

## Working style

- One change per task. Multi-part prompts on 3D positioning produce code that is
  plausibly wrong in several places at once and hard to bisect.
- For positioning, prefer `<TransformControls>` or a temporary `<axesHelper>` to
  get real numbers, rather than guessing coordinates and iterating blind.
- Ask before adding a dependency.
- Never commit anything from `assets/models/raw/`.

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # production build
npm run preview    # preview the build
npm run typecheck  # tsc --noEmit
node scripts/inspect-glb.js <path>   # inspect a model before referencing it
```