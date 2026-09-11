import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

let renderSequence = 0;

async function requestApp(pathname = "/", init = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${renderSequence++}`);
  const { default: worker } = await import(workerUrl.href);
  const headers = new Headers(init.headers);
  if (!headers.has("accept")) headers.set("accept", "text/html");

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      ...init,
      headers,
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

async function render(pathname = "/") {
  return requestApp(pathname);
}

function mainWordCount(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? "";
  const text = main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:amp|#x27|quot|nbsp);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(" ").length : 0;
}

test("server-renders the OneBonsai Gulf experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  assert.match(response.headers.get("content-security-policy") ?? "", /script-src (?:'nonce-[a-f0-9]+' 'strict-dynamic'|'self' 'unsafe-inline')/);
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");

  const html = await response.text();
  assert.match(html, /<title>AI &amp; Custom Software Abu Dhabi \| OneBonsai Gulf<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/obgulf\.com/);
  assert.match(html, /og-v2\.jpg/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /\"@type\":\"Organization\"/);
  assert.match(html, /Enterprise AI integration/);
  assert.match(html, /We connect the right model, interface, and approval points/);
  assert.match(html, /Start with the workflow/);
  assert.match(html, /Build around what exists/);
  assert.match(html, /Hand over real capability/);
  assert.match(html, /From complexity to clarity in 3 steps\./);
  assert.match(html, /Find the workflow worth fixing\./);
  assert.match(html, /Advise\. Build\. Connect\./);
  assert.match(html, /We advise/);
  assert.match(html, /We build/);
  assert.match(html, /We connect/);
  assert.match(html, /Add the capability your business needs next/);
  assert.match(html, /Shared context without a system replacement/);
  assert.match(html, /SEO \+ AEO/);
  assert.match(html, /Marketing systems/);
  assert.match(html, /immersive (?:VR )?training/i);
  assert.match(html, /Cybersecurity &amp; Secure AI/);
  assert.match(html, /Trusted by organizations building what comes next/);
  assert.match(html, /UAE \/ GLOBAL/);
  assert.doesNotMatch(html, /The people doing the work shape the system/);
  assert.doesNotMatch(html, /uae-ai-workshop-v1/);
  assert.match(html, /Ivan M Grey/);
  assert.match(html, /Inspect assets without closing them down\./);
  assert.match(html, /Pause customer logos/);
  assert.match(html, /Skip to content/);
  assert.doesNotMatch(html, /SCROLL TO CULTIVATE|GO ↗|section-marker/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("blocks hidden deployment files", async () => {
  const response = await requestApp("/.DS_Store");
  assert.equal(response.status, 404);
  assert.equal(await response.text(), "Not found");
});

test("renders the consolidated About, work, and team experience", async () => {
  const [aboutResponse, arabicAboutResponse, workResponse, arabicWorkResponse, teamResponse] = await Promise.all([
    render("/about"),
    render("/ar/about"),
    render("/work"),
    render("/ar/work"),
    render("/team"),
  ]);
  assert.equal(aboutResponse.status, 200);
  assert.equal(arabicAboutResponse.status, 200);
  assert.equal(workResponse.status, 200);
  assert.equal(arabicWorkResponse.status, 200);
  assert.equal(teamResponse.status, 307);

  const aboutHtml = await aboutResponse.text();
  assert.match(aboutHtml, /Regional sister company of/);
  assert.match(aboutHtml, /An Abu Dhabi AI company built to turn ambition into operating capability\./);
  assert.doesNotMatch(aboutHtml, /Built in Belgium\. Delivered from Abu Dhabi\./);
  assert.doesNotMatch(aboutHtml, /Advise\. Build\. Connect\./);
  assert.doesNotMatch(aboutHtml, /AI strategy and transformation/);
  assert.doesNotMatch(aboutHtml, /Custom AI solutions and integrations/);
  assert.doesNotMatch(aboutHtml, /Vetted AI specialists and SMEs/);
  assert.doesNotMatch(aboutHtml, /Selected work in complex, high-stakes environments\./);
  assert.doesNotMatch(aboutHtml, /Virtual nurse training for University Hospital Bonn/);
  assert.match(aboutHtml, /Founded in Europe in 2014/);
  assert.match(aboutHtml, /In 2026, that experience expanded into Abu Dhabi/);
  assert.doesNotMatch(aboutHtml, /AI talent &amp; expertise/i);
  assert.doesNotMatch(aboutHtml, /The right AI transformation starts with the right people\./);
  assert.match(aboutHtml, /The world does not need more conversations about AI/);
  assert.match(aboutHtml, /Ivan M Grey/);
  assert.match(aboutHtml, /CEO &amp; Founder/);
  assert.match(aboutHtml, /The people behind the work\./);
  assert.match(aboutHtml, /Omar Abedlaziz/);
  assert.match(aboutHtml, /Business Development, Greece and Cyprus/);
  assert.match(aboutHtml, /Business Development, Italy/);
  const orderedTeamNames = [
    "Niels Ongena",
    "Jelena Skoric",
    "Lohith Lalesh",
    "Olfa Hachfi",
    "Hugo Mathias",
    "Caro Lozano Escalante",
    "Valentina Scanu",
  ];
  const orderedTeamPositions = orderedTeamNames.map((name) => aboutHtml.indexOf(name));
  assert.ok(orderedTeamPositions.every((position) => position >= 0));
  assert.deepEqual(orderedTeamPositions, [...orderedTeamPositions].sort((a, b) => a - b));
  assert.match(aboutHtml, /Project Manager/);
  assert.match(aboutHtml, /Chief Finance Officer/);
  assert.match(aboutHtml, /instagram\.com\/onebonsai_gulf/);
  assert.match(aboutHtml, /ae\.linkedin\.com\/company\/thegreyworld/);
  assert.match(aboutHtml, /rel="canonical" href="https:\/\/obgulf\.com\/about/);
  assert.match(aboutHtml, /hrefLang="ar-AE" href="https:\/\/obgulf\.com\/ar\/about"/);

  const arabicAboutHtml = await arabicAboutResponse.text();
  assert.match(arabicAboutHtml, /<html lang="ar-AE" dir="rtl"/);
  assert.match(arabicAboutHtml, /rel="canonical" href="https:\/\/obgulf\.com\/ar\/about"/);
  assert.match(arabicAboutHtml, /شركة ذكاء اصطناعي من أبوظبي/);
  assert.doesNotMatch(arabicAboutHtml, /نستشير\. نبني\. نربط\./);
  assert.match(arabicAboutHtml, /Switch to English/);

  const workHtml = await workResponse.text();
  assert.match(workHtml, /AI, software, and immersive training built for high-stakes work\./);
  assert.match(workHtml, /Hospital group — from fragmented processes to an AI roadmap/);
  assert.match(workHtml, /AI-assisted quality assurance for digital delivery/);
  assert.match(workHtml, /Immersive maintenance training without live asset risk/);
  assert.match(workHtml, /Vyonix — an AI-ready digital product passport/);
  assert.match(workHtml, /Simplify Suite turns fragmented business administration into one operating space/);
  assert.match(workHtml, /Blinking\.id makes regulated onboarding configurable/);
  assert.match(workHtml, /\/work\/healthcare-simulation\.avif/);
  assert.match(workHtml, /\/work\/simplify-suite-v2\.avif/);
  assert.match(workHtml, /\/work\/blinking-id\.avif/);
  assert.doesNotMatch(workHtml, /onebonsai\.com\/cases/);
  assert.match(workHtml, /rel="canonical" href="https:\/\/obgulf\.com\/work/);

  const arabicWorkHtml = await arabicWorkResponse.text();
  assert.match(arabicWorkHtml, /<html lang="ar-AE" dir="rtl"/);
  assert.match(arabicWorkHtml, /يجمع Simplify Suite إدارة الأعمال المشتتة/);
  assert.match(arabicWorkHtml, /Blinking\.id هو شريكنا المتخصص/);
  assert.match(arabicWorkHtml, /rel="canonical" href="https:\/\/obgulf\.com\/ar\/work/);
  assert.equal(teamResponse.headers.get("location"), "http://localhost/about#team");
});

test("renders the custom not-found page", async () => {
  const response = await render("/this-page-does-not-exist");
  assert.equal(response.status, 404);

  const html = await response.text();
  assert.match(html, /This page is not here\./);
  assert.match(html, /Return home/);
  assert.match(html, /Skip to content/);
});

test("renders the bilingual progressive careers experience with AI fluency and private resume intake", async () => {
  const [careersResponse, arabicCareersResponse, formSource, questionBankSource, startRouteSource, quizRouteSource, resumeRouteSource, invalidCareerResponse] = await Promise.all([
    render("/careers"),
    render("/ar/careers"),
    readFile(new URL("../app/CareerApplicationForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/careers/question-bank.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/careers/start/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/careers/quiz/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/careers/resume/route.ts", import.meta.url), "utf8"),
    requestApp("/api/enquire", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ submissionType: "career", name: "A", linkedin: "not-linkedin", locale: "en" }),
    }),
  ]);

  assert.equal(careersResponse.status, 200);
  assert.equal(arabicCareersResponse.status, 200);

  const careersHtml = await careersResponse.text();
  assert.match(careersHtml, /Does your skill set include AI\?/);
  assert.match(careersHtml, /We want you on board\./);
  assert.match(careersHtml, /id="career-form"/);
  assert.match(careersHtml, /id="career-name"/);
  assert.doesNotMatch(careersHtml, /\/team\/careers-/);
  assert.match(careersHtml, /rel="canonical" href="https:\/\/obgulf\.com\/careers"/);

  const arabicCareersHtml = await arabicCareersResponse.text();
  assert.match(arabicCareersHtml, /<html lang="ar-AE" dir="rtl"/);
  assert.match(arabicCareersHtml, /هل تشمل مهاراتك الذكاء الاصطناعي؟/);
  assert.match(arabicCareersHtml, /نريدك معنا\./);
  assert.match(arabicCareersHtml, /rel="canonical" href="https:\/\/obgulf\.com\/ar\/careers"/);

  assert.match(formSource, /JK\. We don't care about your age\./);
  assert.match(formSource, /We don't care which university you attended\./);
  assert.match(formSource, /linkedin\.com/);
  assert.match(formSource, /Anything worth bragging about\?/);
  assert.match(formSource, /fetch\(publicAsset\("\/api\/careers\/start"\)/);
  assert.match(formSource, /fetch\(publicAsset\("\/api\/careers\/quiz"\)/);
  assert.match(formSource, /fetch\(publicAsset\("\/api\/careers\/resume"\)/);
  assert.match(formSource, /100|three practical AI questions/);
  assert.match(formSource, /PDF only · maximum 5 MB/);
  assert.match(formSource, /One signal is not the whole person/);
  assert.equal((questionBankSource.match(/id: "/g) ?? []).length >= 20, true);
  assert.match(questionBankSource, /contexts\.flatMap/);
  assert.match(startRouteSource, /career_applications/);
  assert.match(startRouteSource, /verifyTurnstile/);
  assert.match(quizRouteSource, /career_quiz_answers/);
  assert.match(quizRouteSource, /MAX_ATTEMPTS/);
  assert.match(resumeRouteSource, /RESUMES\.put/);
  assert.match(resumeRouteSource, /%PDF-/);
  assert.equal(invalidCareerResponse.status, 400);
  assert.deepEqual(await invalidCareerResponse.json(), { success: false, error: "A full name is required." });
});

test("renders and validates the bilingual AI integration enquiry flow", async () => {
  const [homeResponse, arabicHomeResponse, confirmationResponse, invalidResponse, honeypotResponse] = await Promise.all([
    render(),
    render("/ar"),
    render("/contact?enquiry=sent"),
    requestApp("/api/enquire", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "", email: "", phone: "", requirement: "", locale: "en" }),
    }),
    requestApp("/api/enquire", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Spam Bot", email: "bot@example.com", phone: "", requirement: "other", locale: "en", website: "https://spam.invalid" }),
    }),
  ]);

  const homeHtml = await homeResponse.text();
  assert.match(homeHtml, /<dialog[^>]+class="plan-integration-dialog"/);
  assert.match(homeHtml, /Talk to the CEO about what needs to move\./);
  assert.match(homeHtml, /<input[^>]+id="plan-name"[^>]+required/);
  assert.match(homeHtml, /name="name"/);
  assert.match(homeHtml, /name="email"/);
  assert.match(homeHtml, /name="phone"/);
  assert.match(homeHtml, /name="requirement"/);
  assert.match(homeHtml, /name="website"/);
  assert.match(homeHtml, /Sovereign Cloud Integration/);
  assert.match(homeHtml, /Just want to catch up on tech/);

  const arabicHomeHtml = await arabicHomeResponse.text();
  assert.match(arabicHomeHtml, /لنتحدث عمّا يحتاج إلى التقدّم\./);
  assert.match(arabicHomeHtml, /الذكاء الاصطناعي الوكيلي/);
  assert.match(arabicHomeHtml, /مجرد دردشة حول التقنية/);
  assert.match(arabicHomeHtml, /إرسال الطلب/);

  const confirmationHtml = await confirmationResponse.text();
  assert.match(confirmationHtml, /Thank you — your enquiry has been sent\./);

  assert.equal(invalidResponse.status, 400);
  assert.deepEqual(await invalidResponse.json(), { success: false, error: "A full name is required." });
  assert.equal(honeypotResponse.status, 200);
  assert.deepEqual(await honeypotResponse.json(), { success: true });

  const enquiryRoute = await readFile(new URL("../app/api/enquire/route.ts", import.meta.url), "utf8");
  assert.match(enquiryRoute, /ivan@obgulf\.com/);
  assert.match(enquiryRoute, /RESEND_API_KEY/);
  assert.match(enquiryRoute, /ENQUIRY_WEBHOOK_URL/);
});

test("keeps high-resolution scroll media, UAE imagery, and private sector-level work in source", async () => {
  const [page, about, aboutPage, caseStudies, workPage, teamPage, clarity, journey, scrollReveal, marquee, editorialLoop, integrationMap, team, siteHeader, siteContact, layout, planIntegrationModal, css, mediaSources] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/AboutSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CaseStudies.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/work/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/team/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ClarityJourney.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ScrollJourney.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ScrollReveal.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CustomerMarquee.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/EditorialLoop.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/IntegrationMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/TeamSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteContact.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PlanIntegrationModal.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../MEDIA_SOURCES.md", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<ScrollJourney \/>/);
  assert.match(page, /<ClarityJourney \/>/);
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
  assert.match(journey, /onebonsai-hero-poster-mobile-v2\.jpg/);
  assert.doesNotMatch(journey, /journey-signal-card|journey-signal-orb/);
  assert.match(journey, /disableRemotePlayback/);
  assert.match(journey, /renderedTime \+= \(targetTime - renderedTime\) \* 0\.16/);
  assert.match(journey, /Math\.abs\(renderedTime - video\.currentTime\) > 1 \/ 60/);
  assert.match(journey, /new IntersectionObserver/);
  assert.match(journey, /openPlanIntegration/);
  assert.match(journey, /journey-accessible-steps/);
  assert.match(journey, /Custom software and AI integration, built in Abu Dhabi\./);
  assert.doesNotMatch(journey, /video\.play\(/);
  assert.doesNotMatch(journey, /<canvas|\/frames\/|FRAME_COUNT/);
  assert.match(journey, /updateMobileJourney/);
  assert.match(journey, /Math\.abs\(targetTime - video\.currentTime\) > 1 \/ 48/);
  assert.match(journey, /const ensureMobileVideo/);
  assert.match(journey, /video\.src = publicAsset\("\/media\/onebonsai-hero-motion-mobile-v1\.mp4"\)/);
  assert.doesNotMatch(journey, /URL\.createObjectURL|response\.blob\(\)/);
  assert.match(journey, /window\.addEventListener\("scroll", handleMobileScroll, \{ passive: true \}\)/);
  assert.match(scrollReveal, /new IntersectionObserver/);
  assert.doesNotMatch(scrollReveal, /mobileJourneySelector|\.clarity-mobile-steps article/);
  assert.match(scrollReveal, /dataset\.scrollReveal = reducedMotion\.matches \? "visible" : "pending"/);
  assert.match(scrollReveal, /rootMargin: "0px 0px -12%"/);
  assert.match(scrollReveal, /observer\.unobserve\(target\)/);
  assert.doesNotMatch(scrollReveal, /else if \(repeats\)/);
  assert.match(marquee, /customer-marquee/);
  assert.match(marquee, /aria-pressed/);
  assert.doesNotMatch(page, /pathway-grid|const pathways/);
  assert.doesNotMatch(page, /uae-ai-workshop-v1\.jpg/);
  assert.doesNotMatch(page, /uae-port-ai-v1\.jpg/);
  assert.doesNotMatch(page, /<TeamSection \/>/);
  assert.match(page, /<SiteContact \/>/);
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
  assert.match(layout, /siteJsonLd/);
  assert.match(layout, /sameAs/);
  assert.match(layout, /instagram\.com\/onebonsai_gulf/);
  assert.match(layout, /ae\.linkedin\.com\/company\/thegreyworld/);
  assert.match(layout, /"en-AE": siteUrl/);
  assert.match(layout, /"ar-AE": `\$\{siteUrl\}\/ar`/);
  assert.match(layout, /"x-default": siteUrl/);
  assert.match(layout, /preload\(publicAsset\("\/fonts\/hanken-grotesk\.woff2"\)/);
  assert.match(layout, /<PlanIntegrationProvider>/);
  assert.match(siteHeader, /openPlanIntegration/);
  assert.match(planIntegrationModal, /<dialog/);
  assert.match(planIntegrationModal, /scrollIntoView/);
  assert.match(planIntegrationModal, /\?enquiry=sent/);
  assert.doesNotMatch(layout, /preload\(publicAsset\("\/fonts\/ibm-plex-mono/);
  assert.match(journey, /loading="eager"/);
  assert.match(layout, /max-video-preview/);
  assert.match(teamPage, /redirect\("\/about#team"\)/);
  assert.match(aboutPage, /<AboutSection locale=\{locale\} \/>/);
  assert.doesNotMatch(aboutPage, /AboutPrinciples/);
  assert.match(aboutPage, /<AboutPeople locale=\{locale\} \/>/);
  assert.match(aboutPage, /<TeamSection locale=\{locale\} \/>/);
  assert.match(workPage, /<CaseStudies \/>/);
  assert.match(workPage, /localizedAlternates\("\/work", locale\)/);
  assert.match(siteContact, /Move from AI interest to a system your team can use/);
  assert.match(team, /The people behind the work/);
  assert.match(team, /Hamad Al Khamais/);
  assert.match(team, /Omar Abedlaziz/);
  assert.match(team, /Business Development, Italy/);
  assert.match(team, /className="team-wall"/);
  assert.match(team, /className="team-person"/);
  assert.match(team, /role="list"/);
  assert.match(scrollReveal, /\.team-card, \.team-person/);
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
  assert.match(siteHeader, /mobile-menu-toggle/);
  assert.match(siteHeader, /Mobile navigation/);
  assert.match(siteHeader, /aria-expanded=\{isMenuOpen\}/);
  assert.doesNotMatch(siteHeader, /brand-gulf/);
  assert.match(siteHeader, /\["Work", "\/work"\]/);
  assert.match(css, /\.journey \{ height: 500dvh; padding: 0 10px; \}/);
  assert.match(css, /\.clarity-journey \{ height: 300dvh; overflow: clip; \}/);
  assert.match(css, /object-position: center top/);
  assert.match(css, /height: 100svh/);
  assert.doesNotMatch(css, /journey\[data-act="[12]"\] \.journey-film (?:video|img)/);
  assert.match(about, /Founded in Europe in 2014/);
  assert.doesNotMatch(about, /Built in Belgium\. Delivered from Abu Dhabi\./);
  assert.match(about, /onebonsai-wordmark-black\.png/);
  assert.match(about, /custom software/);
  assert.match(about, /specialist expertise/);
  assert.doesNotMatch(about, /UKB nurse training|about-case-carousel/);
  assert.match(caseStudies, /work-case-library/);
  assert.match(caseStudies, /Challenge/);
  assert.match(caseStudies, /Approach/);
  assert.match(caseStudies, /Outcome/);
  assert.match(caseStudies, /Hospital group — from fragmented processes to an AI roadmap/);
  assert.match(caseStudies, /AI-assisted quality assurance for digital delivery/);
  assert.match(caseStudies, /Immersive maintenance training without live asset risk/);
  assert.match(caseStudies, /Vyonix — an AI-ready digital product passport/);
  assert.doesNotMatch(caseStudies, /target="_blank"|onebonsai\.com\/cases/);
  assert.match(page, /infrastructure-intelligence-v2\.avif/);
  assert.match(css, /\.journey-film/);
  assert.match(css, /\.journey-shell/);
  assert.match(css, /\.journey-flow-node/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.match(css, /@media \(min-width: 841px\)/);
  assert.match(css, /background: rgba\(9, 11, 10, 0\.92\)/);
  assert.doesNotMatch(css, /\.journey-canvas|\.intelligence-flow|\.flow-sticky/);
  assert.doesNotMatch(css, /\.pathway-grid|\.journey-capabilities/);
  assert.match(css, /\.integration-scroll-map/);
  assert.match(css, /\.integration-scroll-visual > img/);
  assert.doesNotMatch(css, /growth-tree-motion|capability-motion/);
  assert.match(css, /\.integration-capability-steps/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /100dvh/);
  assert.match(css, /@keyframes customer-marquee/);
  assert.match(css, /\.team-wall/);
  assert.match(css, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.team-person-portrait/);
  assert.doesNotMatch(css, /\.team-person:first-child/);
  assert.match(css, /content-visibility: auto/);
  assert.match(css, /\.team-person:hover \.team-person-portrait img/);
  assert.match(css, /\.inner-page-hero/);
  assert.match(css, /\.about-page-principles/);
  assert.match(css, /@keyframes scroll-text-reveal/);
  assert.match(css, /data-scroll-reveal="pending"/);
  assert.match(css, /data-scroll-reveal="pending"\][^{]*\{\s*opacity: 0;/s);
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
  await access(new URL("../public/media/onebonsai-hero-poster-mobile-v2.jpg", import.meta.url));
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
  await access(new URL("../public/llms.txt", import.meta.url));
  await access(new URL("../public/site.webmanifest", import.meta.url));
  await access(new URL("../public/team/ivan-m-grey.jpg", import.meta.url));
  await access(new URL("../public/team/ivan-founder-office.jpg", import.meta.url));
  await access(new URL("../public/team/caro-lozano-escalante.jpg", import.meta.url));
  await access(new URL("../public/team/valentina-scanu.jpg", import.meta.url));
  await access(new URL("../public/team/omar-abedlaziz.jpg", import.meta.url));
  await access(new URL("../public/team/hamad-al-khamais.jpg", import.meta.url));
  await access(new URL("../public/team/jelena-skoric.jpg", import.meta.url));
  await access(new URL("../public/team/lohith-lalesh.jpg", import.meta.url));
  await access(new URL("../public/team/olfa-hachfi.jpg", import.meta.url));
  await access(new URL("../public/team/aditya-varshney.jpg", import.meta.url));
  await access(new URL("../public/team/pankaj-birla.jpg", import.meta.url));
  await access(new URL("../public/team/mohamed-ilyes-bouzayen.jpg", import.meta.url));
  await access(new URL("../public/team/rabeb-ben-hamouda.jpg", import.meta.url));
  await access(new URL("../public/team/khawla-zon.jpg", import.meta.url));
  await access(new URL("../public/team/slim-garbouj.jpg", import.meta.url));
  await access(new URL("../public/team/niels-ongena.jpg", import.meta.url));
  await access(new URL("../public/team/hugo-mathias.jpg", import.meta.url));
  await access(new URL("../public/team/lazar-miletic.jpg", import.meta.url));
  await access(new URL("../public/team/riadh-ajroudi.jpg", import.meta.url));
  await access(new URL("../public/team/bharath-jethani.jpg", import.meta.url));
  await access(new URL("../public/cases/ukb-vr-training.jpg", import.meta.url));
  await access(new URL("../public/cases/nike-warehouse-training.jpg", import.meta.url));
  await access(new URL("../public/cases/port-mooring-training.jpg", import.meta.url));
  await access(new URL("../public/cases/police-vr-training.jpg", import.meta.url));
  await access(new URL("../public/media/higgsfield-ai-services-uae-v1.jpg", import.meta.url));
  await access(new URL("../public/media/higgsfield-industries-uae-v1.jpg", import.meta.url));
  await access(new URL("../public/media/higgsfield-ai-insights-uae-v1.jpg", import.meta.url));
  await access(new URL("../app/icon.svg", import.meta.url));
  await access(new URL("../public/customers/ajman.webp", import.meta.url));
  await access(new URL("../public/customers/itc-pros.png", import.meta.url));
  await access(new URL("../public/customers/masdar-city.svg", import.meta.url));
  await access(new URL("../public/customers/next.png", import.meta.url));
  await access(new URL("../public/customers/onebonsai.png", import.meta.url));
  await access(new URL("../public/customers/northstone.png", import.meta.url));
  await access(new URL("../public/customers/stare.png", import.meta.url));
  await access(new URL("../public/customers/fuego.png", import.meta.url));
  await access(new URL("../public/customers/reqilo.svg", import.meta.url));
  await access(new URL("../public/customers/fithub.jpeg", import.meta.url));
  await access(new URL("../public/customers/animalia.png", import.meta.url));
  await access(new URL("../public/customers/buildin.svg", import.meta.url));
  await access(new URL("../public/customers/motto.webp", import.meta.url));
  await access(new URL("../public/customers/casinos-austria.png", import.meta.url));
  await access(new URL("../public/customers/eeas.png", import.meta.url));
  await access(new URL("../public/customers/red-cross-eu.svg", import.meta.url));
  await access(new URL("../public/customers/mbare.png", import.meta.url));
  await access(new URL("../public/customers/elite-labs.png", import.meta.url));
  await access(new URL("../public/customers/vyonix.png", import.meta.url));
});

test("renders the SEO service, industry, and insight architecture", async () => {
  const [services, service, systemIntegration, cybersecurity, applicationDevelopment, customSoftware, aiExperts, digitalTwins, marketEntry, vrTraining, industries, insightHub, insight, readiness, vendorGuide, author, contact] = await Promise.all([
    render("/services"),
    render("/services/agentic-ai-implementation"),
    render("/services/system-integration"),
    render("/services/cybersecurity"),
    render("/services/application-development"),
    render("/services/custom-software-development"),
    render("/services/ai-experts-on-demand"),
    render("/services/digital-twins-simulation"),
    render("/services/uae-market-entry"),
    render("/services/vr-training-simulation"),
    render("/industries"),
    render("/insights"),
    render("/insights/agentic-ai-implementation-uae"),
    render("/insights/ai-readiness-assessment-checklist"),
    render("/insights/software-development-companies-abu-dhabi-checklist"),
    render("/authors/aditya"),
    render("/contact"),
  ]);

  for (const response of [services, service, systemIntegration, cybersecurity, applicationDevelopment, customSoftware, aiExperts, digitalTwins, marketEntry, vrTraining, industries, insightHub, insight, readiness, vendorGuide, author, contact]) {
    assert.equal(response.status, 200);
  }

  const [servicesHtml, serviceHtml, systemIntegrationHtml, cybersecurityHtml, applicationDevelopmentHtml, customSoftwareHtml, aiExpertsHtml, digitalTwinsHtml, marketEntryHtml, vrTrainingHtml, industriesHtml, insightHubHtml, insightHtml, readinessHtml, vendorGuideHtml, authorHtml, contactHtml] = await Promise.all([
    services.text(),
    service.text(),
    systemIntegration.text(),
    cybersecurity.text(),
    applicationDevelopment.text(),
    customSoftware.text(),
    aiExperts.text(),
    digitalTwins.text(),
    marketEntry.text(),
    vrTraining.text(),
    industries.text(),
    insightHub.text(),
    insight.text(),
    readiness.text(),
    vendorGuide.text(),
    author.text(),
    contact.text(),
  ]);

  assert.match(servicesHtml, /AI consulting, integration, and custom software for UAE organizations\./);
  assert.match(serviceHtml, /Agentic AI implementation in the UAE/);
  assert.match(serviceHtml, /\"@type\":\"Service\"/);
  assert.match(serviceHtml, /\"@type\":\"FAQPage\"/);
  assert.match(systemIntegrationHtml, /System integration services for UAE enterprises\./);
  assert.match(systemIntegrationHtml, /system integration companies in Dubai/);
  assert.match(cybersecurityHtml, /Cybersecurity services for UAE enterprises\./);
  assert.match(cybersecurityHtml, /Treat AI security as a system problem\./);
  assert.match(applicationDevelopmentHtml, /Application development services in Abu Dhabi and the UAE\./);
  assert.match(applicationDevelopmentHtml, /AED 2,000–5,500/);
  assert.match(customSoftwareHtml, /Custom software development in Abu Dhabi\./);
  assert.match(customSoftwareHtml, /name=\"twitter:title\" content=\"Custom software development in Abu Dhabi\"/);
  assert.match(customSoftwareHtml, /property=\"og:image\" content=\"https:\/\/obgulf\.com\/media\/capability-custom-software-v1\.jpg\"/);
  assert.match(aiExpertsHtml, /AI experts on demand, for the exact capability gap\./);
  assert.match(aiExpertsHtml, /capacity up or down/);
  assert.match(digitalTwinsHtml, /What is a digital twin\?/);
  assert.match(digitalTwinsHtml, /sensor data/);
  assert.match(digitalTwinsHtml, /\[VERIFY: typical timeline\]/);
  assert.match(marketEntryHtml, /Enter the GCC market from Abu Dhabi\./);
  assert.match(marketEntryHtml, /Masdar City Free Zone/);
  assert.match(marketEntryHtml, /\[VERIFY: fee structure\]/);
  assert.match(vrTrainingHtml, /€2,000 per licence per year/);
  assert.match(vrTrainingHtml, /Educational institutions receive 50% off all modules/);
  assert.match(vrTrainingHtml, /More than 80,000 people have trained on immersive solutions across the OneBonsai group/);
  assert.ok(mainWordCount(aiExpertsHtml) >= 1100);
  assert.ok(mainWordCount(digitalTwinsHtml) >= 1100);
  assert.ok(mainWordCount(marketEntryHtml) >= 1100);
  assert.ok(mainWordCount(vrTrainingHtml) >= 1300);
  assert.ok(mainWordCount(vrTrainingHtml) <= 1500);
  assert.match(industriesHtml, /Government &amp; Smart Cities/);
  assert.match(industriesHtml, /Ecology &amp; Sustainability/);
  assert.match(industriesHtml, /\"@type\":\"ItemList\"/);
  assert.match(insightHubHtml, /Practical guidance for AI decisions in the UAE\./);
  assert.match(insightHtml, /Agentic AI implementation in the UAE/);
  assert.match(insightHtml, /\"@type\":\"BlogPosting\"/);
  assert.match(insightHtml, /50% of federal government sectors, services, and operations/);
  assert.match(insightHtml, /Bounded Autonomy Decision Matrix/);
  assert.match(insightHtml, /Core42 Sovereign Public Cloud/);
  assert.match(insightHtml, /UAE Federal Decree-Law No\. 45 of 2021/);
  assert.match(insightHtml, /<table>/);
  assert.match(insightHtml, /Written by/);
  assert.match(insightHtml, /Aditya Varshney/);
  assert.match(insightHtml, /"author":\{"@type":"Person"/);
  assert.match(insightHtml, /"datePublished":"2026-09-09"/);
  assert.doesNotMatch(insightHtml, /"dateModified"/);
  assert.match(readinessHtml, /four-pillar Enterprise Readiness Matrix/i);
  assert.match(readinessHtml, /Executive Sponsorship/);
  assert.match(readinessHtml, /What deliverables should we receive\?/);
  assert.match(vendorGuideHtml, /Abu Dhabi vendor evaluation rubric/);
  assert.match(vendorGuideHtml, /Federal Decree-Law No\. 38 of 2021/);
  assert.match(vendorGuideHtml, /AED 2,000–5,500/);
  assert.match(vendorGuideHtml, /source-code escrow/);
  assert.match(authorHtml, /Author and practitioner/);
  assert.match(authorHtml, /Articles by Aditya Varshney/);
  assert.match(authorHtml, /"@type":"ProfilePage"/);
  assert.match(contactHtml, /Tell us which workflow, product, or capability needs to move\./);

  const [insightsSource, sitemap, llms] = await Promise.all([
    readFile(new URL("../app/content/insights.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
  ]);
  assert.equal((insightsSource.match(/^    slug:/gm) ?? []).length, 20);
  assert.equal((sitemap.match(/<loc>https:\/\/obgulf\.com\/insights\//g) ?? []).length, 20);
  assert.match(llms, /OneBonsai Gulf/);
});

test("gives every canonical sitemap route one H1 and complete search metadata", async () => {
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(urls.length, 46);
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.includes("https://obgulf.com/services/ai-experts-on-demand"));
  assert.ok(urls.includes("https://obgulf.com/services/digital-twins-simulation"));
  assert.ok(urls.includes("https://obgulf.com/services/uae-market-entry"));
  assert.ok(urls.includes("https://obgulf.com/careers"));

  for (const canonicalUrl of urls) {
    const response = await render(new URL(canonicalUrl).pathname);
    assert.equal(response.status, 200, canonicalUrl);
    const html = await response.text();
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${canonicalUrl} should have one H1`);
    assert.match(html, /<title>[^<]+<\/title>/i, `${canonicalUrl} should have a title`);
    assert.match(html, /<meta name="description" content="[^"]+"\/>/i, `${canonicalUrl} should have a description`);
    assert.equal(html.match(/rel="canonical" href="([^"]+)"/i)?.[1], canonicalUrl.replace(/\/$/, "") || canonicalUrl);
  }
});

test("enforces the production HTTPS apex host and security headers", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("redirect-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://www.obgulf.com/insights?source=test"),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://obgulf.com/insights?source=test");
  assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000");
});
