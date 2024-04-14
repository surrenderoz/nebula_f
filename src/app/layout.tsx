import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import Navbar from "./components/navbar"
import Background from "./components/background"
const inter = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nebula Staking",
  description: "Liquid Staking Rollapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <html lang="en">
      <body className={inter.className} style={{margin: 0, fontFamily: '__Lexend_Deca_e53e8d'}} >
        <Navbar />
        {children}
        </body>
    </html>
  );
}
