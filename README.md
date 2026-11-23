# SoftPip Marketing Site (`softpip-site`)

Next.js 15 App Router web application for [softpip.com](https://softpip.com): the ₦32.45M trading autopsy, ten-module curriculum, Monte Carlo risk-of-ruin calculator, scaling ladder, and documentation for **The Enforcer** open-source Python risk governor ([github.com/harrisonojek/softpip-enforcer](https://github.com/harrisonojek/softpip-enforcer)).

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Production Build & Vercel Deployment

This repository deploys to Vercel as `softpip-site` (custom domain `softpip.com`):

```bash
npm run typecheck
npm run build
vercel --prod
```

Configure environment variables in the Vercel dashboard (`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `NEXT_PUBLIC_AFF_*` placement codes).
