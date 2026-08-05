# LOCARLA Daily Summary Tool — OpenAI GPT-5.6

This version replaces the direct Anthropic browser request with a secure
server-side OpenAI Responses API call.

## Files to copy into the repository

- Replace the existing root `index.html` with this `index.html`.
- Add `api/generate-summary.js`.
- Add `package.json`.
- Add `vercel.json`.
- Add `.gitignore`.
- Keep `.env.example` only as a reference. Never commit a real API key.

## Vercel deployment

1. Push these files to the Git repository connected to Vercel.
2. In Vercel, open **Project Settings → Environment Variables**.
3. Add:

   `OPENAI_API_KEY` = your real OpenAI project API key

4. Optional model override:

   `OPENAI_MODEL` = `gpt-5.6`

5. Redeploy the project.

The existing public URL should continue to work after the redeployment.

## Model choices

- `gpt-5.6` — latest flagship alias; routes to GPT-5.6 Sol.
- `gpt-5.6-terra` — lower-cost balance of intelligence and quality.
- `gpt-5.6-luna` — cost-sensitive, high-volume option.

Change only the `OPENAI_MODEL` environment variable; no code edit is needed.

## Important

Do not place `OPENAI_API_KEY` in `index.html`, JavaScript sent to browsers,
GitHub source, or localStorage. The frontend calls `/api/generate-summary`,
and the serverless function adds the secret key privately.
