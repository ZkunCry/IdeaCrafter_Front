import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/src/providers/QueryClientProvider";
import { Toaster } from "@/src/components/ui/sonner";
import { AuthService } from "@/src/components/features/auth/api/authApi";
import StoreProvider from "@/src/providers/StoreProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "IdeaCrafter",
  description: "IdeaCrafter ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;
  try {
    user = await AuthService.identityMeServer();
  } catch (error) {
    console.log(error);
  }
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased `}>
        <div className="relative  min-h-screen flex flex-col items-center">
          <Providers>
            <StoreProvider initialUser={user}>{children}</StoreProvider>
            <Toaster position="bottom-right" />
          </Providers>
        </div>
      </body>
    </html>
  );
}
