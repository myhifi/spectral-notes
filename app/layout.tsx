import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spectral Notes | Haunted Productivity",
  description: "A spooky, minimalist note-taking app built for Kiroween 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}