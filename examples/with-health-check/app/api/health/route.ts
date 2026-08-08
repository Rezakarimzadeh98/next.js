import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Liveness probe — confirms the process is alive.
 *
 * Returns 200 immediately. Kubernetes (or any orchestrator) marks the pod
 * unhealthy and restarts it if this endpoint fails.
 *
 * GET /api/health
 */
export function GET(_req: NextRequest) {
  return Response.json({ status: "ok", timestamp: Date.now() });
}
