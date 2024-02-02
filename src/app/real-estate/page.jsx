import CustomPage from "@/components/CustomPage";
import Link from "next/link";
import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export default function Page() {
  return (
    <main className={`bg-[#f5f3f4] pt-[50px] ${roboto.className}`}>
      <section className="flex flex-row w-full p-12 ">
        <div className="flex flex-col text-left w-[45%]">
          <h1 className="text-[#0A100D] text-left text-[100px] leading-tight">
            PB+ REAL ESTATE
          </h1>
          <p className="text-[#5e5e5e] font-medium text-xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
            voluptate sequi asperiores nemo possimus quod et quis, rerum
            reiciendis veritatis cum tempora
          </p>
          <Link
            href={"/real-estate"}
            className="px-6 py-4 mt-4 rounded-[10px] font-medium text-lg w-[220px]   text-[#FCFFFC] transition-colors  bg-[#30725C] hover:bg-[#1f493b]  text-center"
          >
            Take a look
          </Link>
        </div>
        <div className="relative grid grid-cols-4 grid-rows-3 gap-4 w-[55%] h-[500px]">
          <div className="relative col-span-2 row-span-3 rounded-3xl overflow-hidden">
            <Image
              src={"/assets/house.jpg"}
              alt="real estate photo"
              fill={true}
              sizes="(min-width: 1120px) 1000px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative  row-span-3 rounded-3xl overflow-hidden">
            <Image
              src={"/assets/house2.webp"}
              alt="real estate photo"
              fill={true}
              sizes="(min-width: 1120px) 1000px"
              className="object-cover object-left"
            />
          </div>
          <div className="relative  row-span-3 rounded-3xl overflow-hidden">
            <Image
              src={"/assets/house3.jpg"}
              alt="real estate photo"
              fill={true}
              sizes="(min-width: 1120px) 1000px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
