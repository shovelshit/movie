# Movie

Source for the Movie Monitor web UI (`pages/maoyan/`) and Electron client
(`desktop/`). The canonical web domain is `https://movie.ltools.asia/`.

The `tools` parent repository owns the Cloudflare Worker, including
`worker/src/maoyan/`, shared account/authentication code, database migrations,
routes, secrets, and deployment. This repository must be integrated at the
parent's expected relative paths; the parent publishes the web assets and
provides the APIs used by the desktop client. Changes to API contracts require
coordinated parent changes. This repository does not deploy independently.

Local checks (Node.js required):

```sh
node --test pages/maoyan/*.test.cjs
cd desktop && npm ci && npm test
```

Some desktop checks still require files in the parent checkout, notably the
release workflow, Worker fixtures, and Store UI fixtures. Run the full
integration and packaging checks from the parent after integration.
