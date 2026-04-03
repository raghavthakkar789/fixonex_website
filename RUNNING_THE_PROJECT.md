# Running the FIXONEX Website

## Prerequisites

- **Node.js** 20.x or 22.x LTS (recommended: **20.18+** or **22.12+**). Next.js 15 and React 19 expect a current Node release.
- **npm** 10+ (bundled with Node), or another package manager if you prefer—commands below use npm.

Verify versions:

```bash
node -v
npm -v
```

## Install dependencies

From the project root (`fixonex_website`):

```bash
npm install
```

## Environment setup

1. Copy the example environment file:

   ```bash
   copy .env.local.example .env.local
   ```

   On macOS or Linux:

   ```bash
   cp .env.local.example .env.local
   ```

2. The site runs **without** any variables set. Add keys only when you wire real email, webhooks, or analytics (see `README.md`).

## Development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The App Router hot-reloads on save.

## Production build

```bash
npm run build
```

This runs an optimized production compile and static generation for product detail routes.

## Production start (local smoke test)

After a successful build:

```bash
npm start
```

Serve on port 3000 by default. For hosting, follow your platform’s Node/Next deployment guide (e.g. Vercel, Docker, or a Node process manager).

## Linting

```bash
npm run lint
```

## Troubleshooting

| Issue | What to try |
| --- | --- |
| `EACCES` or permission errors on install | Avoid global installs as admin; fix npm cache permissions or use a node version manager. |
| Port 3000 already in use | Run `npx next dev -p 3001` or stop the other process. |
| Type errors after dependency upgrades | Run `npm run build` and align `@types/react` / `next` versions per Next.js release notes. |
| Map iframe blank on Company Info | Replace `mapsEmbedUrl` in `data/company.ts` with a valid embed from Google Maps for your listing. |
| Module not found `@/...` | Ensure `tsconfig.json` has `"paths": { "@/*": ["./*"] }` and you run commands from the repo root. |

## Clean reinstall

If dependencies appear corrupted:

```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

On macOS/Linux, replace with `rm -rf node_modules package-lock.json && npm install`.
