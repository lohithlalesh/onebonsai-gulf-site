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

## Verify

```bash
npm test
```

This builds the vinext application and validates the rendered brand experience and required visual assets.

## Structure

- `app/page.tsx`: page content and sections
- `app/ScrollJourney.tsx`: cinematic hero, scroll interpolation, and mobile fallback
- `app/globals.css`: responsive layout, interaction, and 3D styling
- `public/media/onebonsai-hero-motion-4k.mp4`: 3840×2160 seek-optimized H.264 scroll film
- `public/media/onebonsai-hero-poster-v2.jpg`: 5504×3072 first-paint and mobile poster
- `public/media/icon-*.png`: custom 2K 3D capability icons
- `outputs/higgsfield/v2/`: full-quality generated masters and source frames
- `public/media/`: UAE editorial and capability imagery
- `.openai/hosting.json`: Sites deployment configuration
