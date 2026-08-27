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
  assert.match(html, /<title>AI Consulting &amp; Integration in Abu Dhabi, UAE \| OneBonsai Gulf<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/obgulf\.com/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /ProfessionalService/);
  assert.match(html, /Enterprise AI integration/);
  assert.match(html, /We connect AI to your systems/);
  assert.match(html, /Start with the workflow/);
  assert.match(html, /Build around what exists/);
  assert.match(html, /Hand over real capability/);
  assert.match(html, /From complexity to clarity in 3 steps\./);
  assert.match(html, /Find the workflow worth fixing\./);
  assert.match(html, /Add the capability your business needs next/);
  assert.match(html, /Shared context without a system replacement/);
  assert.match(html, /SEO \+ AEO/);
  assert.match(html, /Marketing systems/);
  assert.match(html, /Regional sister company of/);
  assert.match(html, /Engineering, delivered in the Gulf\./);
  assert.match(html, /Built in Belgium\. Delivered from Abu Dhabi\./);
  assert.match(html, /Delivered work across/);
  assert.match(html, /Virtual nurse training for University Hospital Bonn/);
  assert.match(html, /1,600 staff and students/);
  assert.match(html, /Browse all case studies/);
  assert.match(html, /immersive (?:VR )?training/i);
  assert.match(html, /Cybersecurity &amp; Secure AI/);
  assert.match(html, /Trusted by organizations building what comes next/);
  assert.match(html, /UAE \/ GLOBAL/);
  assert.match(html, /The people doing the work/);
  assert.match(html, /Ivan M Grey/);
  assert.match(html, /Hamad Al Khamais/);
  assert.match(html, /Rabeb Ben Hamouda/);
  assert.match(html, /Khawla Zon/);
  assert.match(html, /Slim Garbouj/);
  assert.match(html, /Inspect assets without closing them down\./);
  assert.match(html, /Pause customer logos/);
  assert.match(html, /Pause team/);
  assert.match(html, /Skip to content/);
  assert.doesNotMatch(html, /SCROLL TO CULTIVATE|GO ↗|section-marker/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps high-resolution scroll media, UAE imagery, and customer identities in source", async () => {
  const [page, about, clarity, journey, scrollReveal, marquee, editorialLoop, integrationMap, team, siteHeader, layout, css, mediaSources] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/AboutSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ClarityJourney.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ScrollJourney.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ScrollReveal.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CustomerMarquee.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/EditorialLoop.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/IntegrationMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/TeamSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../MEDIA_SOURCES.md", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<ScrollJourney \/>/);
  assert.match(page, /<ClarityJourney \/>/);
  assert.match(page, /<AboutSection \/>/);
  assert.match(page, /<CustomerMarquee \/>/);
  assert.match(page, /<SiteHeader \/>/);
  assert.match(page, /<ScrollReveal \/>/);
  assert.doesNotMatch(page, /^"use client";/);
  assert.match(journey, /onebonsai-hero-motion-web-v2\.mp4/);
  assert.match(journey, /onebonsai-hero-motion-mobile-v1\.mp4/);
  assert.match(journey, /onebonsai-hero-poster-web-v3\.jpg/);
  assert.doesNotMatch(journey, /capabilityCards|journey-capabilities/);
  assert.match(journey, /ownershipVisuals/);
  assert.match(journey, /icon-systems-1200\.avif/);
  assert.match(journey, /icon-intelligence-1200\.avif/);
  assert.match(journey, /icon-scale-1200\.avif/);
  assert.match(journey, /onebonsai-hero-poster-mobile-1200\.jpg/);
  assert.doesNotMatch(journey, /journey-signal-card|journey-signal-orb/);
  assert.match(journey, /disableRemotePlayback/);
  assert.match(journey, /renderedTime \+= \(targetTime - renderedTime\) \* 0\.16/);
  assert.match(journey, /Math\.abs\(renderedTime - video\.currentTime\) > 1 \/ 60/);
  assert.match(journey, /new IntersectionObserver/);
  assert.match(journey, /video\.play\(\)\.then\(\(\) => video\.pause\(\)\)/);
  assert.doesNotMatch(journey, /<canvas|\/frames\/|FRAME_COUNT/);
  assert.match(journey, /updateMobileJourney/);
  assert.match(journey, /Math\.abs\(targetTime - video\.currentTime\) > 1 \/ 48/);
  assert.match(journey, /window\.addEventListener\("scroll", requestMobileUpdate, \{ passive: true \}\)/);
  assert.match(scrollReveal, /new IntersectionObserver/);
  assert.doesNotMatch(scrollReveal, /mobileJourneySelector|\.clarity-mobile-steps article/);
  assert.match(scrollReveal, /dataset\.scrollReveal = reducedMotion\.matches \? "visible" : "pending"/);
  assert.match(scrollReveal, /rootMargin: "0px 0px -12%"/);
  assert.match(marquee, /customer-marquee/);
  assert.match(marquee, /aria-pressed/);
  assert.doesNotMatch(page, /pathway-grid|const pathways/);
  assert.match(page, /uae-ai-workshop-v1\.jpg/);
  assert.match(page, /uae-port-ai-v1\.jpg/);
  assert.match(page, /infrastructure-inspection-higgsfield-web-v1\.mp4/);
  assert.doesNotMatch(page, /editorial-people-(logistics|healthcare)-higgs-v2\.mp4/);
  assert.match(integrationMap, /AI integration/);
  assert.match(integrationMap, /Custom software/);
  assert.match(integrationMap, /Consulting/);
  assert.match(integrationMap, /SEO \+ AEO/);
  assert.match(integrationMap, /Marketing systems/);
  assert.match(integrationMap, /capability-ai-integration-v1\.jpg/);
  assert.match(integrationMap, /capability-custom-software-v1\.jpg/);
  assert.match(integrationMap, /capability-consulting-v1\.jpg/);
  assert.match(integrationMap, /capability-seo-aeo-v1\.jpg/);
  assert.match(integrationMap, /capability-marketing-systems-v1\.jpg/);
  assert.doesNotMatch(integrationMap, /EditorialLoop/);
  assert.match(integrationMap, /new IntersectionObserver/);
  assert.match(integrationMap, /integration-capability-steps/);
  assert.match(integrationMap, /src=\{publicAsset\(activeCapability\.image\)\}/);
  assert.equal((integrationMap.match(/<Image\b/g) ?? []).length, 1);
  assert.match(integrationMap, /Shared context without a system replacement/);
  assert.match(editorialLoop, /new IntersectionObserver/);
  assert.match(editorialLoop, /SMALL_SCREEN_QUERY/);
  assert.match(editorialLoop, /preload="none"/);
  assert.match(editorialLoop, /video\.pause\(\)/);
  assert.doesNotMatch(layout, /favicon-v2\.png/);
  assert.match(layout, /organizationJsonLd/);
  assert.match(layout, /alternates: \{ canonical: siteUrl \}/);
  assert.match(layout, /preload\(publicAsset\("\/fonts\/hanken-grotesk\.woff2"\)/);
  assert.doesNotMatch(layout, /preload\(publicAsset\("\/fonts\/ibm-plex-mono/);
  assert.match(journey, /loading="eager"/);
  assert.match(layout, /max-video-preview/);
  assert.match(team, /The people doing the work/);
  assert.match(team, /Hamad Al Khamais/);
  assert.match(team, /marqueeGroups/);
  assert.match(team, /team-marquee/);
  assert.match(team, /aria-roledescription="carousel"/);
  assert.match(team, /aria-hidden=\{groupIndex === 1/);
  assert.match(team, /useState/);
  assert.match(team, /useEffect/);
  assert.match(team, /IntersectionObserver/);
  assert.match(team, /data-active="false"/);
  assert.match(team, /Pause team/);
  assert.match(team, /aria-pressed=\{paused\}/);
  assert.doesNotMatch(team, /scrollIntoView/);
  assert.match(scrollReveal, /!target\.closest\("\.team-card"\)/);
  assert.match(clarity, /From complexity to clarity in 3 steps/);
  assert.match(clarity, /Diagnose/);
  assert.match(clarity, /Integrate/);
  assert.match(clarity, /Scale/);
  assert.match(clarity, /window\.addEventListener\("scroll"/);
  assert.doesNotMatch(clarity, /window\.matchMedia\("\(max-width: 760px\)"\)\.matches/);
  assert.match(clarity, /clarity-diagnose-3d-v1\.jpg/);
  assert.match(clarity, /clarity-integrate-3d-v1\.jpg/);
  assert.match(clarity, /clarity-scale-3d-v1\.jpg/);
  assert.match(clarity, /clarity-orbit/);
  assert.match(clarity, /clarity-orbit-marker/);
  assert.doesNotMatch(clarity, /clarity-masthead/);
  assert.match(siteHeader, /window\.scrollY > 72/);
  assert.match(siteHeader, /passive: true/);
  assert.match(siteHeader, /is-scrolled/);
  assert.doesNotMatch(siteHeader, /brand-gulf/);
  assert.match(css, /\.journey \{ height: 500dvh; padding: 0 10px; \}/);
  assert.match(css, /\.clarity-journey \{ height: 300dvh; overflow: clip; \}/);
  assert.match(css, /object-position: 76% 38%/);
  assert.match(about, /OneBonsai Gulf is the Abu Dhabi regional sister company/);
  assert.match(about, /onebonsai-wordmark-black\.png/);
  assert.match(about, /aria-live="polite"/);
  assert.match(about, /role="tablist"/);
  assert.match(about, /CASE_ROTATION_MS = 7200/);
  assert.match(about, /setInterval/);
  assert.match(about, /visibilitychange/);
  assert.match(about, /about-case-cycle/);
  assert.match(about, /UKB nurse training/);
  assert.match(about, /Nike warehouse training/);
  assert.match(about, /Port mooring safety/);
  assert.match(about, /Police VR training/);
  assert.match(about, /Delivered work across/);
  assert.match(about, /marketing/);
  assert.match(about, /cybersecurity/i);
  assert.match(page, /infrastructure-intelligence-v2\.jpg/);
  assert.match(css, /\.journey-film/);
  assert.match(css, /\.journey-shell/);
  assert.match(css, /\.journey-flow-node/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.doesNotMatch(css, /\.journey-canvas|\.intelligence-flow|\.flow-sticky/);
  assert.doesNotMatch(css, /\.pathway-grid|\.journey-capabilities/);
  assert.match(css, /\.integration-scroll-map/);
  assert.match(css, /\.integration-scroll-visual > img/);
  assert.doesNotMatch(css, /growth-tree-motion|capability-motion/);
  assert.match(css, /\.integration-capability-steps/);
  assert.match(css, /scroll-snap-type: inline mandatory/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /100dvh/);
  assert.match(css, /@keyframes customer-marquee/);
  assert.match(css, /\.team-marquee-track/);
  assert.match(css, /animation: team-marquee 180s linear 3s infinite/);
  assert.match(css, /@keyframes team-marquee/);
  assert.match(css, /\.team-marquee:hover \.team-marquee-track/);
  assert.match(css, /\.team-marquee\[data-paused="true"\]/);
  assert.match(css, /\.team-marquee-group\[aria-hidden="true"\]/);
  assert.match(css, /content-visibility: auto/);
  assert.match(css, /\.team-card:hover img/);
  assert.match(css, /\.team-card img[\s\S]*?filter: none/);
  assert.doesNotMatch(css, /\.team-grid|team-page-in/);
  assert.match(css, /@keyframes scroll-text-reveal/);
  assert.match(css, /data-scroll-reveal="pending"/);
  assert.match(css, /\.clarity-orbit/);
  assert.match(css, /\.clarity-orbit-track/);
  assert.match(css, /--clarity-orbit-turn/);
  assert.match(css, /@keyframes clarity-copy-in/);
  assert.doesNotMatch(css, /glow-border|glow-effect|#0894FF|#C959DD/);
  assert.match(css, /@keyframes about-case-image-in/);
  assert.match(css, /\.about-case-index/);
  assert.match(css, /animation-play-state: paused/);
  assert.match(css, /filter: grayscale\(1\)/);
  assert.doesNotMatch(css, /transition:\s*all/);
  assert.match(mediaSources, /Seedance 2\.0/);
  assert.match(mediaSources, /Grok Video/);
  assert.match(mediaSources, /exactly 24 fps/);
  assert.doesNotMatch(mediaSources, /Pexels/i);

  await access(new URL("../public/media/onebonsai-hero-motion-web-v2.mp4", import.meta.url));
  await access(new URL("../public/media/onebonsai-hero-motion-mobile-v1.mp4", import.meta.url));
  await access(new URL("../public/media/onebonsai-hero-poster-web-v3.jpg", import.meta.url));
  await access(new URL("../public/media/icon-systems-1200.avif", import.meta.url));
  await access(new URL("../public/media/icon-intelligence-1200.avif", import.meta.url));
  await access(new URL("../public/media/icon-scale-1200.avif", import.meta.url));
  await access(new URL("../public/media/onebonsai-hero-poster-mobile-1200.jpg", import.meta.url));
  await access(new URL("../public/media/editorial-connect-systems-artlist-v1.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-connect-systems-artlist-v1-poster.jpg", import.meta.url));
  await access(new URL("../public/media/editorial-build-useful-ai-artlist-v1.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-build-useful-ai-artlist-v1-poster.jpg", import.meta.url));
  await access(new URL("../public/media/editorial-scale-with-control-artlist-v1.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-scale-with-control-artlist-v1-poster.jpg", import.meta.url));
  await access(new URL("../public/media/editorial-governed-intelligence-veo-v1.mp4", import.meta.url));
  await access(new URL("../public/media/editorial-governed-intelligence-veo-v1-poster.jpg", import.meta.url));
  await access(new URL("../public/media/capability-ai-integration-v1.jpg", import.meta.url));
  await access(new URL("../public/media/capability-custom-software-v1.jpg", import.meta.url));
  await access(new URL("../public/media/capability-consulting-v1.jpg", import.meta.url));
  await access(new URL("../public/media/capability-seo-aeo-v1.jpg", import.meta.url));
  await access(new URL("../public/media/capability-marketing-systems-v1.jpg", import.meta.url));
  await access(new URL("../public/media/uae-ai-workshop-v1.jpg", import.meta.url));
  await access(new URL("../public/media/uae-port-ai-v1.jpg", import.meta.url));
  await access(new URL("../public/media/infrastructure-inspection-higgsfield-web-v1.mp4", import.meta.url));
  await access(new URL("../public/media/infrastructure-intelligence-v2.jpg", import.meta.url));
  await access(new URL("../public/media/clarity-diagnose-3d-v1.jpg", import.meta.url));
  await access(new URL("../public/media/clarity-integrate-3d-v1.jpg", import.meta.url));
  await access(new URL("../public/media/clarity-scale-3d-v1.jpg", import.meta.url));
  await access(new URL("../public/fonts/hanken-grotesk.woff2", import.meta.url));
  await access(new URL("../public/fonts/ibm-plex-mono.woff2", import.meta.url));
  await access(new URL("../public/brand/onebonsai-wordmark-black.png", import.meta.url));
  await access(new URL("../public/brand/onebonsai-gulf-white-800.png", import.meta.url));
  await access(new URL("../public/robots.txt", import.meta.url));
  await access(new URL("../public/sitemap.xml", import.meta.url));
  await access(new URL("../public/site.webmanifest", import.meta.url));
  await access(new URL("../public/team/ivan-m-grey.jpg", import.meta.url));
  await access(new URL("../public/team/hamad-al-khamais-900.jpg", import.meta.url));
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
  await access(new URL("../app/icon.svg", import.meta.url));
  await access(new URL("../public/customers/ajman.webp", import.meta.url));
  await access(new URL("../public/customers/itc-pros.png", import.meta.url));
  await access(new URL("../public/customers/masdar-city.svg", import.meta.url));
  await access(new URL("../public/customers/next.png", import.meta.url));
  await access(new URL("../public/customers/onebonsai.png", import.meta.url));
  await access(new URL("../public/customers/northstone.png", import.meta.url));
  await access(new URL("../public/customers/stare.png", import.meta.url));
});
