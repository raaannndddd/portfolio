# Projects

This folder feeds the book on the living-room bookshelf (`living.html`).

- **`projects.js`** — the list of projects, plain data. The **first entry** is
  the page the book opens to, so put your main project at the top.
- **`img/`** — screenshots for the left-hand page. Any web image format works
  (`.webp`, `.png`, `.jpg`, `.svg`). Landscape around 800×600 looks best.
  Every entry currently has an empty `image`, which falls back to the
  placeholder — fill the path in as each screenshot arrives. Each entry in
  `projects.js` carries a comment with the filename it is expecting.

The right-hand page ends with a standing "For more projects, checkout my
github" line on every spread. It is markup in `living.html`, not data — it
does not need to be repeated per project.

To add a project: drop a screenshot in `img/`, add one object to the array in
`projects.js`, reload the page. No build step.

In the room: click anywhere on the bookshelf to bring the book up. Flick pages
with the on-screen arrows or ←/→, and click outside the book (or press Escape)
to put it back.
