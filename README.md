<p align="center">
  <a href="https://delta.io">
    <img alt="Delta Lake" src="static/images/icon.png" width="60" />
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

This site requires Node 16, which you can install with `brew install node@16`.

Simply check out this repo, run `npm install --legacy-peer-deps`, then run `npm run develop`.

To open a localhost version of the site, run `npm run start`.

### Code formatting

If you use Visual Studio Code, install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions to automatically format your code as you make changes.

Alternatively, you may run `npm run lint` or `npm run lint:fix` to both check for and fix lint issues, respectively. All changes are automatically linted (and will attempt to auto-fix) on the git pre-commit hook.

This repo runs automated checks on PRs, like the lint check above. Sometimes this process can hang. If you see the process hang, try running an empty commit and push the commit to rerun the checks. You can do this by running the following git command `git commit --allow-empty -m "Empty commit"` then pushing the commit to origin.

**All PRs require linters to pass in order to deploy to production.**

## :handshake: Contributing

All changes are proposed as a [pull request](https://github.com/delta-io/website/pulls). Simply create a pull request and request a review and we'll get on it.

You can add a blog by adding a directory with some files to `src/blog`. Here's an example:

```
src/
  blog/
    2022-09-23-convert-parquet-to-delta/
      index.mdx
      thumbnail.png
```

All of the images that correspond to the blog post should be saved in the respective folder.

The top of the `index.mdx` file should contain the following metadata:

```
---
title: Converting from Parquet to Delta Lake
description: This post shows how to convert a Parquet table to a Delta Lake.
thumbnail: ./thumbnail.png
author: Matthew Powers
---
```

You can also add the new blog post to the homepage by updating the `src/components/pages/index/LatestUpdateSection/index.jsx` file.

[This commit](https://github.com/delta-io/website/commit/432449ad8126355aae40ef9b09e346d47f30d23c) is a good example of how to add a blog post.
