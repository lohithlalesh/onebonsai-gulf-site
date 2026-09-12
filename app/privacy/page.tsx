import type { Metadata } from "next";
import { localizedAlternates } from "../seo";
import Link from "next/link";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How OneBonsai Gulf handles personal information submitted through this website and direct enquiries.",
  alternates: localizedAlternates("/privacy"),
};

export default function PrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="inner-page-main legal-page">
        <article className="section-pad">
          <header><p className="section-kicker">Last updated 13 September 2026</p><h1>Privacy policy</h1><p>This policy explains how OneBonsai Gulf LLC handles personal information received through obgulf.com and direct enquiries.</p></header>
          <section><h2>Information we receive</h2><p>We may receive your name, work contact details, organization, role, and the information you choose to include when you email or otherwise contact us. Our hosting and security providers may also process limited technical data such as IP address, device and browser information, request time, and pages requested.</p></section>
          <section><h2>Why we use it</h2><p>We use information to respond to enquiries, assess whether we can help, communicate about requested services, protect and operate the website, comply with legal obligations, and maintain necessary business records. We do not ask you to send confidential, health, financial, classified, or other sensitive operational information through an initial website enquiry.</p></section>
          <section><h2>Sharing and international processing</h2><p>Information may be processed by service providers that support website hosting, security, email, and business operations, subject to appropriate contractual and security measures. We may also share information where required by law or needed to establish, exercise, or defend legal rights.</p></section>
          <section><h2>Retention and security</h2><p>We retain enquiry information only for as long as reasonably required for the purpose, our legitimate business records, and applicable legal obligations. We use proportionate technical and organizational safeguards, but no internet transmission or storage system can be guaranteed completely secure.</p></section>
          <section><h2>Your choices and rights</h2><p>Depending on applicable law, you may have rights relating to access, correction, deletion, restriction, objection, portability, or withdrawal of consent. To make a request, email <a href="mailto:info@onebonsai.com?subject=Privacy%20request">info@onebonsai.com</a>. We may need to verify your identity before acting.</p></section>
          <section><h2>Analytics, cookies, and external links</h2><p>Google Analytics 4 is loaded only after you choose “Allow analytics” in the website notice. It helps us understand page use, navigation, and important actions such as starting an enquiry or completing a career application. We do not send names, email addresses, phone numbers, LinkedIn profiles, form text, or résumé information to Google Analytics.</p><p>Google Analytics may process device and browser information, approximate location, page addresses, and interaction data, and may place first-party analytics cookies after consent. Advertising storage, Google signals, ad personalization, and advertising cookies are disabled in our implementation. You can change your choice at any time through “Cookie settings” in the website footer.</p><p>Essential hosting and security technologies may operate without analytics consent. External websites have their own privacy practices, which we do not control.</p></section>
          <section><h2>Contact and changes</h2><p>Questions can be sent to <a href="mailto:info@onebonsai.com?subject=Privacy%20question">info@onebonsai.com</a>. We may update this policy when the website, services, or legal requirements change and will revise the date above.</p><p><strong>Important:</strong> this is a plain-language operational draft and should be reviewed by qualified UAE counsel before public deployment.</p></section>
          <p><Link href="/terms">Read the website terms</Link></p>
        </article>
        <SiteContact />
      </main>
    </>
  );
}
