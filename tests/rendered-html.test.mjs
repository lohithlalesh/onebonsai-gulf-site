import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the OneBonsai Gulf experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>OneBonsai Gulf \| AI Consulting &amp; Integration UAE<\/title>/i);
  assert.match(html, /Enterprise AI integration/);
  assert.match(html, /We help UAE companies connect AI/);
  assert.match(html, /AI system integration/);
  assert.match(html, /Intelligent automation/);
  assert.match(html, /AI governance and scale/);
  assert.match(html, /Connect your existing systems/);
  assert.match(html, /Build useful AI solutions/);
  assert.match(html, /Scale AI with control/);
  assert.match(html, /AI should improve how your business works/);
  assert.match(html, /Trusted by organizations across the UAE and beyond/);
  assert.match(html, /AI-powered infrastructure inspection at scale\./);
  assert.match(html, /Pause logos/);
  assert.match(html, /Skip to content/);
  assert.doesNotMatch(html, /SCROLL TO CULTIVATE|GO ↗|section-marker/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps high-resolution scroll media, UAE imagery, and customer identities in source", async () => {
  const [page, journey, marquee, editorialLoop, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ScrollJourney.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CustomerMarquee.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/EditorialLoop.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<ScrollJourney \/>/);
  assert.match(page, /<CustomerMarquee \/>/);
  assert.doesNotMatch(page, /^"use client";/);
  assert.match(journey, /onebonsai-hero-motion-4k\.mp4/);
  assert.match(journey, /onebonsai-hero-poster-v2\.jpg/);
  assert.match(journey, /icon-systems\.png/);
  assert.match(journey, /icon-intelligence\.png/);
  assert.match(journey, /icon-scale\.png/);
  assert.match(journey, /disableRemotePlayback/);
  assert.match(journey, /renderedTime \+= \(targetTime - renderedTime\) \* 0\.16/);
  assert.match(journey, /Math\.abs\(renderedTime - video\.currentTime\) > 1 \/ 60/);
  assert.match(journey, /new IntersectionObserver/);
  assert.match(journey, /video\.play\(\)\.then\(\(\) => video\.pause\(\)\)/);
  assert.doesNotMatch(journey, /<canvas|\/frames\/|FRAME_COUNT/);
  assert.match(marquee, /customer-marquee/);
  assert.match(marquee, /aria-pressed/);
  assert.match(page, /editorial-connect-v1\.mp4/);
  assert.match(page, /editorial-intelligence-v1\.mp4/);
  assert.match(page, /editorial-scale-v1\.mp4/);
  assert.match(page, /editorial-people-team-v1\.mp4/);
  assert.match(page, /editorial-people-adoption-v1\.mp4/);
  assert.match(editorialLoop, /new IntersectionObserver/);
  assert.match(editorialLoop, /preload="none"/);
  assert.match(editorialLoop, /video\.pause\(\)/);
  assert.match(layout, /favicon-v2\.png/);
  assert.match(page, /infrastructure-intelligence-v2\.jpg/);
  assert.match(css, /\.journey-film/);
  assert.match(css, /\.journey-shell/);
  assert.match(css, /\.journey-flow-node/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.doesNotMatch(css, /\.journey-canvas|\.intelligence-flow|\.flow-sticky/);
  assert.match(css, /\.pathway-grid/);
  assert.match(css, /\.outcome-ledger/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /100dvh/);
  assert.match(css, /@keyframes customer-marquee/);
  assert.doesNotMatch(css, /transition:\s*all/);

  await access(new URL("../public/media/onebonsai-hero-motion-4k.mp4", import.meta.url));
  await access(new URL("../public/media/onebonsai-hero-poster-v2.jpg", import.meta.url));
  await access(new URL("../public/media/icon-systems.png", import.meta.url));
  await access(new URL("../public/media/icon-intelligence.png", import.meta.url));
  await access(new URL("../public/media/icon-scale.png", import.meta.url));
  await access(new URL("../public/media/editorial-connect-v1.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-intelligence-v1.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-scale-v1.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-people-team-v1.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-people-adoption-v1.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-connect-poster-v1.jpg", import.meta.url));
  await access(new URL("../public/media/editorial-intelligence-poster-v1.jpg", import.meta.url));
  await access(new URL("../public/media/editorial-scale-poster-v1.jpg", import.meta.url));
  await access(new URL("../public/media/editorial-people-team-poster-v1.jpg", import.meta.url));
  await access(new URL("../public/media/editorial-people-adoption-poster-v1.jpg", import.meta.url));
  await access(new URL("../public/favicon-v2.png", import.meta.url));
  await access(new URL("../public/customers/ajman.webp", import.meta.url));
  await access(new URL("../public/customers/itc-pros.png", import.meta.url));
  await access(new URL("../public/customers/masdar-city.svg", import.meta.url));
  await access(new URL("../public/customers/next.png", import.meta.url));
  await access(new URL("../public/customers/onebonsai.png", import.meta.url));
  await access(new URL("../public/customers/northstone.png", import.meta.url));
  await access(new URL("../public/customers/stare.png", import.meta.url));
});
