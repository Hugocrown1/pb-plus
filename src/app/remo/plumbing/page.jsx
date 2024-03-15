"use client";
import React, { useState } from "react";
import Image from "next/image";
import MultistepQuotation from "@/components/MultistepQuotation";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { plumbingServices } from "@/lib/plumbingServices";

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <main className="bg-[#f5f3f4] pt-[50px] ">
      <MultistepQuotation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        servicesData={plumbingServices}
      />
      <div className=" z-10 flex items-center justify-center w-full py-4 mt-2 bg-white">
        <h1 className="text-4xl">Plumbing</h1>
      </div>

      <div className="flex flex-row max-w-[1280px] pt-[30px] justify-center min-[1276px]:justify-between mx-auto min-[503px]:px-2">
        <div className="w-[880px] flex flex-col">
          <section
            id="traditional-plumbing"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Traditional plumbing
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/plumbing.png"}
                alt="service photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              ABS, PVC, CPVC, and copper are traditional installations commonly
              used in Mexican construction. At PB+, we provide all these
              traditional installations for your new home. Whether you prefer
              the durability of copper pipes or the versatility of ABS, PVC, or
              CPVC for plumbing and drainage systems, we have the expertise to
              meet your needs. Our team ensures high-quality installations that
              adhere to industry standards, providing you with reliable and
              long-lasting solutions for your home. Trust PB+ for all your
              traditional installation needs in your new home.
            </p>
          </section>
          <section
            id="pex-plumbing"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                PEX plumbing installation
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/pex-plumbing.png"}
                alt="service photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              PEX plumbing installation is another service we proudly provide as
              part of our offerings. PEX (cross-linked polyethylene) piping has
              become increasingly popular due to its flexibility, durability,
              and cost-effectiveness.
            </p>
          </section>
        </div>
        <div className="w-[360px] hidden  min-[1276px]:flex flex-col ">
          <section className="flex flex-col items-center gap-6 w-full h-[300px] bg-white px-1 py-6 rounded-lg my-4">
            <h2 className="text-2xl font-medium">Do You Need a Quote?</h2>
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 rounded-full bg-red-800 text-white mb-1">
                <IconPencil size={60} />
              </div>
              <p className="text-center">
                It's easy and it only takes 5 minutes
              </p>
              <button
                className="px-4 py-3 mt-4 rounded-2xl font-medium text-lg w-[220px]  text-black transition-colors  bg-[#F6AA1C] hover:bg-[#ca9c47]  text-center"
                onClick={() => setIsMenuOpen(true)}
              >
                Free Quote
              </button>
            </div>
          </section>
          <section className="flex flex-col items-start gap-6 w-full h-fit bg-white px-4 py-4 rounded-md">
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[8px] rounded-sm h-[35px] bg-[#941B0C] p-1"></div>
              <h2 className="text-2xl text-left font-medium">Shortcuts</h2>
            </div>
            <ul className="ml-2 w-full">
              <li className="w-full">
                <Link
                  href={"#traditional-plumbing"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Traditional plumbing
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#pex-plumbing"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  PEX plumbing
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="sticky  bottom-0 left-0 right-0 bg-white text-white text-center p-2 items-center flex justify-center border-t-2 min-[1276px]:hidden">
        <button
          className="px-4 z-50 py-3 rounded-2xl font-medium text-lg max-w-[820px] w-full mx-4  text-black transition-colors  bg-[#F6AA1C] hover:bg-[#ca9c47]  text-center"
          onClick={() => setIsMenuOpen(true)}
        >
          Ask for a quote
        </button>
      </div>
    </main>
  );
};

export default page;