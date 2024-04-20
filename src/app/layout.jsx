import { Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import RouteTracker from "@/components/RouteTracker";
import { Toaster } from "sonner";
import { auth } from "./api/auth/[...nextauth]/route";

const roboto = Libre_Baskerville({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "PB+",
  description: "PB Plus website",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html className="scroll-smooth " lang="en">
      <body className={`bg-[#f5f3f4] ${roboto.className}`}>
        <Providers>
          <Header session={session} />
          {children}
          <Footer />
          <RouteTracker />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
