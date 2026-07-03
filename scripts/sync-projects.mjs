#!/usr/bin/env node
/**
 * sync-projects — keeps src/data/projects.json in step with GitHub.
 *
 * Fetches public, non-fork repos for the configured GitHub user, diffs them
 * against the projects already in projects.json, and appends entries for any
 * repo that isn't represented yet. Existing entries are never modified or
 * removed. Repos listed in the "exclude" array of projects.json are skipped;
 * add a repo name there to keep it off the site permanently.
 *
 * Usage:
 *   npm run sync-projects            # write new entries to projects.json
 *   npm run sync-projects -- --dry-run   # report only, write nothing
 *
 * Nothing is committed automatically — review with `git diff` afterwards.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const DATA_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'projects.json')
const dryRun = process.argv.includes('--dry-run')

const data = JSON.parse(readFileSync(DATA_PATH, 'utf8'))
const user = data.githubUser
const exclude = new Set((data.exclude ?? []).map((n) => n.toLowerCase()))
const known = new Set(
  data.projects.filter((p) => p.repo).map((p) => p.repo.toLowerCase())
)

const res = await fetch(
  `https://api.github.com/users/${user}/repos?per_page=100&type=owner&sort=pushed`,
  { headers: { Accept: 'application/vnd.github+json' } }
)
if (!res.ok) {
  console.error(`GitHub API request failed: ${res.status} ${res.statusText}`)
  process.exit(1)
}
const repos = await res.json()

const skipped = { forks: [], excluded: [], existing: [] }
const additions = []

for (const repo of repos) {
  const name = repo.name.toLowerCase()
  if (repo.fork) { skipped.forks.push(repo.name); continue }
  if (exclude.has(name)) { skipped.excluded.push(repo.name); continue }
  if (known.has(name)) { skipped.existing.push(repo.name); continue }

  additions.push({
    id: repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    repo: repo.name,
    title: titleFromRepoName(repo.name),
    description: repo.description ?? '',
    href: repo.html_url,
    image: null,
    language: repo.language ?? null,
    topics: repo.topics ?? [],
  })
}

// Turns e.g. "P2P-File-Transfer-System" or "AxiomChat" into readable words.
function titleFromRepoName(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
}

console.log(`Checked ${repos.length} public repos for ${user}.`)
console.log(`  already on site: ${skipped.existing.length} (${skipped.existing.join(', ') || '—'})`)
console.log(`  excluded:        ${skipped.excluded.length} (${skipped.excluded.join(', ') || '—'})`)
console.log(`  forks ignored:   ${skipped.forks.length} (${skipped.forks.join(', ') || '—'})`)

if (additions.length === 0) {
  console.log('\nNothing new — projects.json is up to date.')
  process.exit(0)
}

console.log(`\nNew project${additions.length === 1 ? '' : 's'} to add:`)
for (const p of additions) {
  console.log(`  + ${p.title} (${p.repo})${p.language ? ` — ${p.language}` : ''}`)
  if (!p.description) {
    console.log('      note: repo has no description on GitHub — add one to projects.json (or the repo) before publishing')
  }
}

if (dryRun) {
  console.log('\nDry run: projects.json not modified.')
  process.exit(0)
}

data.projects.push(...additions)
writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + '\n')
console.log(`\nWrote ${additions.length} new entr${additions.length === 1 ? 'y' : 'ies'} to src/data/projects.json.`)
console.log('Review with: git diff src/data/projects.json')
