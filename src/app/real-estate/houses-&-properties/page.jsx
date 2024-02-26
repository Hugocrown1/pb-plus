import React from "react";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "500" });
import Link from "next/link";
import Image from "next/image";
import PropertiesDisplay from "@/components/PropertiesDisplay";

const page = () => {
  return (
    <main className={`bg-[#f5f3f4] pt-[50px] ${roboto.className}`}>
      <section className="flex flex-col pt-12 items-center  container-xl">
        <h1 className="text-[#0A100D] text-center xl:text-[90px] text-[38px] leading-tight">
          The Best Houses & Properties Just For You
        </h1>
        <p className="text-[#5e5e5e] text-center font-medium text-base xl:text-lg xl:w-[900px]">
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
          <div className="flex items-end mx-2 xl:mx-0">
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
          <div className="flex items-start mx-2 xl:mx-0">
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
          <div className="flex items-end mx-2 xl:mx-0">
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
          <div className="flex items-start mx-2 xl:mx-0">
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
      <section id="pricing" className=" bg-gray-200  ">
        <div className="flex flex-col xl:flex-row py-[50px] justify-between xl:max-w-[1280px]  mx-auto px-2">
          <div className="flex flex-col  text-left xl:w-[482px] xl:mx-0 mx-2">
            <h2 className="font-bold xl:text-[48px] text-[35px] xl:text-left">
              Want To Sale Your House?
            </h2>
            <div className="bg-[#30725C] w-[100px] h-1 rounded-xl mb-3"></div>
            <p className="xl:text-lg text-base text-justify mx-6 xl:mx-0">
              Leave it to us! We offer a dedicated space on our platform where
              potential buyers can discover and explore your home. By showcasing
              your property through our platform, we provide a convenient avenue
              for interested individuals to view and potentially purchase your
              house. With our extensive reach and user-friendly interface, we
              ensure that your home receives the attention it deserves in the
              market. Let us take care of the details while you focus on the
              excitement of selling your property.
            </p>
            <Link
              href={"/real-estate/new-property"}
              className="px-4 py-3 mt-4 rounded-2xl font-medium text-lg w-fit   text-[#FCFFFC] transition-colors  bg-[#30725C] hover:bg-[#214d3e]  text-center xl:self-start self-center"
            >
              Advertise your property
            </Link>
          </div>
          <div className="grid grid-cols-2 grid-rows-2  xl:w-[600px] xl:h-[500px] h-[400px] gap-2 my-2">
            <div className="row-span-2 relative rounded-xl overflow-hidden shadow-md">
              <Image
                src={"/assets/house.jpg"}
                fill={true}
                alt="service photo"
                sizes="(min-width: 1120px) 800px"
                className="object-cover object-center"
              />
            </div>
            <div className=" relative rounded-xl overflow-hidden shadow-md">
              <Image
                src={"/assets/housead.jpg"}
                fill={true}
                alt="service photo"
                sizes="(min-width: 1120px) 500px"
                className="object-cover object-center"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src={"/assets/housead2.jpg"}
                fill={true}
                alt="service photo"
                sizes="(min-width: 1120px) 500px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="properties"
        className="flex flex-col items-center pt-12 mb-8 text-center container-xl"
      >
        <h1 className="xl:text-[64px] text-[35px]">We Help You Make Better Deals</h1>
        <p className="text-[#5e5e5e] text-center font-medium  text-base xl:text-lg xl:w-[900px] mb-8">
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
