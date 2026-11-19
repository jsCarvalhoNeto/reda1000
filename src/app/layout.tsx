import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redação 1000 — Análise Crítica Padrão ENEM",
  description:
    "Sistema inteligente de análise e correção pedagógica de redações ENEM a partir de imagens e PDFs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
