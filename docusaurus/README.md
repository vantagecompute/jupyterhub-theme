# jupyterhub-theme docs

Docusaurus site for `jh-vantage-theme`, published as a spoke of the Vantage docs hub at
`https://docs.vantagecompute.ai/developer/jupyterhub-theme/`.

```bash
cd docusaurus
yarn install --immutable
yarn start        # dev server
yarn build        # production build into docusaurus/build
```

`.github/workflows/deploy-docs.yml` builds the site and syncs it to the docs bucket on
`v*` tags. See `vantagecompute/vantage-docs` (README, "Integrating a Spoke Project") for
how the hub and spokes fit together.
