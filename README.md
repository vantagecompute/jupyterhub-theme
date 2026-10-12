# jh-vantage-theme

The Vantage Compute theme for JupyterLab 4. It is a prebuilt extension: install the Python
package and JupyterLab picks it up, with no Node.js and no `jupyter lab build`.

The Vantage notebook images built by
[vdeployer](https://github.com/vantagecompute/vdeployer) install it and make it the
default theme.

Full documentation: <https://docs.vantagecompute.ai/developer/jupyterhub-theme/>
(source in [`docusaurus/`](docusaurus/)).

## Requirements

- JupyterLab 4.x
- Python 3.10 or newer

## Install

```bash
pip install jh-vantage-theme
```

To make it the default theme, add this to
`<sys.prefix>/share/jupyter/lab/settings/overrides.json`:

```json
{
  "@jupyterlab/apputils-extension:themes": {
    "theme": "jh-vantage-theme"
  }
}
```

## Uninstall

```bash
pip uninstall jh-vantage-theme
```

## Develop

You need Node.js 20 or newer.

```bash
python -m venv .venv && . .venv/bin/activate
pip install "jupyterlab>=4.6,<5" "jupyter-builder>=1.2.3,<2" build
jlpm install
jlpm lint:check     # stylelint, prettier, eslint
jlpm build:prod     # build the extension into jh_vantage_theme/labextension
python -m build     # wheel and sdist into dist/
```

To work on the theme in a running JupyterLab:

```bash
pip install -e .
jupyter labextension develop . --overwrite
jlpm watch          # in one terminal
jupyter lab         # in another; refresh the browser after a change
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for more.

## Release

See [RELEASE.md](RELEASE.md). Releases publish to PyPI and GitHub from `v*` tags only,
through OIDC trusted publishing, with no stored token.
