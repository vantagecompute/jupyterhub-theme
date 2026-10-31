---
title: How vdeployer consumes the theme
description: How the Vantage notebook images install jh-vantage-theme and make it the default
---

## Where it is installed

[`vdeployer`](https://github.com/vantagecompute/vdeployer) builds the Vantage notebook
images from `dockerfiles/vantage-notebook/Dockerfile`. The same Dockerfile builds
`vantage-notebook` and, with a CUDA base image, `vantage-notebook-gpu`; each is released by
its own `vantage-notebook-v<version>` / `vantage-notebook-gpu-v<version>` tag.

The theme is not a submodule, an npm dependency or a vendored copy. The Dockerfile
installs it with pip, as the notebook user, pinned to a commit of this repository:

```dockerfile
USER ${NB_UID}

# Install Vantage JupyterLab theme
RUN pip install "jh-vantage-theme @ git+https://github.com/vantagecompute/jupyterhub-theme@<commit>"
```

and copies a settings override that makes it the default theme:

```dockerfile
COPY overrides.json /opt/conda/share/jupyter/lab/settings/overrides.json
```

```json
{
  "@jupyterlab/apputils-extension:themes": {
    "theme": "jh-vantage-theme"
  }
}
```

## What that install does

A git URL is a source install, so the image build compiles the extension:

1. pip creates an isolated build environment with the build requirements from
   `pyproject.toml` (`hatchling`, `hatch-nodejs-version`, `jupyter-builder`).
2. The `hatch-jupyter-builder` hook runs `yarn install` and `yarn build:prod`, so the
   image needs Node.js 26 and the pinned Yarn 4.18.1 on `PATH`.
3. hatchling packages `jh_vantage_theme/labextension` into the wheel, which pip installs
   into `/opt/conda`.

Because the build requirements are resolved when the image is built, a new release of the
JupyterLab build tooling can change the result of a build whose pin has not moved. That is
what broke the notebook images in June 2026 (see
[Troubleshooting](./troubleshooting#permission-denied-on-cachejupyterlab_builder)).

## Updating the pin

Point the `pip install` line at the new commit on `main` of this repository. Once
releases are published, pin the released version instead:

```dockerfile
RUN pip install "jh-vantage-theme==<version>"
```

A released wheel is prebuilt, so the image build no longer needs Node.js for the theme or
the newest build tooling on the day of the build.

## Checking an image

```bash
docker run --rm ghcr.io/vantagecompute/vantage-notebook:<tag> \
  jupyter labextension list 2>&1 | grep jh-vantage-theme
```
