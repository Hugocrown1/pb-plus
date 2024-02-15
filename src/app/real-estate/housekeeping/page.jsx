import React from "react";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "500" });
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <main
      className={`bg-[#f5f3f4] container-2xl pt-[40px] ${roboto.className}`}
    >
      <section className="flex flex-col pt-12 items-center ">
        <div className="relative w-full h-[320px] rounded-3xl overflow-hidden">
          <Image
            src={"/assets/housekeeping.jpg"}
            alt="housekeeping banner"
            fill={true}
            sizes="(min-width: 1120px) 1500px"
            className="object-cover object-left"
          />
        </div>
        <div className="flex flex-row gap-8 mt-2">
          <h1 className="text-[#0A100D] text-left text-[70px] leading-tight w-[50%]">
            Trusted Employees To Clean Your Home
          </h1>
          <div className="flex flex-col w-[50%]">
            <p className="text-[#5e5e5e] text-left font-medium text-lg ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
              voluptate sequi asperiores nemo possimus quod et quis, rerum
              reiciendis veritatis cum tempora
            </p>
            <Link
              href={"#properties"}
              className="px-4 py-3 mt-4 rounded-2xl font-medium text-lg w-[190px]   text-[#FCFFFC] transition-colors  bg-[#30725C] hover:bg-[#214d3e]  text-center"
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
