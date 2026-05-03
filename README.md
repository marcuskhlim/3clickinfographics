# InfoForge

Open-source 4-step infographic generator. Pick a topic, a style, a modifier, and an aspect ratio — get a finished infographic PNG via OpenAI gpt-image.

Inspired by Expert Media AI's "Infographics Wizard" (4 credits / image, ~$0.07 in API cost). This clone runs locally for the cost of one OpenAI image call (~$0.04–0.19 depending on size and model).

## Features

- 4-step wizard: Topic → Style → Modifier → Aspect → Generate
- 45 preset styles across 15 families (statistical, timeline, process, comparison, list, geographic, hierarchical, flowchart, anatomical, resume, animated, photographic, icon, typographic, versus)
- 8 modifier presets (Dark Mode, Vintage, Corporate, Playful, Luxe, Eco, Tech, Accessible)
- 7 aspect ratios mapped to OpenAI's 3 supported sizes (1024², 1024×1536, 1536×1024)
- Server-side prompt assembly: `${topic}. ${style}, ${modifier}.`
- Download as PNG; view the exact prompt that was sent

## Quick start

```bash
npm install
npm run dev
# Open http://localhost:3000, click "Add OpenAI key", paste yours
```

No `.env` required for local use — the wizard accepts your API key via the UI (stored in `localStorage`, sent only to OpenAI). For self-hosted/server-side fallback, set `OPENAI_API_KEY` in `.env.local`.

## Hosting it as a free public tool

Three deployment shapes — pick one:

### 1. Pure BYOK (you pay $0)
Deploy with **no env vars**. Visitors paste their own OpenAI key on first use; it's stored in their browser's localStorage and sent only to OpenAI.
```bash
npx vercel
```

### 2. Shared trial → BYOK (you pay for the freebies)
Set `OPENAI_API_KEY` and `INFOFORGE_FREE_GENERATIONS=2` (the default). Each unique IP gets 2 free generations on your key, then is prompted to paste their own.

For production traffic, also add Vercel KV / Upstash Redis env vars so the per-IP counter survives cold starts and works across regions:
```
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```
Without those, the counter is in-memory — fine for hobby projects, but a determined abuser can wait for a cold start to reset their count.

### 3. Self-hosted single user
`OPENAI_API_KEY=...` in `.env.local`, `npm run dev`. Always uses your key, no rate limit.

## Why no accounts / Supabase?

The original Expert Media AI uses Supabase for auth + a credits ledger + auto-saving wizard drafts + a public bucket for generated PNGs. None of that is necessary if your goal is "post a free AI tool on Twitter/HN" — visitors don't want to create an account just to generate one infographic.

If you later want accounts (for image history, custom presets, paid plans), bolt on Supabase Auth + a `projects` table + a Storage bucket. The wizard is already structured to send everything to one `/api/generate` endpoint, so swapping the backend is mechanical.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- `openai` SDK → `images.generate` (`gpt-image-1` by default; set `INFOFORGE_IMAGE_MODEL=gpt-image-2` if your account has access)

## How the prompt is assembled

```
{topic}. [Data: {research}.] {stylePrompt}, {modifierPrompt}.
```

The aspect ratio maps to OpenAI's `size` parameter — it's not part of the text prompt. See `lib/presets.ts:buildPrompt`.

## What was skipped vs. the original

| Original feature | InfoForge MVP | Why |
|---|---|---|
| Multi-tenant accounts, credits, billing | — | Single-user local app |
| Auto-save / draft persistence | — | Refresh = start over |
| Style preview thumbnails | Text-only descriptions | Adds storage + cost; trivial to add |
| "Apply Edit" inpainting | — | Use OpenAI `images.edit` directly if needed |
| RAG / Personas / Memory | — | Out of scope |
| Image history / regenerate-with-feedback | "Start over" | Easy to add a session history later |

Add hooks for these later by wiring `localStorage` for drafts, Supabase Auth for accounts, and a separate `/api/edit` route for inpainting.

## License

MIT
