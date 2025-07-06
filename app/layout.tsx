import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import appData from "@/appData.ts";

const font = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const { metadata } = appData;

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
        <Background />
        {children}
      </body>
    </html>
  );
}
