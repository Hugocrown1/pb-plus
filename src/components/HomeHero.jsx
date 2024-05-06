import Link from "next/link";
import React from "react";

const HomeHero = () => {
  return (
    <section className="relative flex items-center justify-center h-[760px] bg-black/10 w-full px-4 ">
      <div className="flex flex-col gap-4 text-white text-center">
        <p className=" text-6xl min-[652px]:text-8xl font-bold mix-blend-difference">
          PB PLUS
        </p>
        <p className="text-2xl min-[652px]:text-4xl font-bold mix-blend-difference">
          Services for the Punta Banda community
        </p>
        <div className="flex  flex-col min-[652px]:flex-row w-full gap-2 min-[652px]:gap-12 text-xl justify-center items-center font-medium">
          <Link
            href={"#departments"}
            className="px-8 py-3 rounded-[10px] border-2 font-semibold text-base w-full min-[652px]:w-[200px] transition-colors hover:bg-white hover:text-black"
          >
            Services
          </Link>
          <Link
            href={"#about"}
            className="px-8 py-3 rounded-[10px] border-2 font-semibold text-base w-full min-[652px]:w-[200px] transition-colors text-black border-[#FFC65A] bg-[#F6AA1C] hover:bg-[#FFC65A] hover:border-[#F6AA1C]"
          >
            About us
          </Link>
        </div>
      </div>

      <video
        src={"https://d38rtnre2df8ox.cloudfront.net/puntabanda.mp4"}
        autoPlay
        muted
        loop
        className="absolute -z-10 object-cover h-full w-full bg-black"
      />
    </section>
  );
};

export default HomeHero;
