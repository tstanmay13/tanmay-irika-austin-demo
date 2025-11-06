import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Austin Skyline Panorama | Tanmay & Irika",
  description: "360-degree panoramic view of Austin skyline from Auditorium Shores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
