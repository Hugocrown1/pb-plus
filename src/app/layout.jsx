import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "./providers";
import Footer from "@/components/Footer";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export const metadata = {
  title: "PB+",
  description: "PB Plus website",
};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth " lang="en">
      <body className={` bg-[#f5f3f4] ${roboto.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
