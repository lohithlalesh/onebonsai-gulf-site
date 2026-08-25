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
  assert.match(html, /Connected systems, measurable growth/);
  assert.match(html, /AI \+ software layer/);
  assert.match(html, /SEO \+ AEO/);
  assert.match(html, /Marketing growth/);
  assert.match(html, /Global deep tech\. Built for the Gulf\./);
  assert.match(html, /One team from strategy to deployment\./);
  assert.match(html, /Delivered work across/);
  assert.match(html, /Virtual nurse training for University Hospital Bonn/);
  assert.match(html, /1,600 staff and students/);
  assert.match(html, /Browse all case studies/);
  assert.match(html, /Production AI/);
  assert.match(html, /immersive (?:VR )?training/i);
  assert.match(html, /AI Marketing &amp; Growth/);
  assert.match(html, /Cybersecurity &amp; Secure AI/);
  assert.match(html, /Trusted by organizations building what comes next/);
  assert.match(html, /UAE \/ GLOBAL/);
  assert.match(html, /Meet the team behind the work/);
  assert.match(html, /Ivan M Grey/);
  assert.match(html, /Hamad Al Khamais/);
  assert.match(html, /Rabeb Ben Hamouda/);
  assert.match(html, /Khawla Zon/);
  assert.match(html, /Slim Garbouj/);
  assert.match(html, /AI-powered infrastructure inspection at scale\./);
  assert.match(html, /Pause customer logos/);
  assert.match(html, /Skip to content/);
  assert.doesNotMatch(html, /SCROLL TO CULTIVATE|GO ↗|section-marker/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps high-resolution scroll media, UAE imagery, and customer identities in source", async () => {
  const [page, about, journey, marquee, editorialLoop, capabilityMotion, integrationMap, growthTreeMotion, team, layout, css, mediaSources] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/AboutSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ScrollJourney.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CustomerMarquee.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/EditorialLoop.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CapabilityMotion.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/IntegrationMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/GrowthTreeMotion.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/TeamSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../MEDIA_SOURCES.md", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<ScrollJourney \/>/);
  assert.match(page, /<AboutSection \/>/);
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
  assert.match(page, /editorial-connect-systems-higgs-v2\.mp4/);
  assert.match(page, /<CapabilityMotion kind=\{pathway\.media\.kind\}/);
  assert.match(capabilityMotion, /capability-motion-activate/);
  assert.match(capabilityMotion, /capability-motion-scale/);
  assert.match(page, /editorial-people-logistics-higgs-v2\.mp4/);
  assert.match(page, /editorial-people-healthcare-higgs-v2\.mp4/);
  assert.match(integrationMap, /AI integration/);
  assert.match(integrationMap, /Custom software/);
  assert.match(integrationMap, /Consulting/);
  assert.match(integrationMap, /SEO \+ AEO/);
  assert.match(integrationMap, /Marketing growth/);
  assert.match(integrationMap, /<GrowthTreeMotion \/>/);
  assert.match(growthTreeMotion, /growth-tree-trunk/);
  assert.match(growthTreeMotion, /growth-leaf-nine/);
  assert.match(integrationMap, /Feed the roots/);
  assert.match(editorialLoop, /new IntersectionObserver/);
  assert.match(editorialLoop, /SMALL_SCREEN_QUERY/);
  assert.match(editorialLoop, /preload="none"/);
  assert.match(editorialLoop, /video\.pause\(\)/);
  assert.match(layout, /favicon-v2\.png/);
  assert.match(team, /Meet the team behind the work/);
  assert.match(team, /Hamad Al Khamais/);
  assert.match(team, /useState/);
  assert.match(team, /Pause team marquee/);
  assert.match(team, /team-group/);
  assert.doesNotMatch(team, /ResizeObserver|window\.addEventListener\("scroll"/);
  assert.match(about, /OneBonsai Gulf is the Abu Dhabi based regional sister company/);
  assert.match(about, /aria-live="polite"/);
  assert.match(about, /role="tablist"/);
  assert.match(about, /UKB nurse training/);
  assert.match(about, /Nike warehouse training/);
  assert.match(about, /Port mooring safety/);
  assert.match(about, /Police VR training/);
  assert.match(about, /Delivered work across/);
  assert.match(about, /AI\s+marketing/);
  assert.match(about, /cybersecurity/i);
  assert.match(page, /infrastructure-intelligence-v2\.jpg/);
  assert.match(css, /\.journey-film/);
  assert.match(css, /\.journey-shell/);
  assert.match(css, /\.journey-flow-node/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.doesNotMatch(css, /\.journey-canvas|\.intelligence-flow|\.flow-sticky/);
  assert.match(css, /\.pathway-grid/);
  assert.match(css, /\.integration-map/);
  assert.match(css, /@keyframes growth-leaf-float/);
  assert.match(css, /@keyframes activate-orbit-one/);
  assert.match(css, /@keyframes scale-column/);
  assert.match(css, /\.integration-root-nodes/);
  assert.match(css, /scroll-snap-type: inline mandatory/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /100dvh/);
  assert.match(css, /@keyframes customer-marquee/);
  assert.match(css, /\.team-track/);
  assert.match(css, /\.team-card:hover img/);
  assert.match(css, /@keyframes team-marquee/);
  assert.match(css, /@keyframes about-case-image-in/);
  assert.match(css, /\.about-case-index/);
  assert.match(css, /animation-play-state: paused/);
  assert.match(css, /filter: grayscale\(1\)/);
  assert.doesNotMatch(css, /transition:\s*all/);
  assert.match(mediaSources, /Seedance 2\.0/);
  assert.match(mediaSources, /Grok Video/);
  assert.match(mediaSources, /exactly 24 fps/);
  assert.doesNotMatch(mediaSources, /Pexels/i);

  await access(new URL("../public/media/onebonsai-hero-motion-4k.mp4", import.meta.url));
  await access(new URL("../public/media/onebonsai-hero-poster-v2.jpg", import.meta.url));
  await access(new URL("../public/media/icon-systems.png", import.meta.url));
  await access(new URL("../public/media/icon-intelligence.png", import.meta.url));
  await access(new URL("../public/media/icon-scale.png", import.meta.url));
  await access(new URL("../public/media/editorial-connect-systems-higgs-v2.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-people-logistics-higgs-v2.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-people-healthcare-higgs-v2.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-connect-systems-higgs-v2-poster.jpg", import.meta.url));
  await access(new URL("../public/media/editorial-people-logistics-higgs-v2-poster.jpg", import.meta.url));
  await access(new URL("../public/media/editorial-people-healthcare-higgs-v2-poster.jpg", import.meta.url));
  await access(new URL("../public/media/uae-ai-boardroom-v1.jpg", import.meta.url));
  await access(new URL("../public/media/uae-port-ai-v1.jpg", import.meta.url));
  await access(new URL("../public/team/ivan-m-grey.jpg", import.meta.url));
  await access(new URL("../public/team/hamad-al-khamais.jpg", import.meta.url));
  await access(new URL("../public/team/jelena-skoric.jpg", import.meta.url));
  await access(new URL("../public/team/lohith-lalesh.jpg", import.meta.url));
  await access(new URL("../public/team/olfa-hachfi.jpg", import.meta.url));
  await access(new URL("../public/team/aditya-varshney.jpg", import.meta.url));
  await access(new URL("../public/team/pankaj-birla.jpg", import.meta.url));
  await access(new URL("../public/team/omar-abedlaziz.jpg", import.meta.url));
  await access(new URL("../public/team/mohamed-ilyes-bouzayen.jpg", import.meta.url));
  await access(new URL("../public/team/rabeb-ben-hamouda.jpg", import.meta.url));
  await access(new URL("../public/team/khawla-zon.jpg", import.meta.url));
  await access(new URL("../public/team/slim-garbouj.jpg", import.meta.url));
  await access(new URL("../public/cases/ukb-vr-training.jpg", import.meta.url));
  await access(new URL("../public/cases/nike-warehouse-training.jpg", import.meta.url));
  await access(new URL("../public/cases/port-mooring-training.jpg", import.meta.url));
  await access(new URL("../public/cases/police-vr-training.jpg", import.meta.url));
  await access(new URL("../public/favicon-v2.png", import.meta.url));
  await access(new URL("../public/customers/ajman.webp", import.meta.url));
  await access(new URL("../public/customers/itc-pros.png", import.meta.url));
  await access(new URL("../public/customers/masdar-city.svg", import.meta.url));
  await access(new URL("../public/customers/next.png", import.meta.url));
  await access(new URL("../public/customers/onebonsai.png", import.meta.url));
  await access(new URL("../public/customers/northstone.png", import.meta.url));
  await access(new URL("../public/customers/stare.png", import.meta.url));
});
