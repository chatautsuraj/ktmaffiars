import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReadingListProvider } from "@/components/providers/reading-list-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { SiteChrome } from "@/components/layout/site-chrome";
import { cormorant, sourceSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ktmaffairs.com"),
  title: {
    default: "KTM Affairs — Where Nepal Meets the World",
    template: "%s | KTM Affairs",
  },
  description:
    "Premium international affairs journalism covering diplomacy, geopolitics, foreign policy, and global economy. Where Nepal meets the world.",
  keywords: [
    "international affairs",
    "diplomacy",
    "geopolitics",
    "Nepal",
    "foreign policy",
    "global economy",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KTM Affairs",
    title: "KTM Affairs — Where Nepal Meets the World",
    description: "Premium international affairs journalism from Kathmandu and beyond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KTM Affairs",
    description: "Where Nepal Meets the World.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${sourceSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ToastProvider>
            <ReadingListProvider>
              <SiteChrome>{children}</SiteChrome>
            </ReadingListProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
