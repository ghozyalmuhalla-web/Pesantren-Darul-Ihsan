import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import Shell from "@/components/Shell";
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
  title: {
    default: "MAS Pesantren Modern Darul Ihsan",
    template: "%s | MAS Darul Ihsan"
  },
  description: "Lembaga pendidikan Islam modern di Deli Serdang. Membentuk Generasi Qur'ani, Berwawasan Global, dan Berakhlakul Karimah.",
  keywords: ["Pesantren Darul Ihsan", "MAS Darul Ihsan", "Pondok Pesantren Deli Serdang", "PPDB Pesantren 2025", "Sekolah Islam Modern"],
  authors: [{ name: "IT Darul Ihsan" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://darulihsan.sch.id",
    siteName: "MAS Pesantren Modern Darul Ihsan",
    title: "MAS Pesantren Modern Darul Ihsan - Membentuk Generasi Qur'ani",
    description: "Pendaftaran Santri Baru Tahun Ajaran 2025/2026 telah dibuka. Bergabunglah bersama kami!",
    images: [{
      url: "/images/hero-main.png",
      width: 1200,
      height: 630,
      alt: "Pesantren Modern Darul Ihsan"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "MAS Pesantren Modern Darul Ihsan",
    description: "Membentuk Generasi Qur'ani, Berwawasan Global, dan Berakhlakul Karimah.",
    images: ["/images/hero-main.png"]
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  }
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
        <Shell>
          {children}
        </Shell>
      </body>
    </html>
  );
}

