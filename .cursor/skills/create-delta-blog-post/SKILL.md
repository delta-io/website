---
name: create-delta-blog-post
description: >-
  Scaffolds a new Delta Lake blog post under `src/content/blog/`. Guides the
  user through generating a URL-safe dated slug directory, front matter
  (title, description, thumbnail, author, publishedAt) matching the schema in
  `src/content.config.ts`, optionally creating new author profiles under
  `src/content/profiles/`, and pasting/grammar-checking initial content. Use
  when the user says "new blog post", "create a blog", "delta blog", "scaffold
  a post", or asks to add a post under `src/content/blog`.
---

# Create Delta Blog Post

Scaffold a new blog post in this repo (`delta-io/website`) end-to-end. Drive the workflow with `AskQuestion` for every decision point, then write files. The blog and profile schemas live in [src/content.config.ts](../../../src/content.config.ts) — keep generated front matter in lockstep with them.

## Workflow Checklist

Track progress as you go:

```
- [ ] 1. Generate dated, URL-safe slug from the blog title
- [ ] 2. Confirm and create src/content/blog/<dated-slug>/
- [ ] 3. Collect front matter via dialog (title, description, thumbnail, authors, publishedAt)
- [ ] 4. For each missing author, run the new-author sub-flow
- [ ] 5. Write index.md with front matter
- [ ] 6. Optionally paste content + run grammar/spelling pass
- [ ] 7. Optionally verify links
- [ ] 8. Print final checklist for the user
```

## Step 1 — Slug & Directory

1. Ask the user for the **blog title** (the long, human-readable form). Use `AskQuestion` only if the title isn't already in the conversation; otherwise just confirm it.
2. Determine the **creation date** as today's date in `YYYY-MM-DD` (use the `<timestamp>` from the system, not a guess).
3. Slugify the title:
   - lowercase everything
   - strip punctuation: `,` `:` `.` `?` `!` `"` `'` `(` `)` `[` `]` `{` `}` `;` backticks
   - replace whitespace, `&`, `/`, `\`, and `_` with a single `-`
   - drop any non-ASCII characters (transliterate accents to ASCII first if reasonable)
   - collapse repeated `-`
   - trim leading/trailing `-`
4. Final directory name: `{YYYY-MM-DD}-{slug}` under `src/content/blog/`.

**Worked example:**

- Title: `Delta Grows Up: Writes, Time Travel, and Unity Catalog`
- Date: `2026-05-06`
- Result: `src/content/blog/2026-05-06-delta-grows-up-writes-time-travel-and-unity-catalog/`

Confirm the resulting path with the user before creating it. If a directory with that name already exists, surface that and ask whether to choose a different slug or overwrite.

## Step 2 — Front Matter Dialog

The `blog` collection schema (from `src/content.config.ts`) requires:

- `title: string`
- `description: string`
- `author: reference("profiles") | reference("profiles")[]`
- `publishedAt: date`
- `thumbnail: image`
- `updatedAt: date` (optional)

Ask each of the following with `AskQuestion`. Keep questions short and present concrete options when meaningful.

### a. Title

The title in front matter does not need to match the slug. Default to the user-provided title; offer a single follow-up to override with an alternative `title` if they want a different display title than what was used to generate the slug.

### b. Description

Two options:

- **Write now** — collect a description ≤200 characters intended for the preview/social card.
- **Defer** — insert `description: TODO add description before publishing` and remind the user this must be filled in before merge.

### c. Thumbnail

Ask for the thumbnail filename or path (target ~1200x628):

- If the user provides a file path, copy/move it into the new blog directory and reference it as `./<filename>` in front matter.
- If the user has nothing yet, default to `thumbnail: ./thumbnail.png` and warn that the file must be added before the site builds (the schema requires a real image).

### d. Authors

Accept one or more author slugs. For each entered slug:

1. Check whether `src/content/profiles/<slug>/index.md` exists.
2. If it does **not** exist, run the **New Author Sub-Flow** in Step 3 before adding the slug to the list.
3. Always emit the `author` field as a YAML list, even when there is only one author. This matches existing posts such as [src/content/blog/2026-04-17-delta-4-2-released/index.md](../../../src/content/blog/2026-04-17-delta-4-2-released/index.md).

### e. publishedAt

Ask for the expected publication date in `YYYY-MM-DD` form. Default to today if the user has no preference. (`updatedAt` is optional — only add it if the user explicitly asks.)

### Generated `index.md` template

Write the front matter exactly in this shape (drop the body for now — it's filled in Step 4):

```markdown
---
title: <title>
description: <description-or-TODO>
thumbnail: ./<thumbnail-filename>
author:
  - <author-slug>
publishedAt: <YYYY-MM-DD>
---
```

## Step 3 — New Author Sub-Flow

Triggered when the user names an author whose profile doesn't exist yet. The `profiles` schema allows: `name` (required), and optional `photo`, `role`, `quote`, `quoteSource`, `linkedin`, `videos`, `otherReferences`.

Reference: [src/content/profiles/scott-haines/index.md](../../../src/content/profiles/scott-haines/index.md).

Sub-flow:

1. Ask for the author's full **name**.
2. Derive a profile **slug** the same way as the blog slug (lowercase, ASCII, hyphenated). Confirm it with the user — pre-existing slugs in `src/content/profiles/` like `dennyglee` or `scottsandre` show some authors prefer non-hyphenated forms, so allow a manual override.
3. Confirm `src/content/profiles/<slug>/` does not already exist.
4. Ask (each is optional, allow skip):
   - **Role** — e.g. `Staff Software Engineer`.
   - **LinkedIn URL** — must be a valid `https://...` URL if provided (schema enforces `.url()`).
   - **Headshot** — if provided, place at `src/content/profiles/<slug>/<slug>.<ext>` and reference as `photo: ./<slug>.<ext>`.
5. Write `src/content/profiles/<slug>/index.md` containing only the fields the user provided. Always include `name`. Omit empty optional fields entirely (do not write `role: ` with no value).

Example output for a minimal new profile:

```markdown
---
name: Jane Doe
role: Senior Engineer
linkedin: https://www.linkedin.com/in/janedoe/
---
```

After the profile is written, return to Step 2d and add the new slug to the post's `author` list.

## Step 4 — Content & Grammar Pass

Ask the user: **"Do you have draft content to paste in now?"**

- **No** → leave the body empty after the front matter and skip to Step 6.
- **Yes** → wait for the user to paste the markdown body, then:
  1. Insert the body into `index.md` directly under the closing `---`.
  2. Run a **grammar/spelling pass only**. Rules:
     - Fix misspellings, typos, missing/extra spaces, broken punctuation, obvious subject/verb agreement errors, and capitalization.
     - **Do not** rewrite sentences, restructure paragraphs, change voice, or "improve" wording.
     - **Do not** add or remove content. If something is unclear, leave it as a question for the user, don't guess.
  3. Briefly summarize the corrections made (e.g. "Fixed 3 spellings: `Catalouge` → `Catalog`, `recieve` → `receive`, `untill` → `until`").

## Step 5 — Optional Link Verification

After content is in place, ask: **"Want me to verify the links in the post?"** Offer two modes via `AskQuestion`:

- **Automated check** — extract every external URL (skip relative paths, anchor-only links like `#section`, and `mailto:`), then for each run:

  ```bash
  curl -sI -L -o /dev/null -w "%{http_code}" --max-time 10 "<url>"
  ```

  Flag any URL whose final status is not in `2xx`/`3xx`. Report results as a table: URL, status code, verdict.

- **Manual list** — extract every external URL and print them as a checklist for the user to spot-check; do not make any network calls.

## Step 6 — Final Checklist

Print this checklist to the user as the last step:

```
- [ ] Directory created at src/content/blog/<dated-slug>/
- [ ] index.md front matter validates against the blog schema
- [ ] Thumbnail file present in the directory (or TODO noted)
- [ ] Every author slug resolves to src/content/profiles/<slug>/index.md
- [ ] publishedAt is a valid YYYY-MM-DD
- [ ] Description is ≤200 chars or marked TODO
- [ ] Grammar/spelling pass run if content was pasted
- [ ] Links verified (or manual list provided) if content was pasted
```

## Out of Scope

- Running `astro check` or building the site.
- Image resizing or optimization.
- Creating commits, branches, or PRs (let the user drive Git).
