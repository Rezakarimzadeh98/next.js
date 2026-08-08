export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Health Check Example</h1>
      <p>This app exposes two probe endpoints for container orchestrators:</p>
      <ul>
        <li>
          <a href="/api/health">
            <code>/api/health</code>
          </a>{" "}
          — liveness probe (process is alive)
        </li>
        <li>
          <a href="/api/ready">
            <code>/api/ready</code>
          </a>{" "}
          — readiness probe (app can serve traffic)
        </li>
      </ul>
    </main>
  );
}
