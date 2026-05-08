import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "منظمة مجموعات التحفيز",
    template: "%s | منظمة مجموعات التحفيز",
  },
  description:
    "منظمة مجموعات التحفيز هي منظمة أوروبية غير هادفة للربح NPO ومقرها إيستونيا ومسجلة رسمياً برقم 80618910",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`}>
      <body className="min-h-screen font-[family-name:var(--font-cairo)]">
        {children}
      </body>
    </html>
  );
}
