# OneBonsai Gulf

The interactive website for OneBonsai Gulf, an independent AI consultancy based in Abu Dhabi.

The experience pairs a light editorial system with a scroll-controlled, high-resolution brand film and a code-rendered 3D intelligence flow. All narrative text remains live HTML for sharp rendering and accessibility.

## Highlights

- Retina-sharp 2560×1440 cinematic film scrubbed directly by scroll position
- Four-stage 3D infographic flow: Connect, Understand, Activate, and Scale
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

## Verify

```bash
npm test
```

This builds the vinext application and validates the rendered brand experience and required visual assets.

## Structure

- `app/page.tsx` — content, sections, and scroll timeline
- `app/globals.css` — responsive layout, interaction, and 3D styling
- `public/media/onebonsai-brand-film-hq.mp4` — retina-sharp 2560×1440 web film derived from the 4K master
- `public/media/` — UAE editorial and capability imagery
- `.openai/hosting.json` — Sites deployment configuration
