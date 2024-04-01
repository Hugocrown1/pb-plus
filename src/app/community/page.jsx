import Slider from "@/components/Slider/Slider";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import dynamic from "next/dynamic";

const DemoCardsDisplay = dynamic(() => import("@/components/DemoCardsDisplay"));

const dataSlider = [
  {
    id: 1,
    title: "PB+ COMMUNITY",
    subtitle:
      "The PB+ Community initiative embodies our commitment to social responsibility, collaboration, and meaningful engagement. ",

    source: "/assets/house.webp",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 2,
    title: "Advertise Your Event",
    subtitle:
      "PB+ Community offers a comprehensive platform to promote your upcoming events and activities to our vibrant community. ",
    source: "/assets/house2.webp",
    linkTitle: "Take a look",
    href: "#",
  },
];

export default function Page() {
  return (
    <main className={`bg-[#f5f3f4]  xl:pt-[50px] mb-8`}>
      <Slider dataSlider={dataSlider} />
      <section
        id="about"
        className="flex flex-col w-full pt-[25px] mb-8 items-center"
      >
        <h1 className="xl:text-[64px] text-[42px]">Punta Banda Community</h1>
        <span className="text-[#5e5e5e] font-medium xl:text-lg texl-base xl:w-[820px] text-center mx-2">
          Let PB Plus Publish Your Events And Advertise Your Business
        </span>
        <div className="w-[100px] h-1 bg-[#0077b6] my-4"></div>

        <div className="w-full h-fit items-center justify-center gap-x-4 max-w-[1280px] mx-auto mt-4 ">
          <figure className="relative w-[500px] h-[500px]  circle-shape bg-black mr-12 float-left">
            <Image
              loading="lazy"
              src="/assets/events.webp"
              alt="photo community"
              fill={true}
              className="circle-shape object-cover"
            />
          </figure>
          <p className=" font-medium xl:text-lg texl-base max-w-[70ch] ml-80">
            Welcome to PB Plus Community, your go-to resource for staying
            connected and informed about events and restaurants in the lively
            Punta Banda neighborhood! At PB Plus Community, our mission is to
            foster a strong sense of belonging and engagement among residents
            and visitors alike by keeping you up-to-date with the latest
            happenings and dining options in Punta Banda. Through our
            user-friendly platform, you'll have easy access to a diverse array
            of upcoming events, ranging from local gatherings to cultural
            festivals and beyond. Whether you're a seasoned local or a newcomer
            to the area, PB Plus Community ensures that you're always in the
            know about the best things to do in Punta Banda.
          </p>
          <p className=" font-medium xl:text-lg texl-base max-w-[70ch] mt-4 ml-80">
            Feeling hungry? Let PB Plus Community guide you to the perfect
            dining experience! Explore a curated selection of restaurants
            offering delectable dishes that cater to every taste and preference.
            Join us in building connections and fostering a sense of community
            as we explore the rich culture, diverse cuisine, and exciting events
            that make Punta Banda so special.
          </p>
        </div>
      </section>

      <section>
        <div className="flex flex-col mt-20 max-w-[1280px] mx-auto ">
          <div className="flex flex-row items-center justify-between">
            <h1 className="flex-1 text-start">Punta Banda Restaurants</h1>
            <Link
              className="flex flex-row items-center text-[18px] text-black group"
              href={"/community/advertising"}
            >
              <span>See all</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-4 transition-all "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <DemoCardsDisplay />
          </Suspense>
        </div>

        <div className="flex flex-col mt-10 max-w-[1280px] mx-auto ">
          <div className="flex flex-row items-center justify-between">
            <h1 className="flex-1 text-start">Punta Banda Events</h1>
            <Link
              className="flex flex-row items-center text-[18px] text-black group"
              href={"/community/events"}
            >
              <span>See all</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-4 transition-all "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <Suspense fallback={<p>Loading</p>}>
            <DemoCardsDisplay />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
