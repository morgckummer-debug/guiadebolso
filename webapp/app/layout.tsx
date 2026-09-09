import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guia Digital do Obstetra",
  description: "Guia digital interativo para obstetras — Dra. Morgana Kummer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
