import type { Metadata } from "next";
import { Inter, Lora, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "@repo/ui/styles/global.css";
import { Providers } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fontStory = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StoryTree",
  description:
    "A collaborative storytelling platform where one prompt inspires hundreds of unique stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontStory.variable} ${fontDisplay.variable} ${fontMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
