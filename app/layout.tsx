import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

const font = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jakub Korytko",
  description:
    "Portfolio of Jakub Korytko, Software Engineer specializing in JavaScript, TypeScript, and React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicons/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Jakub Korytko" />
      </head>
      <body className={`${font.className} ${font.variable} antialiased`}>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
