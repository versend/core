import { CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/core/footer";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Status indicator */}
        <div className="flex items-center gap-2 text-emerald-500">
          <CheckCircle2 className="size-5" />
          <span className="font-medium text-sm">Running</span>
        </div>

        {/* Title */}
        <h1 className="font-bold font-mono text-5xl tracking-tighter">
          vercord
        </h1>

        {/* Description */}
        <p className="max-w-sm text-muted-foreground">
          Webhook relay active. Configure Vercel to send events to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground text-xs">
            /api/hook
          </code>
        </p>

        {/* Links */}
        <div className="flex items-center gap-4 pt-2 text-sm">
          <Link
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            href="https://docs.vercord.lol"
            rel="noopener noreferrer"
            target="_blank"
          >
            Docs
            <ExternalLink className="size-3.5" />
          </Link>
          <span className="text-border">•</span>
          <Link
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            href="https://github.com/vercord/core"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
