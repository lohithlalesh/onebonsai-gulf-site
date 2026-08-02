# OneBonsai Gulf

The interactive website for OneBonsai Gulf, an independent AI consultancy based in Abu Dhabi.

The experience is built around a scroll-controlled, source-resolution 3D frame sequence that shows an existing business architecture becoming mapped, connected, AI-integrated, activated, and ready to scale. All narrative text remains live HTML for sharp rendering and accessibility.

## Highlights

- Eight-frame 5504×3072 cinematic hero sequence
- Scroll-controlled crossfades with CSS 3D glass, orbital, and core elements
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
- `public/media/hero-frames/` — high-resolution hero sequence
- `public/media/` — UAE editorial and capability imagery
- `.openai/hosting.json` — Sites deployment configuration
