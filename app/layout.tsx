import { Josefin_Sans } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: "Weather App",
  description: "Current weather, hourly and 5-day forecast for any city.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={josefin.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem("theme");
                  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  const shouldBeDark = saved === "dark" || (!saved && prefersDark);
                  if (shouldBeDark) {
                    document.documentElement.classList.add("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}