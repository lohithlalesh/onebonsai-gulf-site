import type { Metadata } from "next";
import { localizedAlternates } from "../seo";
import Link from "next/link";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";

export const metadata: Metadata = {
  title: "Website Terms of Use",
  description: "Terms governing access to and use of the OneBonsai Gulf website and its general information.",
  alternates: localizedAlternates("/terms"),
};

export default function TermsPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="inner-page-main legal-page">
        <article className="section-pad">
          <header><p className="section-kicker">Last updated 9 September 2026</p><h1>Website terms of use</h1><p>These terms apply to your use of obgulf.com. By using the website, you agree to use it lawfully and in accordance with these terms.</p></header>
          <section><h2>General information</h2><p>The website provides general information about OneBonsai Gulf, its capabilities, work, and areas of interest. It does not create a client, advisory, employment, partnership, or other professional relationship. A service relationship begins only under a separate written agreement.</p></section>
          <section><h2>No professional advice</h2><p>Website content is not legal, regulatory, financial, clinical, engineering, cybersecurity, procurement, or other professional advice. You should obtain qualified advice and validate requirements for your organization, sector, and use case before acting.</p></section>
          <section><h2>Accuracy and availability</h2><p>We aim to keep the website useful and accurate, but information can become incomplete or outdated and is provided without a guarantee of continuous availability. We may change or remove content and features without notice.</p></section>
          <section><h2>Acceptable use</h2><p>You must not misuse the website, attempt unauthorized access, interfere with its operation, introduce harmful material, scrape it in a way that causes disruption, or use its content or identity to mislead others.</p></section>
          <section><h2>Intellectual property</h2><p>Unless stated otherwise, the website’s original text, design, branding, code, and media are owned by or licensed to OneBonsai Gulf or the wider OneBonsai network. You may link to public pages and make reasonable personal or internal reference use, but you may not republish substantial material or imply endorsement without permission.</p></section>
          <section><h2>External links</h2><p>Links to third-party websites are provided for context or convenience. We do not control those websites and are not responsible for their content, availability, or practices.</p></section>
          <section><h2>Liability and governing terms</h2><p>To the fullest extent permitted by applicable law, OneBonsai Gulf is not liable for loss arising solely from reliance on general website content or from website interruption. Mandatory legal rights are not excluded. Any project-specific responsibilities will be governed by the relevant written agreement.</p><p><strong>Important:</strong> this is an operational draft and should be reviewed by qualified UAE counsel before public deployment.</p></section>
          <p><Link href="/privacy">Read the privacy policy</Link></p>
        </article>
        <SiteContact />
      </main>
    </>
  );
}
