"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center", fontFamily: "sans-serif" }}>
          <h1>Something went wrong</h1>
          <p>Please refresh the page. If the problem continues, contact us.</p>
          <button onClick={() => reset()} style={{ marginTop: 16, padding: "10px 20px" }}>
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
