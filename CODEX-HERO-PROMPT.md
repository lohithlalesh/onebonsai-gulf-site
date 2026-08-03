# OneBonsai Gulf: scroll studio implementation brief

This file records the production contract for the current hero.

## Direction

- Treat the website itself as the stage: a warm off-white 16:9 card with sculpted corners, not a full-bleed film.
- Keep every headline, paragraph, button, flow label, and card in live HTML. The film contains no text.
- Use one premium 3D object as the brand reveal: a matte-black architectural bonsai that evolves into a compact neural bloom.
- The camera is locked. Only the sculpture, conduits, petals, and sensor orbs move.
- After the light hero acts, a dark infographic panel travels upward and reveals the intelligence flow and three capability cards.

## Assets

| Path | Purpose |
|---|---|
| `/media/onebonsai-hero-motion-4k.mp4` | 3840×2160 H.264, 8.04s, silent, GOP 6, fast-start scroll film |
| `/media/onebonsai-hero-poster-v2.jpg` | 5504×3072 first frame and mobile fallback |
| `/media/icon-systems.png` | Custom 2K 3D connection icon |
| `/media/icon-intelligence.png` | Custom 2K 3D governance icon |
| `/media/icon-scale.png` | Custom 2K 3D scale icon |

Full-quality generated masters live in `outputs/higgsfield/v2/`.

## Scroll behavior

- Five acts across 500vh.
- The stage is sticky below the 76px navigation.
- The 16:9 stage width is constrained by viewport height, so the film is never enlarged merely to cover the screen.
- A requestAnimationFrame loop maps section progress to video time, lerps by `0.16`, and seeks only when the delta exceeds `1/60s`.
- An IntersectionObserver stops the loop while the hero is offscreen.
- Below 700px, no video element is mounted; the poster and all acts form a normal document flow.

## Motion language

- Headlines reveal word-by-word with a short overshoot spring.
- The signal object responds subtly to pointer position without transforming the film itself.
- Flow nodes cascade downward and pulse in order.
- Capability cards rise with staggered spring timing; the scale card turns chartreuse in the final act.
- Do not use blur as a transition effect.

## Quality rules

- Never replace the film with a 720p export.
- Preserve H.264 compatibility, `faststart`, and the short GOP if re-encoding.
- Do not add camera pushes, zooms, artificial depth-of-field, bloom haze, motion blur, text, or UI to the generated film.
- Keep the 3D asset fully visible and the left 44% compositionally quiet for live copy.

## Verification

```bash
npx eslint app/
npm test
```

Desktop QA must confirm all five scroll acts, 3840×2160 decoded video dimensions, and the dark infographic state. Mobile QA must confirm a zero video count and a readable static card stack.
