---
title: Installation
description: Install jh-vantage-theme into a JupyterLab 4 server and make it the default theme
---

## Requirements

- JupyterLab 4.x
- Python 3.10 or newer

Node.js is not needed to install a released wheel.

## Install a release

```bash
pip install "jh-vantage-theme==<version>"
```

Each release is also attached to its
[GitHub release](https://github.com/vantagecompute/jupyterhub-theme/releases) with a
`SHA256SUMS` file and a build provenance attestation. To check a downloaded wheel came
from this repository's release workflow:

```bash
gh attestation verify jh_vantage_theme-<version>-py3-none-any.whl \
  --repo vantagecompute/jupyterhub-theme
```

Confirm JupyterLab sees it:

```bash
jupyter labextension list
# jh-vantage-theme v<version> enabled OK (python, jh_vantage_theme)
```

## Make it the default theme

Users can pick the theme from **Settings > Theme**. To make it the default for every user
of a server or image, add a settings override to
`<sys.prefix>/share/jupyter/lab/settings/overrides.json`:

```json
{
  "@jupyterlab/apputils-extension:themes": {
    "theme": "jh-vantage-theme"
  }
}
```

This is what the Vantage notebook images do (see [vdeployer](./vdeployer)).

## Install from source

Installing from a git checkout or a git URL builds the extension, so it needs Node.js 20
or newer on the machine:

```bash
pip install "jh-vantage-theme @ git+https://github.com/vantagecompute/jupyterhub-theme@<commit>"
```

pip installs the build requirements (`hatchling`, `hatch-jupyter-builder`,
`jupyter-builder`) in an isolated environment, runs `jlpm install` and
`jlpm build:prod`, and packages the result. Prefer a released wheel: it is faster, needs
no Node.js and does not depend on the newest build tooling on the day you build.

## Uninstall

```bash
pip uninstall jh-vantage-theme
```
