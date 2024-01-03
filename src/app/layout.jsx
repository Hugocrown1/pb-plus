import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "./providers";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "PB+",
  description: "PB Plus website",
};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={` bg-[#f5f3f4] ${roboto.className}`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
