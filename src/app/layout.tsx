import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://katanarescue.cikampek.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KATANA RESCUE - Tim SAR & Relawan Penanggulangan Bencana Cikampek",
    template: "%s | KATANA RESCUE",
  },
  description:
    "Portal Resmi Tim SAR dan Relawan Penanggulangan Bencana Kecamatan Cikampek. Siaga. Tanggap. Menyelamatkan. Pelayanan pencarian, pertolongan, evakuasi, dan penanggulangan bencana.",
  keywords: [
    "Katana Rescue",
    "SAR Cikampek",
    "Tim SAR",
    "Relawan Bencana",
    "Penanggulangan Bencana",
    "Search and Rescue",
    "Evakuasi",
    "Cikampek",
    "Karawang",
    "Water Rescue",
    "Vertical Rescue",
    "Drone SAR",
    "Relawan Kemanusiaan",
  ],
  authors: [{ name: "Katana Rescue Cikampek" }],
  creator: "Katana Rescue",
  publisher: "Katana Rescue Cikampek",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/katana-logo.png",
    apple: "/images/katana-logo.png",
  },
  openGraph: {
    title: "KATANA RESCUE - Siaga. Tanggap. Menyelamatkan.",
    description:
      "Portal Resmi Tim SAR dan Relawan Penanggulangan Bencana Kecamatan Cikampek. Pelayanan pencarian, pertolongan, evakuasi, dan penanggulangan bencana.",
    url: SITE_URL,
    siteName: "KATANA RESCUE",
    images: [
      {
        url: "/images/hero-rescue.png",
        width: 1344,
        height: 768,
        alt: "Tim SAR Katana Rescue melakukan evakuasi",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KATANA RESCUE - Tim SAR & Relawan Cikampek",
    description:
      "Portal Resmi Tim SAR dan Relawan Penanggulangan Bencana Kecamatan Cikampek.",
    images: ["/images/hero-rescue.png"],
  },
  manifest: "/manifest.json",
  category: "emergency",
};

export const viewport: Viewport = {
  themeColor: "#FF6B00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "KATANA RESCUE",
  alternateName: "Tim SAR Katana Rescue Cikampek",
  url: SITE_URL,
  logo: `${SITE_URL}/images/katana-logo.png`,
  image: `${SITE_URL}/images/hero-rescue.png`,
  description:
    "Tim SAR dan relawan kemanusiaan yang berkomitmen memberikan pelayanan pencarian, pertolongan, evakuasi, serta penanggulangan bencana di wilayah Kecamatan Cikampek dan sekitarnya.",
  slogan: "Siaga. Tanggap. Menyelamatkan.",
  foundingDate: "2018",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Kecamatan Cikampek, Kabupaten Karawang, Jawa Barat",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Raya Cikampek No. 1",
    addressLocality: "Cikampek",
    addressRegion: "Jawa Barat",
    postalCode: "41373",
    addressCountry: "ID",
  },
  telephone: "+62-812-3456-7890",
  email: "info@katanarescue.cikampek.id",
  sameAs: [
    "https://instagram.com/katanarescue",
    "https://facebook.com/katanarescue",
    "https://youtube.com/@katanarescue",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="top-right" />
      </body>
    </html>
  );
}
