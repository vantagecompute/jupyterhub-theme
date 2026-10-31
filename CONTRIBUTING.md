# Contributing

## Development install

Note: You will need Node.js to build the extension package.
You may install it from [nodejs.org](https://nodejs.org/en/download). We
recommend Node.js 26, which CI uses.

The project uses [Yarn](https://yarnpkg.com/) 4.18.1, pinned with its sha512 in the
`packageManager` field of `package.json`. Node.js 26 ships no corepack, so install that
release the way `.github/actions/setup-yarn` does (download it from repo.yarnpkg.com and
check it against the pin). Use `yarn` below; JupyterLab's `jlpm` is an older Yarn and
cannot read this project's lockfile or `.yarnrc.yml`.

```bash
# Clone the repo to your local environment
# Change directory to the jh_vantage_theme directory

# Set up a virtual environment and install package in development mode
python -m venv .venv
source .venv/bin/activate
pip install --editable "."

# Link your development version of the extension with JupyterLab
jupyter-builder develop . --overwrite

# Rebuild extension Typescript source after making changes
# IMPORTANT: Unlike the steps above which are performed only once, do this step
# every time you make a change.
yarn build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
yarn watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `yarn build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

## Development uninstall

```bash
pip uninstall jh_vantage_theme
```

In development mode, you will also need to remove the symlink created by `jupyter-builder develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jh-vantage-theme` within that folder.

## Packaging the extension

See [RELEASE](RELEASE.md)
