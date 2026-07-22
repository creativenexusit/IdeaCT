"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this should report to a real error-tracking service
    // (Sentry, etc.) — logging is the honest placeholder for that here.
    console.error("[app error boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-background">
      <p className="text-primary font-semibold">Something went wrong</p>
      <h1 className="text-2xl font-semibold text-text-primary mt-2">
        We hit an unexpected error
      </h1>
      <p className="text-text-secondary mt-2 max-w-md">
        Please try again. If the problem continues, contact us and we'll look into it.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button href="/en" variant="outline">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
