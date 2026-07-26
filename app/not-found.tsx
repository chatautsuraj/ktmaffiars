import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-editorial flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="font-display text-display-lg text-ink">Story not filed.</h1>
      <p className="mt-4 max-w-md text-ink/60">
        The page you&apos;re looking for doesn&apos;t exist, has moved, or has been archived.
      </p>
      <Button variant="gold" size="lg" className="mt-8" asChild>
        <Link href="/">Return to the Front Page</Link>
      </Button>
    </div>
  );
}
