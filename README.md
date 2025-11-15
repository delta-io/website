<p align="center">
  <a href="https://delta.io">
    <img alt="Delta Lake" src="public/images/icon.png" width="60" />
  </a>
</p>
<h1 align="center">Delta Lake Website</h1>

<p align="center">This repo contains the official source code for the <a href="https://delta.io">Delta Lake website</a>.</p>

<p align="center">
  <a href="https://app.netlify.com/sites/delta-io-beta/deploys">
    <img src="https://api.netlify.com/api/v1/badges/5fdc1202-ea78-42d3-b86d-e232c77e1b88/deploy-status" alt="Netlify status">
  </a>
</p>

## :rocket: Getting up and running locally

### Quick start

This project requires a YouTube API key which is used on various pages across the site. To generate an API key, refer to the docs on [Google Cloud](https://developers.google.com/youtube/v3/getting-started#before-you-start). Once you have generated an API key, create a file at `.env` with the following contents:

```sh
YOUTUBE_API_KEY=<api_key>
```

Then, to get up and running on your machine. First start by [installing pnpm](https://pnpm.io/installation).

Afterwards, install dependencies:

```sh
pnpm install
```

Finally, you can run a local Astro dev server by running the following command:

```sh
pnpm dev
```

### Code formatting

If you use Visual Studio Code, install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions to automatically format your code as you make changes.

Alternatively, you may run `pnpm lint` or `pnpm format` to run ESLint and Prettier, respectively. All changes are automatically linted (and will atempt to auto-fix) on the git pre-commit hook.

This repo runs automated checks on PRs, including the lint and formatting checks above. All PRs require linters to pass in order to deploy to production.

### Upgrading dependencies

It's a best practice to make sure that our dependencies are always up to date. You can run `scripts/upgrade-dependencies` to automatically install upgrades across all packages.

Do note that you will still need to verify that things work as expected.

### Helpful resources

- [Astro documentation](https://docs.astro.build/en/getting-started/) — guides, API reference, and more.
- [Tailwind v3 documentation](https://v3.tailwindcss.com/docs/) — for understanding the various classnames for styling.
- [YouTube Data API](https://developers.google.com/youtube/v3/docs) - for working with the YouTube API. 
- [Netlify documentation](https://docs.netlify.com/)

### Deployment process

The deployment process is automated. When the `main` branch is updated, the site is automatically deployed to production. On every PR, a branch preview will automatically be generated. This allows reviewers to preview your work in progress.

## Content collections

### Blogs

Blogs can be found in `src/content/blogs`.

Each blog is contained in its own directory with an `index.md` and other files (such as images) co-located together. Each directory uses the following naming structure: `YYYY-MM-DD-blog-title`

Each blog post requires the following frontmatter:

```md
---
title: New features in the Python deltalake 0.12.0 release
description: This post explains the new features in the Python deltalake 0.12.0 release
thumbnail: "./thumbnail.png"
author: ion-koutsouris
publishedAt: 2023-10-22
---
```

Overview of each field:

- **title:** Blog post title
- **description:** Blog post description
- **thumbnail:** Relative path to blog post thumbnail (usually `./thumbnail.png`)
- **author:** One or more `profile` IDs (see below). **IMPORTANT:** Profile IDs must exactly match the directory name in `src/content/profiles/`. For multiple authors, use a YAML array format:
  ```
  author:
  - carly-akerly
  - robert-pack
  ```
  Or for a single author:
  ```
  author: ion-koutsouris
  ```
  **If adding a new author:** Create a new profile folder in `src/content/profiles/[author-name]/` with an `index.md` file containing the required frontmatter (see Profiles section below).
- **publishedAt:** `YYYY-MM-DD` format date of when the post was published. **REQUIRED FIELD** - This date must exactly match the date in the directory name (e.g., if directory is `2025-09-25-Delta-Lake-4.0`, then `publishedAt` must be `2025-09-25`)

Other optional fields:

- **updatedAt:** If set, it will indicate that the blog post was last updated at this date.

The remaining content of the markdown file is the blog post body.

### Profiles

Profiles can be found in `src/content/profiles`.

Profiles represent individual contributors to the site. These are used throughout the site for different types of content types, including blogs and user stories. Profiles can be as simple as just their name, to full-featured pages with a description, quote, list of links, content, etc.

Like blog posts, they are also a directory with a `index.md` file and can have other files (such as images) co-located together. However, there is no requirement for the naming structure of the directory.

Each profile requires the following frontmatter:

```md
---
name: Ada Lovelace
---
```

Overview of each field:

- **name:** The person's full name (note: this should match the directory name)

Other optional fields:

- **photo:** Relative path to a photo of the person (photos should be in the folder)
- **role:** Optional job title/role to display alongside the person's name.
- **quote:** A quote to display on their profile page.
- **quoteSource:** A citation for their quote
- **linkedin:** The person's LinkedIn profile URL.
- **videos:** List of YouTube video IDs that can be featured on their profile.
- **otherReferences:** List of links that can be displayed on their profile.

### User stories

User stories can be found in `src/content/user-stories`.

User stories represent case studies. They are similar to blog posts, but are featured in the **Learn > Case Studies** page.

Like blog posts, they are also a directory with a `index.md` file and can have other files (such as images) co-located together. However, there is no requirement for the naming structure of the directory.

User stories require the following frontmatter

```md
---
title: Introducing Product Analytics on Delta Sharing, With Kubit
description: How Kubit and Delta Sharing improve product analytics
thumbnail: "./thumbnail.png"
author: stefan-enev
publishedAt: 2025-01-02
---
```

Overview of each field:

- **title:** User story title
- **description:** User story description
- **thumbnail:** Relative path to the thumbnail (usually `./thumbnail.png`)
- **author:** One or more `profile` IDs (see below)
- **publishedAt:** `YYYY-MM-DD` format date of when the user story was published

### Integrations

Profiles can be found in `src/content/integrations`.

Integrations are displayed on the **Integrations** page. Unlike other content types, they are JSON files.

Images for integrations live in the `src/content/integrations/images` directory.

## :handshake: Contributing

All changes are proposed as a [pull request](https://github.com/delta-io/website/pulls). Simply create a pull request and request a review and we'll get on it.

### Blog posts

We encourage blog post contributions from the community, but have strict topic and quality standards.

The blog post topic should not overlap with any existing content. We prefer updating existing content instead of creating overlapping content. We wouldn't want a post like "Delta Lake Z Ordering large datasets" blog post because we already have a [Delta Lake Z Order](https://delta.io/blog/2023-06-03-delta-lake-z-order/) post.

Please create an issue with your proposed title before writing the blog post!

Blog posts should generally be around 2,000 words, target a relevant, high-value keyword, and be easy to read.

You can add a blog by adding a directory with some files to `src/content/blog`. Here's an example:

```
packages/
  delta-site/
    src/
      blog/
        2023-10-22-delta-rs-python/
          index.mdx
          thumbnail.png
```

Guidelines:

- The directory name should contain the following format: `YYYY-MM-DD-blog-title`
- All of the images that correspond to the blog post should be saved in the respective folder.
- The top of the `index.mdx` file should contain the following metadata:

  ```md
  ---
  title: New features in the Python deltalake 0.12.0 release
  description: This post explains the new features in the Python deltalake 0.12.0 release
  thumbnail: "./thumbnail.png"
  author: ion-koutsouris
  publishedAt: 2023-10-22
  ---
  ```

  Keep in mind that the `author` metadata refers to a profile under `src/content/profiles`.
