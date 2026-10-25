// Shared PayPal REST API helpers for the create/capture functions. The
// leading underscore on this directory keeps Netlify from treating it as a
// function of its own.

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const resolveApiBase = (env: string): string => {
  if (env === "sandbox") return "https://api-m.sandbox.paypal.com";
  if (env === "live") return "https://api-m.paypal.com";
  throw new Error(`Invalid PAYPAL_ENV "${env}". Expected "sandbox" or "live".`);
};

// Read once, at module load, so a missing/misconfigured credential fails the
// function's cold start immediately instead of surfacing later as a mystery
// runtime error on the first real request.
const PAYPAL_CLIENT_ID = requireEnv("PAYPAL_CLIENT_ID");
const PAYPAL_SECRET = requireEnv("PAYPAL_SECRET");
const PAYPAL_API_BASE = resolveApiBase(requireEnv("PAYPAL_ENV"));

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.accessToken;
  }

  const basicAuth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(`PayPal OAuth token request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  // Refresh a little early so a warm invocation never races a token that's
  // about to expire mid-request.
  cachedToken = {
    accessToken: data.access_token,
    expiresAt: now + (data.expires_in - 60) * 1000,
  };
  return cachedToken.accessToken;
}

export class PayPalApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown) {
    super(`PayPal API request failed with status ${status}`);
    this.name = "PayPalApiError";
    this.status = status;
    this.body = body;
  }
}

export async function paypalRequest<T>(
  path: string,
  init: { method: "GET" | "POST"; body?: unknown; headers?: Record<string, string> }
): Promise<T> {
  const accessToken = await getAccessToken();
  const response = await fetch(`${PAYPAL_API_BASE}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new PayPalApiError(response.status, body);
  }

  return body as T;
}

export interface PayPalOrderItem {
  name: string;
  sku: string;
  quantity: string;
  unit_amount: { currency_code: string; value: string };
  category?: string;
}

export interface PayPalOrder {
  id: string;
  status: string;
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    items?: PayPalOrderItem[];
  }>;
}

export function jsonResponse(
  status: number,
  body: unknown,
  extraHeaders?: Record<string, string>
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}
