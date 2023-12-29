import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PB+",
  description: "PB Plus website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`overflow-hidden bg-[#f5f3f4] ${inter.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
