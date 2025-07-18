import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner"

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Itaú Banking",
  description: "Case Técnico Itaú Banking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth bg-white">
      <body
        className={`${roboto.variable} ${roboto.variable} antialiased bg-white`}
      >
      <Providers>
        <Header />
        {children}
      </Providers>
      <Toaster />
      </body>
    </html>
  );
}
