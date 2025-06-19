<p align="center">
  <a href="https://delta.io">
    <img alt="Delta Lake" src="packages/delta-site/public/images/icon.png" width="60" />
  </a>
</p>
<h1 align="center">Delta Lake Website</h1>

<p align="center">This repo contains the official source code for the <a href="https://delta.io">Delta Lake website</a>.</p>

<p align="center">
  <a href="https://app.netlify.com/sites/delta-io-beta/deploys">
    <img src="https://api.netlify.com/api/v1/badges/5fdc1202-ea78-42d3-b86d-e232c77e1b88/deploy-status" alt="Netlify status">
  </a>
</p>

## Developer guide

### Getting started

This site requires a development `YOUTUBE_API_KEY` which populates the YouTube videos in the learn > videos, learn > tutorials, and community pages.

- To generate an API key, refer to [How to Get a YouTube API Key [Tutorial + Examples]](https://blog.hubspot.com/website/how-to-get-youtube-api-key)

Install dependencies and start the local development server:

```ts
pnpm i
YOUTUBE_API_KEY=<string> pnpm --filter delta-site dev
YOUTUBE_API_KEY=<string> pnpm --filter delta-site build
YOUTUBE_API_KEY=<string> pnpm --filter delta-site preview
```

### Code formatting

Global operations
Lint (via eslint) the entire repo: `pnpm lint`
Format (via prettier) the entire repo: `pnpm format`

### Helpful resources

- [Astro documentation](https://docs.astro.build/en/getting-started/) — guides, API reference, and more.
- [Tailwind v3 documentation](https://v3.tailwindcss.com/docs/) — for understanding the various classnames for styling.
- [YouTube Data API](https://developers.google.com/youtube/v3/docs) - for working with the YouTube API. 
- [Netlify documentation](https://docs.netlify.com/)

### Project structure

We use a monorepo pattern to separate individual packages. We currently have two packages:

- delta-site - The delta.io website source code
- delta-theme - The underlying theme used by delta-site

#### delta-site

We mostly follow Astro's [standard project structure](https://docs.astro.build/en/basics/project-structure/). The most notable directory is the `src` folder, which includes the following folders:

- `src/components` - Contains various shared components. The "standard" component library is located directly in this folder, while page layouts are located in `src/components/layouts` and page-specific components are located in `src/components/pages`.
- `src/config` - Site configuration, which are "globals" for various things such as menus, site title, etc.
- `src/content` - Content collections. See below for how to use them.
- `src/pages` - Page routes. Astro uses this directory to generate the page routing structure.
- `src/utils` - Various utility functions used by different pages, including fetching data from the YouTube Data API.

#### delta-theme

This is the theme source code for delta-site. It includes various plugin configurations, as well as the components used by the site.

### Blog posts

We encourage blog post contributions from the community, but have strict topic and quality standards.

The blog post topic should not overlap with any existing content. We prefer updating existing content instead of creating overlapping content. We wouldn't want a post like "Delta Lake Z Ordering large datasets" blog post because we already have a [Delta Lake Z Order](https://delta.io/blog/2023-06-03-delta-lake-z-order/) post.

Please create an issue with your proposed title before writing the blog post!

Blog posts should generally be around 2,000 words, target a relevant, high-value keyword, and be easy to read.

You can add a blog by adding a directory with some files to `src/blog`. Here's an example:

```
delta-site/
         src/
           blog/
              2023-10-22-delta-rs-python/
                index.mdx
                thumbnail.png
```

All of the images that correspond to the blog post should be saved in the respective folder.

The top of the `index.mdx` file should contain the following metadata:

```
---
title: New features in the Python deltalake 0.12.0 release
description: This post explains the new features in the Python deltalake 0.12.0 release
thumbnail: "./thumbnail.png"
author: ion-koutsouris
publishedAt: 2023-10-22
---
```

## Upgrading dependencies

It's a best practice to make sure that our dependencies are always up to date. You can run `scripts/upgrade-dependencies` to automatically install upgrades across all packages.

Do note that you will still need to verify that things work as expected.
