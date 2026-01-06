import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { i18n } from "@/lib/i18n";

const translations = {
  en: {
    tagline:
      "A webhook relay. Vercel sends deployment events, Versend forwards them wherever you want. That's it.",
    cta: "Read the docs",
    source: "Source",
    fast: "Fast",
    fastDesc: "Events hit your channels within seconds of Vercel firing them",
    detailed: "Detailed",
    detailedDesc: "Branch, commit, status, links — all in the message",
    multiProvider: "Multi-provider",
    multiProviderDesc: "Send to one platform or many — your choice",
    footer:
      "This isn't a platform or a service. It's a simple relay that sits between Vercel and your notification channels. Self-host it, fork it, forget about it.",
  },
  es: {
    tagline:
      "Un relay de webhooks. Vercel envía eventos de despliegue, Versend los reenvía donde quieras. Eso es todo.",
    cta: "Leer la documentación",
    source: "Código",
    fast: "Rápido",
    fastDesc:
      "Los eventos llegan a tus canales en segundos desde que Vercel los dispara",
    detailed: "Detallado",
    detailedDesc: "Rama, commit, estado, enlaces — todo en el mensaje",
    multiProvider: "Multi-proveedor",
    multiProviderDesc: "Envía a una plataforma o a varias — tú eliges",
    footer:
      "Esto no es una plataforma ni un servicio. Es un simple relay entre Vercel y tus canales de notificación. Despliégalo, haz fork, olvídate de él.",
  },
} as const;

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations] ?? translations.en;

  // With hideLocale: 'default-locale', English has no prefix
  const prefix = lang === i18n.defaultLanguage ? "" : `/${lang}`;

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-20">
      <StripedPattern className="mask-[radial-gradient(350px_circle_at_center,white,transparent)] text-muted-foreground/20" />

      <div className="relative flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="font-bold font-mono text-7xl tracking-tighter sm:text-8xl">
          <span className="bg-linear-to-b from-fd-foreground to-fd-muted-foreground bg-clip-text text-transparent">
            versend
          </span>
        </h1>

        <p className="max-w-lg text-fd-muted-foreground text-xl">{t.tagline}</p>

        <div className="flex items-center gap-3 pt-4">
          <Link
            className="group inline-flex items-center gap-2 rounded-full bg-fd-foreground px-6 py-3 font-medium text-fd-background transition-all hover:gap-3"
            href={`${prefix}/docs`}
          >
            {t.cta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-fd-border px-6 py-3 font-medium transition-colors hover:bg-fd-muted"
            href="https://github.com/versend/core"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="size-4" />
            {t.source}
          </Link>
        </div>

        <div className="mt-16 grid w-full gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-3">
          <Card desc={t.fastDesc} title={t.fast} />
          <Card desc={t.detailedDesc} title={t.detailed} />
          <Card desc={t.multiProviderDesc} title={t.multiProvider} />
        </div>

        <p className="mt-8 max-w-md text-fd-muted-foreground/60 text-sm">
          {t.footer}
        </p>
      </div>
    </main>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-fd-background p-6">
      <h3 className="font-semibold text-fd-foreground">{title}</h3>
      <p className="mt-1 text-fd-muted-foreground text-sm">{desc}</p>
    </div>
  );
}
