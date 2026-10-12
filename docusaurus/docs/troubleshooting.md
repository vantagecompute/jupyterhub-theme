---
title: Troubleshooting
description: Known jh-vantage-theme build failures and how to fix them
---

## Permission denied on .cache/jupyterlab_builder

```text
(Deprecated) 'jupyter labextension build' is deprecated, use 'jupyter-builder build' instead.
@jupyterlab/core-meta was not found in node_modules. This extension declares a devDependency
on @jupyterlab/builder@4.0.x, which is a legacy package ...
UserWarning: PermissionError: [Errno 13] Permission denied: '/home/jovyan/.cache/jupyterlab_builder'
subprocess.CalledProcessError: Command '[..., 'jlpm', 'run', 'build:prod']' returned non-zero exit status 1.
error: metadata-generation-failed
```

**Seen in:** the vdeployer `vantage-notebook` and `vantage-notebook-gpu` image builds, from
June 2026 until this repository moved to `@jupyter/builder`.

**Cause.** Versions of the theme up to 1.0.0 declared the legacy `@jupyterlab/builder` and
built with `jupyter labextension build`, and their build requirements allowed any
JupyterLab 4. JupyterLab 4.6.0 (18 June 2026) hands that command to the new
`jupyter-builder`, which needs `@jupyterlab/core-meta`. The legacy builder does not
install it, so `jupyter-builder` downloads it into `~/.cache/jupyterlab_builder`. In the
notebook image, `/home/jovyan/.cache` is created by root during an earlier build step, so
the notebook user cannot write there and the build fails.

**Fix.** Build with `@jupyter/builder`, which installs `@jupyterlab/core-meta` into
`node_modules`, so `jupyter-builder` never touches the home cache. Version 1.1.0 and later do
this. CI builds the wheel with an unwritable `~/.cache` to keep it that way.

If you hit this on an older commit, either move the pin to a fixed one or make the cache
writable for the build (`XDG_CACHE_HOME=/tmp/cache pip install ...`).

## The theme does not appear in Settings > Theme

- `jupyter labextension list` must show `jh-vantage-theme ... enabled OK`. If it is missing,
  the wheel was installed into a different environment from the one running JupyterLab.
- If it is listed but not `OK`, the JupyterLab version is outside 4.x.

## Lint fails on style/variables.css

Run `jlpm stylelint` to fix formatting. Ordering rules are off on purpose; see
[Development](./development#lint).
