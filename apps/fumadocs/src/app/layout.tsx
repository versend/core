import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "versend docs",
  description: "Documentation for versend.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
