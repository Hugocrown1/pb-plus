import React from "react";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "500" });
import Link from "next/link";
import Image from "next/image";

const page = () => {
  //TODO: formatear imagenes a webp
  return (
    <main className={`bg-[#f5f3f4]  pt-[40px] ${roboto.className}`}>
      <section className="flex flex-col pt-12 items-center container-2xl mb-12 ">
        <div className="relative w-full h-[320px] rounded-3xl overflow-hidden">
          <Image
            src={"/assets/homemanagement.jpeg"}
            alt="housekeeping banner"
            fill={true}
            sizes="(min-width: 1120px) 1500px"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-row  w-full gap-12 mt-2">
          <h1 className="text-[#0A100D] text-left text-[70px] leading-tight w-[50%]  ">
            Home Management
          </h1>
          <div className="flex flex-col ">
            <p className="text-[#5e5e5e] text-left font-medium text-lg ">
              Don't stress about water, your tank, power bills, internet, or
              anything else. Simply show us how you want your home to run, and
              leave the rest to us. We'll take care of everything else.
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
        <div className="flex flex-row py-[50px] justify-between max-w-[1280px]  mx-auto px-2">
          <div className="flex flex-col  text-left w-[482px]">
            <h2 className="font-bold text-[48px] text-left">
              Teach Us How To Run Your Home
            </h2>
            <div className="bg-[#30725C] w-[100px] h-1 rounded-xl mb-3"></div>
            <p className="text-lg">
              Relax and put your mind at ease when it comes to managing your
              home. Instead of worrying about water, your tank, power bills,
              internet, and all those little details, simply show us how you
              want your home to function, and leave the rest to us. Our
              dedicated team is here to handle every aspect of home management,
              ensuring that everything runs smoothly according to your
              preferences. With us taking care of the day-to-day tasks, you can
              enjoy peace of mind and focus on what truly matters to you.
            </p>
          </div>
          <div className="grid grid-cols-2 grid-rows-2  w-[600px] h-[500px] gap-2">
            <div className="row-span-2 relative rounded-xl overflow-hidden shadow-md">
              <Image
                src={"/assets/homemanagement3.jpg"}
                fill={true}
                alt="service photo"
                sizes="(min-width: 1120px) 800px"
                className="object-cover object-center"
              />
            </div>
            <div className=" relative rounded-xl overflow-hidden shadow-md">
              <Image
                src={"/assets/homemanagement2.jpg"}
                fill={true}
                alt="service photo"
                sizes="(min-width: 1120px) 500px"
                className="object-cover object-center"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src={"/assets/homemanagement1.jpg"}
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
