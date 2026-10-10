import { RootProvider } from "fumadocs-ui/provider/next";

import "./global.css";
import { Inter } from "next/font/google";
import { SearchHighlight } from "./search-highlight";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Versend",
  description:
    "Vercel events delivered to Discord, Telegram, or any HTTP endpoint.",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <SearchHighlight />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
