import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/src/providers/QueryClientProvider";
import { Toaster } from "@/src/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "IdeaCrafter",
  description: "IdeaCrafter ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased `}>
        <div className="relative  min-h-screen flex flex-col items-center">
          <Providers>
            {children}
            <Toaster position="bottom-right" />
          </Providers>
        </div>
      </body>
    </html>
  );
}
