import { RootProvider } from "fumadocs-ui/provider/next";

import "./global.css";
import { Inter } from "next/font/google";

import { SearchHighlight } from "./search-highlight";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  description: "Vercel events delivered to Discord or Telegram.",
  title: "Versend",
};

const Layout = ({ children }: LayoutProps<"/">) => (
  <html lang="en" className={inter.className} suppressHydrationWarning>
    <body className="flex min-h-screen flex-col">
      <SearchHighlight />
      <RootProvider>{children}</RootProvider>
    </body>
  </html>
);

export default Layout;
