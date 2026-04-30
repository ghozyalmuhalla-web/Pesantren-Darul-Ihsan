import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Madrasah Aliyah Swasta (MAS) Pesantren Modern Darul Ihsan",
  description: "Membentuk Generasi Qur’ani, Berwawasan Global, dan Berakhlakul Karimah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${notoSerif.variable} bg-background text-on-surface font-body-md selection:bg-secondary-fixed antialiased`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
