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
  title: "Atharva Deosthale — Portfolio",
  description:
    "Developer • DevRel • Content Creator. I build things and share how.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Atharva Deosthale — Portfolio",
    description:
      "Developer • DevRel • Content Creator. I build things and share how.",
    url: "https://atharva.codes",
    siteName: "Atharva Deosthale",
    images: [{ url: "/pfp.jpeg", width: 1200, height: 630, alt: "Atharva" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Deosthale — Portfolio",
    description:
      "Developer • DevRel • Content Creator. I build things and share how.",
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
          defaultTheme="dark"
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
