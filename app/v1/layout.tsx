import type { Metadata } from "next";
import "./v1.css";

export const metadata: Metadata = {
  title: "Portfolio V1 — Old Version",
  description: "The old version of full-stack developer Tahseen Fathima's portfolio, preserved with its design and interactions.",
  alternates: { canonical: "/v1" },
};

export default function V1Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
