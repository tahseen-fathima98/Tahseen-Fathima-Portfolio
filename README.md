# Tahseen Fathima Portfolio V2

Standard Next.js App Router + TypeScript project. It does not use Vite, Vinext, Wrangler, or Cloudflare-specific development commands.

## Run locally on Windows, macOS, or Linux

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production verification

```bash
npm run typecheck
npm run build
npm start
```

## Contact form

Copy `.env.example` to `.env.local`, then add your SMTP values. Never commit `.env.local`.

## Vercel

Import the repository into Vercel. The framework preset should be detected as Next.js. Add the variables from `.env.example` under Project Settings → Environment Variables, then deploy.
