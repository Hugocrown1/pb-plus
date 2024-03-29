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
import { electricalServices } from "@/lib/electricalServices";

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <main className="bg-[#f5f3f4] pt-[50px] ">
      <MultistepQuotation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        servicesData={electricalServices}
      />
      <div className=" z-10 flex items-center justify-center w-full py-4 mt-2 bg-white">
        <h1 className="text-4xl">Electrical Services</h1>
      </div>

      <div className="flex flex-row max-w-[1280px] pt-[30px] justify-center min-[1276px]:justify-between mx-auto min-[503px]:px-2">
        <div className="w-[880px] flex flex-col">
          <section
            id="cfe"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">CFE</h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/cfe.jpg"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              The cfe is very specific about the conditions under which your
              installations should be; home & business. we can take care of
              that.
            </p>
          </section>

          <section
            id="wiring"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">Wiring</h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/wiring.jpeg"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              PB + can provide this service at any point of your progress. If
              another job was done before we get there, we will give you a
              diagnosis before we proceed with the job. This will help us to
              provide you with a better service by correcting any mistakes or
              improving whatever was there already.
            </p>
          </section>

          <section
            id="generator"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Generator installations
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/generator.webp"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              Let the world roll when a blackout happens in your area. Why
              supply power to few things in your home when you can supply your
              entire home with the same generator? We provide generator
              installations that will supply power to your entire home.
            </p>
          </section>
          <section
            id="electrical-audit"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Electrical audit
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/electricalaudit.jpg"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg mt-4">
              Why would I need an electrical audit? A good sign that you need an
              electrical audit is when your power bill varies with a big
              difference little by little. It can mean that you have an outlet
              that is costing you a lot of money. Maybe other problems are
              occurring in your wiring or electrical circuit that may be causing
              issues.
            </p>
            <br />
            <p className="text-left text-lg mb-4">
              An audit will help you to find out what is going on in your home
              electrical circuit and find the problem for good. These
              malfunctions can also cause more damage to other home appliances
              and cost you more money.
            </p>
          </section>
          <section
            id="substations"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Substations
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/substations.webp"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <h3 className="text-xl font-semibold">
              High tension voltage substations
            </h3>
            <p className="text-left text-lg mb-4">
              PB Plus can provide you with a custom-made substation tailored to
              the needs your project may have. It's common to have a substation
              when you have a large property with high electricity consumption,
              whether it's for a shop on your ranch or for your business. These
              stations are for industrial projects.
            </p>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/mediumsubstation.jpg"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <h3 className="text-xl font-semibold">
              Medium tension voltage substations.
            </h3>
            <p className="text-left text-lg mb-4">
              A medium tension substation is more common in smaller projects,
              ranches, or small businesses.
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

          <section className="flex flex-col items-start gap-6 w-full h-fit bg-white px-4 py-4 mb-4 rounded-md">
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[8px] rounded-sm h-[35px] bg-[#941B0C] p-1"></div>
              <h2 className="text-2xl text-left font-medium">Shortcuts</h2>
            </div>
            <ul className="ml-2 w-full">
              <li className="w-full">
                <Link
                  href={"#cfe"}
                  className="text-blue-600 transition-colors font-bold  text-lg w-full rounded-lg hover:bg-gray-200 flex 0 px-1"
                >
                  CFE
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#wiring"}
                  className="text-blue-600 transition-colors font-bold text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Wiring
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#generator"}
                  className="text-blue-600 transition-colors font-bold text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Generator
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#electrical-audit"}
                  className="text-blue-600 transition-colors font-bold text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Electrical Audit
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#substations"}
                  className="text-blue-600 transition-colors font-bold text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Substations
                </Link>
              </li>
            </ul>
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
