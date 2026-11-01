---
title: "jupyterhub-theme - The Vantage JupyterLab theme"
description: "What jh-vantage-theme is, what it ships and where Vantage uses it"
slug: /
---

## What it is

`jh-vantage-theme` is a JupyterLab 4 theme extension that gives the notebooks Vantage
runs for its users the Vantage Compute look: colours, typography, toolbar and side panel
styling, and the Vantage logo in the top bar. It lives in
[`vantagecompute/jupyterhub-theme`](https://github.com/vantagecompute/jupyterhub-theme).

It is a **prebuilt** (federated) extension. The Python package carries the compiled
JavaScript and CSS, so installing the wheel is all a JupyterLab server needs: no Node.js
and no `jupyter lab build` at install time.

| Name | Value |
| --- | --- |
| Python distribution | `jh-vantage-theme` (wheel `jh_vantage_theme-<version>-py3-none-any.whl`) |
| Python import package | `jh_vantage_theme` |
| Lab extension and theme name | `jh-vantage-theme` |
| JupyterLab | 4.x |
| Python | 3.14 or newer |

## What it ships

```text
share/jupyter/labextensions/jh-vantage-theme/
  package.json            extension metadata read by JupyterLab
  install.json            tells JupyterLab the extension came from pip
  static/                 the federated module (remoteEntry, chunks, style.js)
  themes/jh-vantage-theme/
    index.css             the theme stylesheet (style/index.css + style/variables.css)
```

The source is small:

- `src/index.ts` registers the theme with JupyterLab's `IThemeManager` as a light theme
  named `jh-vantage-theme`.
- `style/variables.css` overrides JupyterLab's `--jp-*` CSS variables and styles a set of
  JupyterLab components. `style/index.css` imports it and is the theme entry point
  (`jupyterlab.themePath` in `package.json`).
- `style/assets/fonts/` holds the bundled fonts.

## Where Vantage uses it

The Vantage notebook images built by
[`vdeployer`](https://github.com/vantagecompute/vdeployer) (`vantage-notebook` and
`vantage-notebook-gpu`) install the theme and make it the default with a JupyterLab
settings override. See [How vdeployer consumes the theme](./vdeployer).

## Where to go next

- [Installation](./installation): install it into a JupyterLab server.
- [Development](./development): build, lint and work on the theme locally.
- [Releasing](./releasing): how a release reaches PyPI and GitHub, and why it needs no token.
- [Troubleshooting](./troubleshooting): known build failures and their fixes.
