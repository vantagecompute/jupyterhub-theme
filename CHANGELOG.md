# Changelog

<!-- <START NEW CHANGELOG ENTRY> -->

## 1.1.0

- Regenerate from the JupyterLab extension template (copier, v4.6.5) and build with
  `@jupyter/builder` and `jupyter-builder`. This fixes source builds failing with
  `PermissionError` on `~/.cache/jupyterlab_builder` since JupyterLab 4.6.0.
- Rename the Python package directory to `jh_vantage_theme`; the distribution and theme
  keep the name `jh-vantage-theme`. Remove the stale `omnivector-theme` build output and
  `setup.py`.
- Upgrade the toolchain: TypeScript 6.0, ESLint 10 with flat config, Prettier 3.9,
  Stylelint 17, hatch-jupyter-builder 0.10, Python 3.10 or newer.
- Fix `style/variables.css` lint errors without changing how the theme renders.
- Add CI, a tag-only release to PyPI with trusted publishing, and the docs site.

<!-- <END NEW CHANGELOG ENTRY> -->
