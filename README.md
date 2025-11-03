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

## :rocket: Getting up and running locally

### Quick start

This project requires a YouTube API key which is used on various pages across the site. To generate an API key, refer to the docs on [Google Cloud](https://developers.google.com/youtube/v3/getting-started#before-you-start). Once you have generated an API key, create a file at `packages/delta-site/.env` with the following contents:

```sh
YOUTUBE_API_KEY=<api_key>
```

Then, to get up and running on your machine, first start by [installing pnpm](https://pnpm.io/installation).

Afterwards, install dependencies:

```sh
pnpm install
```

Finally, you can run a local Astro dev server by running the following command:

```sh
pnpm --filter delta-site dev
```

### Code formatting

If you use Visual Studio Code, install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions to automatically format your code as you make changes.

Alternatively, you may run `pnpm lint` or `pnpm format` to run ESLint and Prettier, respectively. All changes are automatically linted (and will atempt to auto-fix) on the git pre-commit hook.

This repo runs automated checks on PRs, including the lint and formatting checks above. All PRs require linters to pass in order to deploy to production.

### Deployment process

The deployment process is automated. When the `main` branch is updated, the site is automatically deployed to production. On every PR, a branch preview will automatically be generated. This allows reviewers to preview your work in progress.

### Project structure

We use a monorepo pattern to separate individual packages. We currently have two packages:

- **delta-site** - The delta.io website source code. Contains the site content, including blog posts.
- **delta-theme** - The underlying theme and plugin configuration used by delta-site.

Please refer to the README for each respective package for more details about them.

### Upgrading dependencies

It's a best practice to make sure that our dependencies are always up to date. You can run `scripts/upgrade-dependencies` to automatically install upgrades across all packages.

Do note that you will still need to verify that things work as expected.

### Helpful resources

- [Astro documentation](https://docs.astro.build/en/getting-started/) — guides, API reference, and more.
- [Tailwind v3 documentation](https://v3.tailwindcss.com/docs/) — for understanding the various classnames for styling.
- [YouTube Data API](https://developers.google.com/youtube/v3/docs) - for working with the YouTube API. 
- [Netlify documentation](https://docs.netlify.com/)

## :handshake: Contributing

All changes are proposed as a [pull request](https://github.com/delta-io/website/pulls). Simply create a pull request and request a review and we'll get on it.

### Blog posts

We encourage blog post contributions from the community, but have strict topic and quality standards.

The blog post topic should not overlap with any existing content. We prefer updating existing content instead of creating overlapping content. We wouldn't want a post like "Delta Lake Z Ordering large datasets" blog post because we already have a [Delta Lake Z Order](https://delta.io/blog/2023-06-03-delta-lake-z-order/) post.

Please create an issue with your proposed title before writing the blog post!

Blog posts should generally be around 2,000 words, target a relevant, high-value keyword, and be easy to read.

You can add a blog by adding a directory with some files to `packages/delta-site/src/content/blog`. Here's an example:

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

  Keep in mind that the `author` metadata refers to a profile under `packages/delta-site/src/content/profiles`.
