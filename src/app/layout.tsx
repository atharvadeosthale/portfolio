import type { Metadata, Viewport } from "next";
import {
  Archivo,
  Bodoni_Moda,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { Databuddy } from "@databuddy/sdk/react";
import RevealObserver from "@/components/site/reveal-observer";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const serif = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  adjustFontFallback: false,
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Hello, I'm Atharva Deosthale. I code and create content about it for a living. Feel free to reach out to me on my socials or email!";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.atharva.codes"),
  title: "Atharva Deosthale — Portfolio",
  description,
  icons: { icon: "/icon.png" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Atharva Deosthale — Portfolio",
    description,
    url: "https://www.atharva.codes",
    siteName: "Atharva Deosthale",
    images: [
      {
        url: "/og.jpg",
        width: 2400,
        height: 1260,
        alt: "Atharva Deosthale, Developer Advocate at Appwrite",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Deosthale — Portfolio",
    description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f2efe9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Lets CSS hide reveal-on-scroll content only when JS is running */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${display.variable} ${serif.variable} ${mono.variable} font-sans antialiased min-h-screen`}
      >
        {children}
        <RevealObserver />
        <Databuddy clientId="e9581b81-6a5a-4dac-b71c-5e51d3314e85" />
      </body>
    </html>
  );
}
