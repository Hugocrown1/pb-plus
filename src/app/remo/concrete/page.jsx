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

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <main className="bg-[#f5f3f4] py-[50px] ">
      <MultistepQuotation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <div className=" z-10 flex items-center justify-center w-full py-4 mt-2 bg-white">
        <h1 className="text-4xl">Concrete</h1>
      </div>

      <div className="flex flex-row max-w-[1280px] pt-[30px] justify-center min-[1276px]:justify-between mx-auto min-[503px]:px-2">
        <div className="w-[880px] flex flex-col">
          <section
            id="managing-project"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Concrete service
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/concrete.png"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              Looking to enhance the curb appeal and functionality of your
              property? Our Concrete Driveway Service is here to deliver
              durable, stylish, and long-lasting driveways tailored to your
              needs. Whether you're building a new driveway or replacing an
              existing one, concrete offers numerous advantages, including
              durability, versatility, and low maintenance. Our skilled team
              specializes in concrete driveway installation, providing expert
              craftsmanship and attention to detail every step of the way.
            </p>
          </section>
        </div>
        <div className="w-[360px] hidden  min-[1276px]:flex flex-col ">
          <section className="flex flex-col items-start gap-6 w-full h-fit bg-white px-4 py-4 my-4 rounded-md">
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
    </main>
  );
};

export default page;
