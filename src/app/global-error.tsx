"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "Georgia, serif", margin: 0, background: "#f8f7f4", color: "#141414" }}>
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "6rem 1.5rem", textAlign: "center" }}>
          <p style={{ letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 12, color: "#a67c2e" }}>
            Error
          </p>
          <h1 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>Something went wrong</h1>
          <p style={{ color: "#5c5c5c", marginBottom: "2rem" }}>
            The application hit an unexpected error. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#0c1a2e",
              color: "#fff",
              border: 0,
              padding: "0.75rem 1.5rem",
              cursor: "pointer",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: 12,
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
