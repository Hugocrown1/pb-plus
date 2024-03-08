import React from "react";
import Image from "next/image";
import MultistepQuotation from "@/components/MultistepQuotation";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";

const page = () => {
  return (
    <main className="bg-[#f5f3f4]  xl:pt-[50px] mb-8 ">
      <div className="flex items-center justify-center w-full py-4 bg-white mt-2 mb-6">
        <h1 className="text-4xl">Electrical Services</h1>
      </div>
      <div className="flex flex-row max-w-[1280px] justify-between mx-auto min-[503px]:px-2">
        <div className="w-[880px] flex flex-col gap-4">
          <section id="cfe" className="w-full bg-white px-4 py-4">
            <h2 className="text-4xl font-semibold">CFE</h2>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/cfe.jpg"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left my-4">
              THE CFE IS VERY ESPECIFY THE CONDITIONS UNDER WHICH YOUR
              INSTALLATIONS SHOULD BE; HOME & BUSINESS. WE CAN TAKE CARE OF
              THAT.
            </p>
          </section>

          <section id="wiring" className="w-full bg-white px-4 py-4">
            <h2 className="text-4xl font-semibold">Wiring</h2>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/wiring.jpeg"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left my-4">
              PB + CAN PROVIDE THIS SERVICE AT ANY POINT OF YOUR PROGRESS. IF
              OTHER JOB WAS DONE BEFORE WE GET THERE, WE WILL GIVE YOU A
              DIAGNOSIS BEFORE WE PROCEEED WHIT THE JOB, THIS WILL HELP US TO
              PROVIDE YOU WITH A BETTER SERVICE BY CORRECTING ANY MISTAKES OR
              IMPROVES WHATEVER WAS THERE ALREADY.
            </p>
          </section>

          <section id="generator" className="w-full bg-white px-4 py-4">
            <h2 className="text-4xl font-semibold">Generator installations</h2>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/generator.webp"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left my-4">
              LET THE WORLD ROLL WHEN A BLACKOUT HAPPENS IN YOU AREA WHY SUPPLY
              POWER TO FEW THINGS IN YOU HOME WHEN YOU CAN SUPPLY YOUR ENTIRE
              HOME WHIT THE SAME GENERATOR? WE PROVIDE GENERATORS INSTALLATIONS
              THAT WILL SUPPLY POWER TO YOUR ENTIRE HOME.
            </p>
          </section>
        </div>
        <div className="w-[360px] flex flex-col gap-4 ">
          <section className="flex flex-col items-center gap-6 w-full h-[300px] bg-white px-1 py-4">
            <h2 className="text-2xl font-medium">Do You Need a Quote?</h2>
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 rounded-full bg-red-800 text-white mb-1">
                <IconPencil size={60} />
              </div>
              <p className="text-center">
                It's easy and it only takes 5 minutes
              </p>
              <MultistepQuotation />
            </div>
          </section>

          <section className="flex flex-col items-start gap-6 w-full h-fit bg-white px-4 py-4">
            <h2 className="text-2xl text-center w-full font-medium">
              Shortcuts
            </h2>
            <ul className="w-full">
              <li className="w-full">
                <Link
                  href={"#cfe"}
                  className="hover:text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  CFE
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#wiring"}
                  className="hover:text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Wiring
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#generator"}
                  className="hover:text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Generator
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
