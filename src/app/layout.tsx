import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Databuddy } from "@databuddy/sdk/react";

const inter = Inter({ subsets: ["latin"] });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
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
        className={`${inter.className} ${display.variable} tracking-tight antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundGrid />
          {children}
        </ThemeProvider>
        <Databuddy clientId="e9581b81-6a5a-4dac-b71c-5e51d3314e85" />
      </body>
    </html>
  );
}
