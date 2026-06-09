import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Constructora Vidal Ltda. — La Araucanía, Chile",
  icons: { icon: "/cv-favicon.png", shortcut: "/cv-favicon.png", apple: "/cv-favicon.png" },
  description:
    "Empresa constructora con más de 10 años de experiencia en La Araucanía. Construcción, remodelaciones, instalaciones eléctricas y proyectos de infraestructura.",
  keywords: [
    "constructora",
    "construcción",
    "La Araucanía",
    "Chile",
    "remodelaciones",
    "instalaciones eléctricas",
    "obras",
  ],
  openGraph: {
    title: "Constructora Vidal Ltda.",
    description: "Construimos con calidad y compromiso en La Araucanía.",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
