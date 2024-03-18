"use client";
import React, { useState } from "react";
import Image from "next/image";
import MultistepQuotation from "@/components/MultistepQuotation";
import {
  IconAirConditioning,
  IconArrowRight,
  IconBackhoe,
  IconBolt,
  IconClipboard,
  IconGardenCart,
  IconLeaf,
  IconPaint,
  IconPencil,
  IconTool,
} from "@tabler/icons-react";
import Link from "next/link";
import { constructionServices } from "@/lib/constructionServices";

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <main className="bg-[#f5f3f4] py-[50px] ">
      <MultistepQuotation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        servicesData={constructionServices}
      />
      <div className=" z-10 flex items-center justify-center w-full py-4 mt-2 bg-white">
        <h1 className="text-4xl">Construction</h1>
      </div>

      <div className="flex flex-row max-w-[1280px] pt-[30px] justify-center min-[1276px]:justify-between mx-auto min-[503px]:px-2">
        <div className="w-[880px] flex flex-col">
          <section
            id="build-home"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Built your own dream house
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/homeconst.jpg"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              Designing your own house is one of the most beautiful achievements
              for many people in life, and we want to help you achieve that for
              you and your family. PB Plus is a company that will be there every
              step of the way until it's done. We can follow your architectural
              plans, or we can provide ideas and create plans for you. Check out
              our properties we have for sale to build your new home. Our
              lawyers will ensure that your acquisition is in accordance with
              the regulations and Mexican law.
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
              <h2 className="text-2xl text-left font-medium">Other services</h2>
            </div>
            <ul className="ml-2 w-full">
              <li className="w-full border-b-[1px]">
                <Link
                  href={"/remo/construction"}
                  className="gap-2 items-center justify-between text-black  transition-colors text-lg w-full  flex hover:bg-gray-200 py-2 px-1"
                >
                  <div className="flex items-center gap-4 flex-row">
                    <IconBackhoe size={35} color="#941B0C" />{" "}
                    <span>Construction</span>
                  </div>
                  <IconArrowRight size={35} color="gray" />
                </Link>
              </li>
              <li className="w-full border-b-[1px]">
                <Link
                  href={"/remo/remodeling"}
                  className="gap-2 items-center justify-between text-black transition-colors text-lg w-full flex hover:bg-gray-200 py-2 px-1"
                >
                  <div className="flex items-center gap-4 flex-row">
                    <IconPaint size={35} color="#941B0C" />
                    <span>Remodeling</span>
                  </div>
                  <IconArrowRight size={35} color="gray" />
                </Link>
              </li>
              <li className="w-full border-b-[1px]">
                <Link
                  href={"/remo/electrical"}
                  className="gap-2 items-center justify-between text-black transition-colors text-lg w-full flex hover:bg-gray-200 py-2 px-1"
                >
                  <div className="flex items-center gap-4 flex-row">
                    <IconBolt size={35} color="#941B0C" />
                    <span>Electrical</span>
                  </div>
                  <IconArrowRight size={35} color="gray" />
                </Link>
              </li>
              <li className="w-full border-b-[1px]">
                <Link
                  href={"/remo/plumbing"}
                  className="gap-2 items-center justify-between text-black transition-colors text-lg w-full flex hover:bg-gray-200 py-2 px-1"
                >
                  <div className="flex items-center gap-4 flex-row">
                    <IconTool size={35} color="#941B0C" />
                    <span>Plumbing</span>
                  </div>
                  <IconArrowRight size={35} color="gray" />
                </Link>
              </li>
              <li className="w-full border-b-[1px]">
                <Link
                  href={"/remo/project-management"}
                  className="gap-2 items-center justify-between text-black transition-colors text-lg w-full flex hover:bg-gray-200 py-2 px-1"
                >
                  <div className="flex items-center gap-4 flex-row">
                    <IconClipboard size={35} color="#941B0C" />
                    <span>Project management</span>
                  </div>
                  <IconArrowRight size={35} color="gray" />
                </Link>
              </li>
              <li className="w-full border-b-[1px]">
                <Link
                  href={"/remo/patio"}
                  className="gap-2 items-center justify-between text-black transition-colors text-lg w-full flex hover:bg-gray-200 py-2 px-1"
                >
                  <div className="flex items-center gap-4 flex-row">
                    <IconLeaf size={35} color="#941B0C" />
                    <span>Patio</span>
                  </div>
                  <IconArrowRight size={35} color="gray" />
                </Link>
              </li>
              <li className="w-full border-b-[1px]">
                <Link
                  href={"/remo/concrete"}
                  className="gap-2 items-center justify-between text-black transition-colors text-lg w-full flex hover:bg-gray-200 py-2 px-1"
                >
                  <div className="flex items-center gap-4 flex-row">
                    <IconGardenCart size={35} color="#941B0C" />
                    <span>Concrete</span>
                  </div>
                  <IconArrowRight size={35} color="gray" />
                </Link>
              </li>
              <li className="w-full border-b-[1px]">
                <Link
                  href={"/remo/air-conditioner"}
                  className="gap-2 items-center justify-between text-black transition-colors text-lg w-full flex hover:bg-gray-200 py-2 px-1"
                >
                  <div className="flex items-center gap-4 flex-row">
                    <IconAirConditioning size={35} color="#941B0C" />
                    <span>A/C</span>
                  </div>
                  <IconArrowRight size={35} color="gray" />
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
