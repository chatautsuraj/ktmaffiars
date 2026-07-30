# KTM Affairs

**Where Nepal Meets the World.**

## Deploy on Vercel (current target)

With **Vercel Blob** configured, the admin CMS is live on production: create/update/delete and media uploads persist without redeploying. Public pages read the same Blob-backed collections and refresh via `revalidatePath` after writes.

Without `BLOB_READ_WRITE_TOKEN`, the site still deploys, but admin writes stay **read-only** on Vercel (bundled `content/*.json` only).

Locally (`npm run dev`), when the Blob token is absent, the CMS uses the filesystem: `content/*.json` and `public/uploads/`.

### One-time setup

1. Push this repo to GitHub (or deploy with Vercel CLI).
2. Import the project in [vercel.com](https://vercel.com) → Framework: Next.js.
3. Create a **Blob** store for the project (Dashboard → Storage → Create → Blob, or CLI if available).
4. Set **Environment Variables** (Production; Preview recommended too):

| Name | Required | Notes |
|------|----------|--------|
| `BLOB_READ_WRITE_TOKEN` | yes (for live CMS) | From the Blob store |
| `ADMIN_EMAIL` | yes | Your admin login |
| `ADMIN_PASSWORD` | yes | Strong password |
| `AUTH_SECRET` | yes | `openssl rand -base64 48` |
| `AUTOPILOT_HALTED` | no | defaults to halted in code |

5. Deploy. On first writable request (or seed script), missing collections are uploaded to Blob from committed `content/*.json`.

### CLI deploy

```bash
npx vercel login
npx vercel          # preview
npx vercel --prod   # production
```

### Updating content on Vercel

1. Sign in at `/admin/login`
2. Edit collections or upload media — changes go to Vercel Blob
3. Public pages update after cache revalidation (no redeploy)

Local filesystem editing still works for development without a Blob token.

---

## Local development

```bash
npm install
cp .env.example .env.local   # optional in development
npm run dev
```

Admin: http://localhost:3000/admin/login  
Dev defaults (local only): `editor@ktmaffairs.com` / `ktm-admin-2026`

## Tech stack

Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, Vercel Blob (production CMS).
