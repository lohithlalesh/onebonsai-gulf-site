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
  assert.match(html, /Your business already works\. We make it/);
  assert.match(html, /AI, integrated into the business you already have\./);
  assert.match(html, /Infrastructure intelligence, at scale\./);
  assert.match(html, /\/media\/hero-frames\/frame-08\.jpg/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps the crisp frame sequence and UAE imagery in source", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /length: 8/);
  assert.match(page, /className="film-frame"/);
  assert.match(page, /uae-ai-boardroom-v1\.jpg/);
  assert.match(page, /uae-port-ai-v1\.jpg/);
  assert.match(page, /uae-ai-workshop-v1\.jpg/);
  assert.match(page, /infrastructure-intelligence-v2\.jpg/);
  assert.doesNotMatch(page, /cultivated-intelligence-scroll\.mp4/);
  assert.match(css, /\.hero-glass-plane/);
  assert.match(css, /\.hero-orbit/);
  assert.match(css, /\.human-proof-grid/);

  for (let index = 1; index <= 8; index += 1) {
    const frame = String(index).padStart(2, "0");
    await access(new URL(`../public/media/hero-frames/frame-${frame}.jpg`, import.meta.url));
  }
});
