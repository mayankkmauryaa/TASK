import type { Stack, Level, Package } from "./types";

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

let accessToken: string | null = null;

export function configureLogger(token: string): void {
  accessToken = token;
}

export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<string | null> {
  if (!accessToken) {
    console.warn("[logging-middleware] No access token configured. Call configureLogger(token) first.");
    return null;
  }

  try {
    const res = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    if (!res.ok) {
      console.error(`[logging-middleware] Log API responded with ${res.status}`);
      return null;
    }

    const body = await res.json();
    return body.logID as string;
  } catch (err) {
    console.error("[logging-middleware] Failed to send log:", err);
    return null;
  }
}
