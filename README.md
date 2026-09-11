# OneBonsai Gulf

The interactive website for OneBonsai Gulf, an independent AI consultancy based in Abu Dhabi.

The experience pairs a light editorial system with a five-act scroll studio. A native 4K brand sculpture evolves inside a contained 16:9 stage while the narrative, infographic, and capability cards remain sharp live HTML.

## Highlights

- Five-act, 500vh journey: Introduce, Connect, Cultivate, Flow, and Scale
- Locked-camera 3840×2160 H.264 film with a short GOP for responsive scroll seeking
- Contained 16:9 stage that never magnifies the source to fill the viewport
- Bouncy word choreography, interactive signal object, downward intelligence flow, and live capability cards
- Custom 2K 3D icon system for connection, governance, and scale
- Poster-backed mobile card stack with no mounted video below 700px
- Light editorial grid with sculptural CSS elements and vertical edge branding
- UAE-focused enterprise AI integration story
- Natural editorial imagery of OneBonsai Gulf consultants working with local teams
- Responsive desktop and mobile layouts
- Accessible live copy with no text baked into hero imagery

## Run locally

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Inquiry and careers intake

The CEO conversation posts to `/api/enquire`. Careers use the dedicated
`/api/careers/*` flow: a progressive introduction, managed Turnstile check,
three server-scored questions selected from a bilingual 100-question bank, one
fresh retry, and a private PDF résumé upload. D1 stores the application,
answers, and—in the zero-billing deployment—private résumé chunks.
Download links expire after 14 days and a daily Worker cron removes application
data after 90 days. The routes are already R2-aware and will use a private R2
bucket automatically when a `RESUMES` binding is added.

Set `ENQUIRY_WEBHOOK_URL` in `.env.local` to the deployed Google Apps Script
`/exec` URL. The Worker stores this as a secret and calls it only after a résumé
has been stored successfully. The existing script in
`integrations/google-apps-script/Code.gs` appends the validated intake to the
`OneBonsai Gulf Enquiries` sheet and emails `ivan@obgulf.com`; it does not
change Google Workspace, Zoho, MX, or mail-routing configuration. Age and
university are never submitted.

## Verify

```bash
npm test
```

This builds the vinext application and validates the rendered brand experience and required visual assets.

## Cloudflare deployment

The current production Worker preview is:

https://onebonsai-gulf.laleshlohith.workers.dev/

`wrangler.jsonc` binds the `onebonsai-gulf-careers` D1 database, static assets,
Cloudflare image transforms, and the 03:00 UTC retention cron. Deploy with:

```bash
npx wrangler d1 migrations apply onebonsai-gulf-careers --remote
npx vinext deploy
```

The custom `obgulf.com` hostname is intentionally not declared in this project
until the zone and its existing mail-related DNS records have been inventoried.
The Workers preview therefore does not disturb the current live site or email.

## Legacy GitHub Pages preview

Every push to `main` runs the Pages workflow in `.github/workflows/deploy-pages.yml`. The workflow creates a static export with the repository base path, uploads the generated site, and publishes it at:

https://lohithlalesh.github.io/onebonsai-gulf-site/

## Structure

- `app/page.tsx`: page content and sections
- `app/ScrollJourney.tsx`: cinematic hero, scroll interpolation, and mobile fallback
- `app/globals.css`: responsive layout, interaction, and 3D styling
- `public/media/onebonsai-hero-motion-web-v2.mp4`: 3200×1800 seek-optimized H.264 scroll film
- `public/media/onebonsai-hero-poster-web-v3.jpg`: 2400×1350 first-paint and mobile poster
- `public/media/icon-*.png`: custom 2K 3D capability icons
- `outputs/higgsfield/v2/`: full-quality generated masters and source frames
- `public/media/`: UAE editorial and capability imagery
- `wrangler.jsonc`: direct Cloudflare Worker, D1, assets, and cron configuration
- `app/api/careers/`: application, assessment, private upload, and download routes
- `worker/career-retention.ts`: 90-day D1/R2 retention cleanup
- `.openai/hosting.json`: legacy Sites project metadata; not used for Cloudflare deployment
