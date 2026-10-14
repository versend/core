import { RootProvider } from "fumadocs-ui/provider/next";

import "./global.css";
import { Geist_Mono, Inter } from "next/font/google";

import { appName } from "@/lib/shared";

import { SearchHighlight } from "./search-highlight";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-family",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-family",
});

export const metadata = {
  description: "Vercel events delivered to the destinations you configure.",
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
};

const Layout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="en"
    className={`${inter.variable} ${geistMono.variable} font-sans`}
    suppressHydrationWarning
  >
    <body className="flex min-h-screen flex-col antialiased">
      <SearchHighlight />
      <RootProvider
        theme={{
          attribute: "class",
          disableTransitionOnChange: true,
          enableSystem: true,
        }}
      >
        {children}
      </RootProvider>
    </body>
  </html>
);

export default Layout;
