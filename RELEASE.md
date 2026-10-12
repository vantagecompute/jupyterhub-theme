# Making a new release of jh-vantage-theme

Releases are published by `.github/workflows/release.yml` from `v*` tags, and only from
this repository. Nothing is published by hand and no token is stored.

1. Open a pull request that sets `"version"` in `package.json` to the new version (the
   Python package takes its version from there) and adds a `CHANGELOG.md` entry. Merge it.
2. Tag the merge commit on `main` and push the tag:

   ```bash
   git switch main && git pull
   git tag v<version>
   git push origin v<version>
   ```

The workflow then:

- checks the tag matches `package.json`, lints and builds the wheel and sdist;
- attests their build provenance and publishes them to PyPI with
  [trusted publishing](https://docs.pypi.org/trusted-publishers/) (OIDC, environment
  `pypi`);
- creates the GitHub release with the wheel, sdist and `SHA256SUMS`;
- `.github/workflows/deploy-docs.yml` publishes the docs for the same tag.

## One-time setup

- PyPI: a trusted publisher for `jh-vantage-theme` with owner `vantagecompute`, repository
  `jupyterhub-theme`, workflow `release.yml` and environment `pypi`.
- GitHub: an environment named `pypi` whose deployments are limited to `v*` tags, and the
  immutable OIDC subject enabled for this repository.

See <https://docs.vantagecompute.ai/developer/jupyterhub-theme/releasing> for the details.
