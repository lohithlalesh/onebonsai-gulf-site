import Link from "next/link";
import SiteHeader from "./SiteHeader";

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="not-found-page">
        <p className="section-kicker">404 / Page not found</p>
        <h1>This page is not here.</h1>
        <p>The address may have changed, or the page may no longer exist.</p>
        <Link className="primary-button" href="/">Return home</Link>
      </main>
    </>
  );
}
