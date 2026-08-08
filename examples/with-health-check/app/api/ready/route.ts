import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Readiness probe — confirms the app can serve traffic.
 *
 * Extend this function to check database connectivity, required environment
 * variables, or any dependency that must be available before traffic is routed
 * to this instance.
 *
 * Returns 200 when ready, 503 when not.
 *
 * GET /api/ready
 */
export async function GET(_req: NextRequest) {
  const checks = await runChecks();
  const allPassed = checks.every((c) => c.status === "ok");

  return Response.json(
    { status: allPassed ? "ready" : "not ready", checks },
    { status: allPassed ? 200 : 503 }
  );
}

interface Check {
  name: string;
  status: "ok" | "fail";
  detail?: string;
}

async function runChecks(): Promise<Check[]> {
  return [
    checkEnv("NODE_ENV"),
    // Add database / external-service checks here.
    // Example:
    //   await checkDatabase(),
  ];
}

function checkEnv(name: string): Check {
  return process.env[name] !== undefined
    ? { name, status: "ok" }
    : { name, status: "fail", detail: `${name} is not set` };
}
