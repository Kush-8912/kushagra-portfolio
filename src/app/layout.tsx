import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kushagra Aggarwal",
  description: "19-year-old builder from Delhi, studying CS & AI at Scaler School of Technology.",
};

export const viewport: Viewport = {
  themeColor: "#050507",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";
  const bg = theme === "light" ? "#f6f6f8" : "#050507";
  const fg = theme === "light" ? "#0c0c10" : "#f4f4f5";

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      data-theme={theme === "light" ? "light" : undefined}
      style={{ backgroundColor: bg }}
    >
      <body className="min-h-full bg-bg text-fg" style={{ backgroundColor: bg, color: fg }}>
        <div className="noise-overlay" />
        <CustomCursor />
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
