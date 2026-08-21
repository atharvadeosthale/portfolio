import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Databuddy } from "@databuddy/sdk/react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.atharva.codes"),
  title: "Atharva Deosthale — Portfolio",
  description:
    "Hello, I'm Atharva Deosthale. I code and create content about it for a living. Feel free to reach out to me on my socials or email!",
  icons: { icon: "/icon.png" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Atharva Deosthale — Portfolio",
    description:
      "Hello, I'm Atharva Deosthale. I code and create content about it for a living. Feel free to reach out to me on my socials or email!",
    url: "https://www.atharva.codes",
    siteName: "Atharva Deosthale",
    images: [{ url: "/pfp.jpeg", width: 1024, height: 1024, alt: "Atharva" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Deosthale — Portfolio",
    description:
      "Hello, I'm Atharva Deosthale. I code and create content about it for a living. Feel free to reach out to me on my socials or email!",
    images: ["/pfp.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Databuddy clientId="e9581b81-6a5a-4dac-b71c-5e51d3314e85" />
      </body>
    </html>
  );
}
