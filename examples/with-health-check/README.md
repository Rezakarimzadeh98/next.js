# Next.js Health Check Example

This example shows how to add **liveness** and **readiness** probe endpoints to a Next.js application — a common requirement when deploying to Kubernetes, AWS ECS, Google Cloud Run, or any container orchestrator.

## Endpoints

| Endpoint | Probe type | Purpose |
|---|---|---|
| `GET /api/health` | Liveness | Confirms the process is running. Orchestrators restart the container if this fails. |
| `GET /api/ready` | Readiness | Confirms the app is ready to receive traffic. Orchestrators stop sending requests until this passes. |

Both routes use the [Edge Runtime](https://nextjs.org/docs/app/api-reference/edge) for minimal cold-start latency.

## Liveness response

```json
{ "status": "ok", "timestamp": 1700000000000 }
```

## Readiness response (all checks pass)

```json
{
  "status": "ready",
  "checks": [
    { "name": "NODE_ENV", "status": "ok" }
  ]
}
```

## Readiness response (a check fails) — HTTP 503

```json
{
  "status": "not ready",
  "checks": [
    { "name": "DATABASE", "status": "fail", "detail": "DATABASE is not set" }
  ]
}
```

## Extending the readiness probe

Open `app/api/ready/route.ts` and add your own checks inside `runChecks()`:

```ts
async function runChecks(): Promise<Check[]> {
  return [
    checkEnv("NODE_ENV"),
    await checkDatabase(),      // your custom check
    await checkExternalAPI(),   // another check
  ];
}
```

## Kubernetes probe configuration

```yaml
livenessProbe:
  httpGet:
    path: /api/health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /api/ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
```

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-health-check&project-name=with-health-check&repository-name=with-health-check)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), [pnpm](https://pnpm.io), or [Bun](https://bun.sh) to bootstrap the example:

```bash
npx create-next-app --example with-health-check with-health-check-app
```

```bash
yarn create next-app --example with-health-check with-health-check-app
```

```bash
pnpm create next-app --example with-health-check with-health-check-app
```

```bash
bunx create-next-app --example with-health-check with-health-check-app
```
