import { routes } from "@/constants/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary/20 sm:text-9xl">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href={routes.HOME}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

