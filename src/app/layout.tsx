import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PELORA | Marine Intelligence & Multi-Agent AI Platform",
  description: "Next-generation marine intelligence, geospatial decision-support and collaborative multi-agent AI platform for ocean operations, fisheries, marine health & disaster management.",
  keywords: ["marine intelligence", "geospatial AI", "ocean forecasting", "potential fishing zones", "maritime safety", "multi-agent AI"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full bg-[#06131A] text-[#EAF6F7] antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css"
        />
      </head>
      <body className="min-h-screen bg-[#06131A] text-[#EAF6F7] selection:bg-[#39D6D0] selection:text-[#06131A] font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
