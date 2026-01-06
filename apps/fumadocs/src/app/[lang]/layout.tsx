import { defineI18nUI } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import "../global.css";
import { Inter } from "next/font/google";
import { i18n } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
});

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: "English",
    },
    es: {
      displayName: "Español",
      search: "Buscar",
      searchNoResult: "Sin resultados",
      toc: "En esta página",
      lastUpdate: "Última actualización",
      chooseTheme: "Tema",
      nextPage: "Siguiente",
      previousPage: "Anterior",
    },
  },
});

export const metadata: Metadata = {
  title: "versend docs",
  description: "Documentation for versend.",
};

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const { lang } = await params;

  return (
    <html className={inter.className} lang={lang} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider i18n={provider(lang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
