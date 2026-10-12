---
title: Development
description: Build, lint and iterate on jh-vantage-theme locally
---

## Toolchain

| Tool | Version | Why |
| --- | --- | --- |
| Python | 3.10 or newer | packaging, and JupyterLab to try the theme |
| Node.js | 20 or newer (CI uses 24) | TypeScript and the extension bundler |
| `jlpm` | ships with `jupyter-builder` and JupyterLab | JupyterLab's pinned Yarn; use it instead of `yarn` or `npm` |

The project was generated from the
[JupyterLab extension template](https://github.com/jupyterlab/extension-template) with
copier (`.copier-answers.yml`), as a `theme` extension.

| Layer | Package |
| --- | --- |
| Python build backend | `hatchling` with the `hatch-jupyter-builder` hook and `hatch-nodejs-version` |
| Extension builder | `@jupyter/builder` (npm) and `jupyter-builder` (PyPI), which bundle with Rspack |
| Runtime API | `@jupyterlab/application`, `@jupyterlab/apputils` (`^4.0.0`, provided by the host JupyterLab) |
| Lint | ESLint 10 with `typescript-eslint`, Prettier 3, Stylelint 17 |
| Language | TypeScript 6.0 (the newest release `typescript-eslint` supports) |

The version lives in `package.json` alone; `hatch-nodejs-version` copies it into the
Python metadata.

## Set up

```bash
git clone https://github.com/vantagecompute/jupyterhub-theme
cd jupyterhub-theme
python -m venv .venv && . .venv/bin/activate
pip install "jupyterlab>=4.6,<5" "jupyter-builder>=1.2.3,<2" build
jlpm install
```

## Build

```bash
jlpm build          # development build, with source maps
jlpm build:prod     # production build into jh_vantage_theme/labextension
python -m build     # wheel and sdist into dist/ (runs build:prod itself)
```

## Try it in JupyterLab

```bash
pip install -e .
jupyter labextension develop . --overwrite
jupyter lab
```

Then pick **Settings > Theme > jh-vantage-theme**. To rebuild as you edit, run the
watcher in one terminal and JupyterLab in another, and refresh the browser after a change:

```bash
jlpm watch
jupyter lab
```

## Lint

```bash
jlpm lint:check     # stylelint, prettier and eslint, read-only (what CI runs)
jlpm lint           # the same, fixing what can be fixed
```

`style/variables.css` overrides JupyterLab's own rules, so its result depends on source
order and on class names JupyterLab and CodeMirror generate. The Stylelint rules that would
force reordering or renaming selectors (`no-descending-specificity`,
`no-duplicate-selectors`, `selector-class-pattern`) are off for that reason.

## Change the theme

- Colours, fonts and sizes: change the `--jp-*` variables at the top of
  `style/variables.css`. They are JupyterLab's public styling API, so prefer them to new
  selectors.
- Component styling: add rules further down `style/variables.css`. Keep them scoped to
  JupyterLab classes (`.jp-*`, `.lm-*`).
- Fonts and images: put them under `style/` and reference them with a relative `url()`;
  the bundler copies what the CSS references into the build.

## Continuous integration

`.github/workflows/build.yml` runs on pull requests and on `main`. It lints, runs
`build:prod`, builds the wheel the way the notebook image does (with an unwritable
`~/.cache`, see [Troubleshooting](./troubleshooting)), and installs the wheel on a runner
without Node.js to check JupyterLab loads it.

## Update the dependencies

1. Re-run the template if it has moved on:
   `copier update --trust` (answers are in `.copier-answers.yml`).
2. Raise the ranges in `package.json` and `pyproject.toml`, then `jlpm install` to refresh
   `yarn.lock`.
3. `jlpm lint:check`, `jlpm build:prod` and `python -m build` must all pass.
4. Bump the GitHub Actions to their newest release, pinned by commit SHA with the version
   in a comment.
