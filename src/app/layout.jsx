import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "PB+",
  description: "PB Plus website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-[#f5f3f4] ${roboto.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
