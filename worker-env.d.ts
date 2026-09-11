interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(columnName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<T>;
  all<T = unknown>(): Promise<T>;
  raw<T = unknown>(): Promise<T[]>;
}

interface D1ExecResult {
  count: number;
  duration: number;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<T[]>;
  exec(query: string): Promise<D1ExecResult>;
  dump(): Promise<ArrayBuffer>;
}

interface R2ObjectBody {
  body: ReadableStream;
  size: number;
  httpEtag: string;
}

interface R2Bucket {
  get(key: string): Promise<R2ObjectBody | null>;
  put(
    key: string,
    value: ArrayBuffer | ArrayBufferView | ReadableStream | string | null,
    options?: {
      httpMetadata?: { contentType?: string; contentDisposition?: string };
      customMetadata?: Record<string, string>;
    },
  ): Promise<unknown>;
  delete(key: string): Promise<void>;
}

declare module "cloudflare:workers" {
  export const env: {
    DB?: D1Database;
    RESUMES?: R2Bucket;
    TURNSTILE_SITE_KEY?: string;
    TURNSTILE_SECRET_KEY?: string;
    ENQUIRY_WEBHOOK_URL?: string;
    ENQUIRY_WEBHOOK_SECRET?: string;
    IP_HASH_SALT?: string;
    [key: string]: unknown;
  };
}
