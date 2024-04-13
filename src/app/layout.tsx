import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import Navbar from "./components/navbar"
import Background from "./components/background"
const inter = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nebula Staking",
  description: "Stake Dym",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{margin: 0}}>
        <Navbar />
        {children}</body>
    </html>
  );
}
