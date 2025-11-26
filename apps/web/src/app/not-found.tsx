import { Footer } from "@/components/core/footer";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-4">
      <h1 className="font-bold text-4xl">404 - Page Not Found</h1>
      <p className="text-center text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Footer />
    </main>
  );
}
