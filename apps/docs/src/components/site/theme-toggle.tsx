"use client";

import { useTheme } from "fumadocs-ui/provider/base";
import { MoonIcon, SunIcon } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";

/**
 * Light/dark toggle. Both icons are rendered and swapped with CSS so the
 * server and client markup match regardless of the active theme.
 *
 * @param props - Optional class name.
 * @returns The toggle button.
 */
export const ThemeToggle = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <IconButton
      className={className}
      label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </IconButton>
  );
};
