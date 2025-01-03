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

This site requires Node 20 or greater, which you can install with `brew install node@20`.

This site requires a development `YOUTUBE_API_KEY` which populates the YouTube videos in the learn > videos, learn > tutorials, and community pages. That is, ensure you have created a `.env.development` file in the root folder; the file should look like:

```
//.env.development

YOUTUBE_API_KEY = $API_KEY$
```

- To generate an API key, refer to [How to Get a YouTube API Key [Tutorial + Examples]](https://blog.hubspot.com/website/how-to-get-youtube-api-key)
- For more information on Gatsby environment files, please refer to [How to implement '.env' variables in Gatsby and React](https://dev.to/steeeeeph/how-to-implement-env-variables-in-gatsby-and-react-252d)

Simply check out this repo, run `npm install --legacy-peer-deps`, then run `npm run develop`.

To open a localhost version of the site, run `npm run start`.

### Code formatting

If you use Visual Studio Code, install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions to automatically format your code as you make changes.

Alternatively, you may run `npm run lint` or `npm run lint:fix` to both check for and fix lint issues, respectively. All changes are automatically linted (and will attempt to auto-fix) on the git pre-commit hook.

This repo runs automated checks on PRs, like the lint check above. Sometimes this process can hang. If you see the process hang, try running an empty commit and push the commit to rerun the checks. You can do this by running the following git command `git commit --allow-empty -m "Empty commit"` then pushing the commit to origin.

**All PRs require linters to pass in order to deploy to production.**

## :handshake: Contributing

All changes are proposed as a [pull request](https://github.com/delta-io/website/pulls). Simply create a pull request and request a review and we'll get on it.

### Blog posts

We encourage blog post contributions from the community, but have strict topic and quality standards.

The blog post topic should not overlap with any existing content. We prefer updating existing content instead of creating overlapping content. We wouldn't want a post like "Delta Lake Z Ordering large datasets" blog post because we already have a [Delta Lake Z Order](https://delta.io/blog/2023-06-03-delta-lake-z-order/) post.

Please create an issue with your proposed title before writing the blog post!

Blog posts should generally be around 2,000 words, target a relevant, high-value keyword, and be easy to read.

You can add a blog by adding a directory with some files to `src/blog`. Here's an example:

```
src/
  blog/
    convert-parquet-to-delta/
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
