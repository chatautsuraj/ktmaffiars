"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
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
    <div className="container mx-auto px-4 py-24 text-center">
      <p className="text-gold text-sm uppercase tracking-widest mb-4">Error</p>
      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Something went wrong</h1>
      <p className="text-muted max-w-md mx-auto mb-10">
        An unexpected error occurred while loading this page. You can try again or return home.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button type="button" variant="gold" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
