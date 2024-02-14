import React from "react";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "500" });
import Link from "next/link";
import Image from "next/image";
import PropertiesDisplay from "@/components/PropertiesDisplay";

const page = () => {
  return (
    <main className={`bg-[#f5f3f4] container-xl pt-[50px] ${roboto.className}`}>
      <section className="flex flex-col pt-12 items-center">
        <h1 className="text-[#0A100D] text-center text-[90px] leading-tight">
          The Best Houses & Properties Just For You
        </h1>
        <p className="text-[#5e5e5e] text-center font-medium text-lg w-[900px]">
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
        <div className="grid grid-cols-4 w-full h-[350px] my-5">
          <div className="flex items-end">
            <div className="relative w-[300px] h-[300px] rounded-3xl overflow-hidden">
              <Image
                src={"/assets/house.jpg"}
                alt="real estate photo"
                fill={true}
                sizes="(min-width: 1120px) 500px"
                className="object-cover object-left "
              />
            </div>
          </div>
          <div className="flex items-start">
            <div className="relative w-[300px] h-[300px] rounded-3xl overflow-hidden">
              <Image
                src={"/assets/house2.webp"}
                alt="real estate photo"
                fill={true}
                sizes="(min-width: 1120px) 500px"
                className="object-cover object-left"
              />
            </div>
          </div>
          <div className="flex items-end">
            <div className="relative w-[300px] h-[300px] rounded-3xl overflow-hidden">
              <Image
                src={"/assets/house3.jpg"}
                alt="real estate photo"
                fill={true}
                sizes="(min-width: 1120px) 500px"
                className="object-cover object-left"
              />
            </div>
          </div>
          <div className="flex items-start">
            <div className="relative w-[300px] h-[300px] rounded-3xl overflow-hidden">
              <Image
                src={"/assets/house4.png"}
                alt="real estate photo"
                fill={true}
                sizes="(min-width: 1120px) 500px"
                className="object-cover object-left"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="properties"
        className="flex flex-col items-center pt-12 mb-8 text-center"
      >
        <h1>We Help You Make Better Deals</h1>
        <p className="text-[#5e5e5e] text-center font-medium text-lg w-[900px] mb-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
          voluptate sequi asperiores nemo possimus quod et quis, rerum
          reiciendis veritatis cum tempora
        </p>
        <PropertiesDisplay />
      </section>
    </main>
  );
};

export default page;
