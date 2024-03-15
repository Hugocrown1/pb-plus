"use client";
import React, { useState } from "react";
import Image from "next/image";
import MultistepQuotation from "@/components/MultistepQuotation";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <main className="bg-[#f5f3f4] pt-[50px] ">
      <MultistepQuotation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <div className=" z-10 flex items-center justify-center w-full py-4 mt-2 bg-white">
        <h1 className="text-4xl">Project management</h1>
      </div>

      <div className="flex flex-row max-w-[1280px] pt-[30px] justify-center min-[1276px]:justify-between mx-auto min-[503px]:px-2">
        <div className="w-full flex flex-col">
          <section
            id="managing-project"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Project management
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/project-management.png"}
                alt="cfe photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              Understanding where your money is being allocated when you're not
              directly overseeing your project is not a common service. At PB
              Plus, we believe in transparency and accountability throughout
              every stage of your project. That's why we offer detailed weekly
              or daily reports, along with an administration scheme that
              provides information on every transaction involved in your
              project.
            </p>
          </section>
        </div>
      </div>
      {/* <div className="sticky  bottom-0 left-0 right-0 bg-white text-white text-center p-2 items-center flex justify-center border-t-2 min-[1276px]:hidden">
        <button
          className="px-4 z-50 py-3 rounded-2xl font-medium text-lg max-w-[820px] w-full mx-4  text-black transition-colors  bg-[#F6AA1C] hover:bg-[#ca9c47]  text-center"
          onClick={() => setIsMenuOpen(true)}
        >
          Ask for a quote
        </button>
      </div> */}
    </main>
  );
};

export default page;