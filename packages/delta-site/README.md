# delta-site

Contains the delta.io website source code.

## Developer guide

We require the `YOUTUBE_API_KEY` as an environment variable for various pages. You can optionally create an `.env` file to reuse your API key for development purposes.

### Available commands

Run commands with [pnpm](https://pnpm.io/installation):

```sh
pnpm dev      # Starts the development server
pnpm test     # Runs unit tests (in interactive mode)
pnpm test:ci  # Runs unit tests (once — for CI environments)
pnpm build    # Generates a production build and writes it to disk
pnpm preview  # Preview your build locally
pnpm astro    # Runs Astro CLI
```

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
- **author:** One or more `profile` IDs (see below)
- **publishedAt:** `YYYY-MM-DD` format date of when the post was published (this should match the date in the directory name)

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

## Component library

The components in this project are page-specific. All "global" components can be found in the `delta-theme` package.

## Helpful resources

- [Astro documentation](https://docs.astro.build/en/getting-started/) — guides, API reference, and more.
- [Tailwind v3 documentation](https://v3.tailwindcss.com/docs/) — for understanding the various classnames for styling.
- [YouTube Data API](https://developers.google.com/youtube/v3/docs) - for working with the YouTube API. 
- [Netlify documentation](https://docs.netlify.com/)
