<p align="center">
  <a href="https://delta.io">
    <img alt="Delta Lake" src="src/images/icon.png" width="60" />
  </a>
</p>
<h1 align="center">Delta Lake Website</h1>

<p align="center">This repo contains the official source code for the <a href="https://delta.io">Delta Lake website</a>.</p>

<p align="center">
  <a href="https://app.netlify.com/sites/delta-lake/deploys">
    <img src="https://api.netlify.com/api/v1/badges/1728ed28-4d36-4f40-9a46-a649be7bb58c/deploy-status" alt="Netlify status">
  </a>
</p>

## :rocket: Getting up and running locally

Simply check out this repo, run `npm install`, then run `npm run develop`.

### Code formatting

If you use Visual Studio Code, install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions to automatically format your code as you make changes.

Alternatively, you may run `npm run lint` or `npm run lint:fix` to both check for and fix lint issues, respectively. All changes are automatically linted (and will attempt to auto-fix) on the git pre-commit hook.

**All PRs require linters to pass in order to deploy to production.**

## :handshake: Contributing

All changes are proposed as a [pull request](https://github.com/jakebellacera/delta-lake/pulls). Simply create a pull request and request a review and we'll get on it.
