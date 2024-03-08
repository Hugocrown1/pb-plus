import React from "react";
import { Libre_Baskerville, Roboto } from "next/font/google";
const roboto = Libre_Baskerville({ subsets: ["latin"], weight: "400" });
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <main className={`bg-[#f5f3f4]  pt-[40px] ${roboto.className}`}>
      <section className="flex flex-col pt-12 items-center container-2xl mb-12 ">
        <div className="relative w-full h-[320px] rounded-3xl overflow-hidden">
          <Image
            src={"/assets/assessment1.webp"}
            alt="housekeeping banner"
            fill={true}
            sizes="(min-width: 1120px) 1500px"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-center min-[1130px]:flex-row  w-full min-[1130px]:gap-12 mt-2">
          <h1 className="text-[#0A100D] text-center min-[1130px]:text-left text-[40px] min-[480px]:text-[70px] leading-tight w-full min-[1130px]:w-[50%]  ">
            Assessment Services
          </h1>
          <div className="flex flex-col items-center min-[1130px]:items-start ">
            <p className="text-[#5e5e5e] text-center min-[1130px]:text-left font-medium text-lg ">
              Understanding the increase in value that your property experiences
              after improvements or over a few years following its purchase is
              essential if you are considering selling your land or house.
            </p>
            <Link
              href={"#pricing"}
              className="px-4 py-3 mt-4 rounded-2xl font-medium text-lg w-[190px]   text-[#FCFFFC] transition-colors  bg-[#30725C] hover:bg-[#214d3e]  text-center"
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>
      <section id="pricing" className=" bg-gray-200 ">
        <div className="flex flex-col min-[1130px]:flex-row py-[50px] items-center gap-4 justify-center min-[1130px]:justify-between max-w-[1280px]  mx-auto px-2">
          <div className="flex flex-col items-center min-[1130px]:items-start text-center min-[1130px]:text-left w-[100%] min-[1130px]:w-[482px]">
            <h2 className="font-bold text-[32px] min-[1130px]:text-[48px] text-center min-[1130px]:text-left">
              How Much Value Your Property Gained!
            </h2>
            <div className="bg-[#30725C] w-[100px] h-1 rounded-xl mb-3"></div>
            <p className="text-lg">
              Understanding the increase in value that your property experiences
              after improvements or over a few years following its purchase is
              essential if you are considering selling your land or house.
              Assessing the appreciation of your property enables you to make
              informed decisions regarding potential sales and investments in
              real estate.
            </p>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 w-[90%]  aspect-square min-[1130px]:w-[600px] min-[1130px]:h-[500px] gap-2">
            <div className="row-span-2 relative rounded-xl overflow-hidden shadow-md">
              <Image
                src={"/assets/assessment2.webp"}
                fill={true}
                alt="service photo"
                sizes="(min-width: 1120px) 800px"
                className="object-cover object-center"
              />
            </div>
            <div className=" relative rounded-xl overflow-hidden shadow-md">
              <Image
                src={"/assets/assessment.webp"}
                fill={true}
                alt="service photo"
                sizes="(min-width: 1120px) 500px"
                className="object-cover object-center"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src={"/assets/assessment3.webp"}
                fill={true}
                alt="service photo"
                sizes="(min-width: 1120px) 500px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
