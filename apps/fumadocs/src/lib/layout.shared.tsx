import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookIcon } from "lucide-react";
import { i18n } from "@/lib/i18n";

export function baseOptions(_locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: "Versend",
    },
    githubUrl: "https://github.com/versend/core",
    links: [
      {
        icon: <BookIcon />,
        text: "Documentation",
        url: "/docs",
        secondary: false,
      },
    ],
  };
}
