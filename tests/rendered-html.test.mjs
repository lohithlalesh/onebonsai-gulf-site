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
  assert.match(html, /<title>OneBonsai Gulf \| AI Strategy &amp; DeepTech<\/title>/i);
  assert.match(html, /AI, BUILT INTO THE BUSINESS/);
  assert.match(html, /If AI is not embedded in your organization yet/);
  assert.match(html, /01 \/ CONNECT/);
  assert.match(html, /03 \/ INTELLIGENCE FLOW/);
  assert.match(html, /04 \/ SCALE/);
  assert.match(html, /AI SHOULD SIMPLIFY THE BUSINESS YOU ALREADY HAVE/);
  assert.match(html, /Trusted by organizations building what comes next/);
  assert.match(html, /INFRASTRUCTURE INTELLIGENCE, AT SCALE\./);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps one high-resolution Safari-safe scroll film, UAE imagery, and customer identities in source", async () => {
  const [page, journey, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ScrollJourney.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<ScrollJourney \/>/);
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
  assert.match(page, /customer-marquee/);
  assert.doesNotMatch(page, /uae-ai-boardroom-v1\.jpg/);
  assert.match(page, /uae-port-ai-v1\.jpg/);
  assert.match(page, /uae-ai-workshop-v1\.jpg/);
  assert.match(page, /infrastructure-intelligence-v2\.jpg/);
  assert.match(css, /\.journey-film/);
  assert.match(css, /\.journey-shell/);
  assert.match(css, /\.journey-flow-node/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.doesNotMatch(css, /\.journey-canvas|\.intelligence-flow|\.flow-sticky/);
  assert.match(css, /\.sculpture/);
  assert.match(css, /\.pathway-grid/);
  assert.match(css, /@keyframes customer-marquee/);

  await access(new URL("../public/media/onebonsai-hero-motion-4k.mp4", import.meta.url));
  await access(new URL("../public/media/onebonsai-hero-poster-v2.jpg", import.meta.url));
  await access(new URL("../public/media/icon-systems.png", import.meta.url));
  await access(new URL("../public/media/icon-intelligence.png", import.meta.url));
  await access(new URL("../public/media/icon-scale.png", import.meta.url));
  await access(new URL("../public/customers/ajman.webp", import.meta.url));
  await access(new URL("../public/customers/itc-pros.png", import.meta.url));
  await access(new URL("../public/customers/masdar-city.svg", import.meta.url));
  await access(new URL("../public/customers/next.png", import.meta.url));
  await access(new URL("../public/customers/onebonsai.png", import.meta.url));
  await access(new URL("../public/customers/northstone.png", import.meta.url));
  await access(new URL("../public/customers/stare.png", import.meta.url));
});
