import { createPolar } from "@polar-sh/sdk/2026-10";

/**
 * Returns a configured Polar SDK client for the sandbox environment.
 * Secrets are strictly read on the server.
 */
export function getPolarClient() {
  const token = process.env.POLAR_ACCESS_TOKEN;
  if (!token) {
    throw new Error("POLAR_ACCESS_TOKEN is not configured in .env.local");
  }

  return createPolar({
    accessToken: token,
    environment: "sandbox",
    server: "sandbox",
  });
}
