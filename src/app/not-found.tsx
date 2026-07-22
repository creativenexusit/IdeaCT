import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-background">
      <p className="text-primary font-semibold">404</p>
      <h1 className="text-2xl font-semibold text-text-primary mt-2">Page not found</h1>
      <p className="text-text-secondary mt-2 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Button href="/en" className="mt-6">
        Back to Home
      </Button>
      <Link href="/bn" className="mt-3 text-sm text-text-secondary">
        বাংলা হোমপেজে যান
      </Link>
    </div>
  );
}
