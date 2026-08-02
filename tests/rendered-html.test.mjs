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
  assert.match(html, /<title>OneBonsai Gulf — AI Strategy &amp; DeepTech<\/title>/i);
  assert.match(html, /YOUR BUSINESS/);
  assert.match(html, /WE MAKE IT INTELLIGENT/);
  assert.match(html, /AI SHOULD SIMPLIFY THE BUSINESS YOU ALREADY HAVE/);
  assert.match(html, /INFRASTRUCTURE INTELLIGENCE, AT SCALE\./);
  assert.match(html, /\/media\/onebonsai-brand-film-hq\.mp4/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps one scroll-controlled HQ film and the UAE imagery in source", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="intelligence-flow"/);
  assert.match(page, /--flow-progress/);
  assert.match(page, /film\.currentTime = targetTime/);
  assert.match(page, /SCROLL TO CULTIVATE/);
  assert.match(page, /onebonsai-brand-film-hq\.mp4/);
  assert.match(page, /onebonsai-brand-film-poster\.jpg/);
  assert.match(page, /uae-ai-boardroom-v1\.jpg/);
  assert.match(page, /uae-port-ai-v1\.jpg/);
  assert.match(page, /uae-ai-workshop-v1\.jpg/);
  assert.match(page, /infrastructure-intelligence-v2\.jpg/);
  assert.doesNotMatch(page, /heroFrames|cultivated-intelligence-scroll\.mp4/);
  assert.match(css, /\.hero-veil/);
  assert.match(css, /\.flow-sticky/);
  assert.match(css, /\.flow-core/);
  assert.match(css, /\.flow-spine/);
  assert.match(css, /\.sculpture/);
  assert.match(css, /\.pathway-grid/);

  await access(new URL("../public/media/onebonsai-brand-film-hq.mp4", import.meta.url));
  await access(new URL("../public/media/onebonsai-brand-film-poster.jpg", import.meta.url));
});
