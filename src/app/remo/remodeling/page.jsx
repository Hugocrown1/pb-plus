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
import { remodelingServices } from "@/lib/remodelingServices";

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <main className="bg-[#f5f3f4] pt-[50px] ">
      <MultistepQuotation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        servicesData={remodelingServices}
      />
      <div className=" z-10 flex items-center justify-center w-full py-4 mt-2 bg-white">
        <h1 className="text-4xl">Remodelation</h1>
      </div>

      <div className="flex flex-row max-w-[1280px] pt-[30px] justify-center min-[1276px]:justify-between mx-auto min-[503px]:px-2">
        <div className="w-[880px] flex flex-col">
          <section
            id="welding"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Welding
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/welding.jpg"}
                alt="service photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              Are you in need of expert welding solutions for your industrial,
              commercial, or residential projects? Look no further! Our
              professional welding team is here to provide top-notch welding
              services tailored to your specific needs.
            </p>
          </section>
          <section
            id="smart-house"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Smart house
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/smarthouse.png"}
                alt="service photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              Turn your house into a smart home. Elevate your living experience
              with our innovative Smart Home Service! Imagine a home where every
              aspect of your environment seamlessly adapts to your needs and
              preferences. With our expertise in smart home technology, we can
              transform your house into a modern marvel of convenience,
              efficiency, and security.
            </p>
          </section>
          <section
            id="architec-plans"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Architec plans
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/architec.png"}
                alt="service photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              Your home sketch plans for more value. Unlock the potential of
              your dream project with our Architectural Plans Service. Whether
              you're building a new home, remodeling your existing space, or
              undertaking a commercial development, our expert architects are
              here to bring your vision to life.
            </p>
          </section>
          <section
            id="false-ceiling"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                False ceiling
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/tweaks/false-ceiling.PNG"}
                alt="service photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              Transform your space with elegance and sophistication using our
              False Ceiling Service. Whether you're looking to enhance the
              aesthetics of your home, office, or commercial space, our expert
              team is here to elevate your ceilings to new heights.
            </p>
          </section>
          <section
            id="estimates"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Estimates
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/estimates.png"}
                alt="service photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              Planning to build your dream home but unsure about the costs
              involved? Look no further! Our Expense Estimation Service is
              designed to provide you with accurate and reliable estimates
              tailored to the house you envision.
            </p>
          </section>
          <section
            id="wood-finishing"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Wood finishing
              </h2>
            </div>
            <div className="w-full h-[422px] relative my-2 ">
              <Image
                src={"/assets/remo/wood.png"}
                alt="service photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
            <p className="text-left text-lg my-4">
              Transform your home or favorite part of your house into your dream
              space with our expert services. Whether you're envisioning a cozy
              sanctuary, a vibrant entertainment area, or a functional
              workspace, we're here to make your dreams a reality.
            </p>
          </section>
          <section
            id="home-facade"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Home facade
              </h2>
            </div>
            <div className="w-full min-h-[422px] relative my-2 ">
              <img
                src={"/assets/remo/home-facade.png"}
                alt="service photo"
                className="object-cover object-center w-full h-full"
              />
            </div>
            <p className="text-left text-lg my-4">
              Your home's facade is the first impression visitors and passersby
              have of your property, so why not make it unforgettable? Our team
              specializes in transforming ordinary exteriors into stunning
              showcases of architectural beauty and style.
            </p>
          </section>
          <section
            id="decks"
            className="w-full bg-white px-4 py-6 rounded-lg my-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">Decks</h2>
            </div>
            <div className="w-full h-[722px] relative my-2 ">
              <img
                src={"/assets/remo/decks.png"}
                alt="service photo"
                className="object-cover object-center w-full h-full"
              />
            </div>
            <p className="text-left text-lg my-4">
              Custom-made plates are the epitome of personalized style and
              functionality. Whether you're looking to add a unique touch to
              your home decor, showcase your brand identity, or commemorate a
              special occasion, custom-made plates offer endless possibilities.
            </p>
          </section>

          <section
            id="home-entertainment"
            className="w-full bg-white px-4 py-6 rounded-lg mb-4"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" w-[10px] rounded-sm h-[50px] bg-[#941B0C] p-1"></div>
              <h2 className="text-4xl text-left w-fit font-semibold">
                Entertainment Home Center
              </h2>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 w-full h-[722px] relative my-2 gap-2">
              <img
                src={"/assets/remo-gallery/home-theater.webp"}
                alt="service photo"
                className="object-cover object-center col-span-2 w-full h-full  "
              />
              <img
                src={"/assets/tweaks/entertainment.PNG"}
                alt="service photo"
                className="object-cover object-center w-full h-full"
              />
              <img
                src={"/assets/tweaks/entertainment2.PNG"}
                alt="service photo"
                className="object-cover object-center w-full h-full"
              />
            </div>
            <p className="text-left text-lg my-4">
              We can show you the idea before we start the job with 3D drawings
              and discuss the changes you would like to make along the way!
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
                  href={"#welding"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Welding
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#smart-house"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Smart House
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#architec-plans"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Architec Plans
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#false-ceiling"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  False Ceiling
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#estimates"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Estimates
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#wood-finishing"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Wood Finishing
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#home-facade"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Home Facade
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#decks"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Decks
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"#home-entertainment"}
                  className="text-blue-600 transition-colors text-lg w-full rounded-lg flex hover:bg-gray-200 px-1"
                >
                  Entertainment Home Center
                </Link>
              </li>
            </ul>
          </section>
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
