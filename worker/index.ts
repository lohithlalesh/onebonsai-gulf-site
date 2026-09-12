/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { pruneExpiredCareerApplications } from "./career-retention";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  RESUMES?: R2Bucket;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

interface ScheduledController {
  scheduledTime: number;
  cron: string;
}

const CANONICAL_HOST = "obgulf.com";
const SECURITY_TXT_PATH = "/.well-known/security.txt";
const SECURITY_TXT = `Contact: mailto:ivan@obgulf.com
Expires: 2027-09-11T00:00:00.000Z
Preferred-Languages: en, ar
Canonical: https://obgulf.com/.well-known/security.txt
`;

function createCsp(nonce?: string) {
  const scriptPolicy = nonce
    ? `script-src 'nonce-${nonce}' 'strict-dynamic' 'self' https://challenges.cloudflare.com https://www.googletagmanager.com`
    : "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com";

  return [
    "default-src 'none'",
    "base-uri 'none'",
    "connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
    "font-src 'self' data:",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src https://challenges.cloudflare.com",
    "img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com",
    "manifest-src 'self'",
    "media-src 'self'",
    "object-src 'none'",
    scriptPolicy,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "upgrade-insecure-requests",
    "worker-src 'self' blob:",
  ].join("; ");
}

function isForbiddenHiddenPath(pathname: string) {
  let decodedPath: string;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return true;
  }

  if (decodedPath === SECURITY_TXT_PATH) return false;
  return decodedPath.split("/").some((segment) => segment.startsWith("."));
}

function withSecurityHeaders(response: Response, request?: Request) {
  const headers = new Headers(response.headers);
  const isHtml = /^text\/html(?:;|$)/i.test(headers.get("content-type") ?? "");
  const canRewriteHtml = isHtml && request?.method !== "HEAD" && typeof HTMLRewriter !== "undefined";
  const nonce = crypto.randomUUID().replaceAll("-", "");

  headers.set("Strict-Transport-Security", "max-age=31536000");
  if (isHtml) headers.set("Content-Security-Policy", createCsp(canRewriteHtml ? nonce : undefined));
  else headers.set("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; object-src 'none'");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-site");
  headers.set("Permissions-Policy", "browsing-topics=(), camera=(), geolocation=(), microphone=(), payment=(), usb=()");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");
  headers.set("X-XSS-Protection", "0");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.delete("content-length");

  const securedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });

  if (!canRewriteHtml) return securedResponse;

  return new HTMLRewriter()
    .on("script", {
      element(element) {
        element.setAttribute("nonce", nonce);
      },
    })
    .transform(securedResponse);
}

function canonicalRedirect(request: Request) {
  const url = new URL(request.url);
  const isPublicHost = url.hostname === CANONICAL_HOST || url.hostname === `www.${CANONICAL_HOST}`;

  if (!isPublicHost || (url.protocol === "https:" && url.hostname === CANONICAL_HOST)) return null;

  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  url.port = "";
  return withSecurityHeaders(Response.redirect(url.toString(), 308), request);
}

function withArabicLocale(request: Request) {
  const url = new URL(request.url);
  if (!/^\/ar(?:\/|$)/.test(url.pathname)) return request;

  url.pathname = url.pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  const headers = new Headers(request.headers);
  const cookies = (headers.get("cookie") ?? "")
    .split(";")
    .map((cookie) => cookie.trim())
    .filter((cookie) => cookie && !cookie.startsWith("obgulf-locale="));
  headers.set("cookie", [...cookies, "obgulf-locale=ar"].join("; "));
  return new Request(url, { method: request.method, headers, body: request.body, redirect: request.redirect });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const redirect = canonicalRedirect(request);
    if (redirect) return redirect;

    const requestUrl = new URL(request.url);
    if (isForbiddenHiddenPath(requestUrl.pathname)) {
      return withSecurityHeaders(new Response("Not found", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      }), request);
    }
    if (requestUrl.pathname === SECURITY_TXT_PATH || requestUrl.pathname === "/security.txt") {
      return withSecurityHeaders(new Response(SECURITY_TXT, {
        headers: {
          "Cache-Control": "public, max-age=3600",
          "Content-Type": "text/plain; charset=utf-8",
        },
      }), request);
    }

    const localizedRequest = withArabicLocale(request);
    const url = new URL(localizedRequest.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(localizedRequest, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, localizedRequest.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return withSecurityHeaders(response, request);
    }

    return withSecurityHeaders(await handler.fetch(localizedRequest, env, ctx), request);
  },
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(pruneExpiredCareerApplications(env));
  },
};

export default worker;
