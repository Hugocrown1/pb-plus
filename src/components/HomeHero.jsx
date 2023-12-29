import React from "react";

const HomeHero = () => {
  return (
    <section className="relative flex items-center justify-center h-[700px] bg-black/20 w-full ">
      <div className="flex flex-col gap-4 text-white text-center">
        <p className=" text-8xl font-bold">PB PLUS</p>
        <p className="text-4xl font-light">
          Services for the Punta Banda community
        </p>
        <div className="flex w-full gap-12 text-xl justify-center items-center font-medium">
          <button className="px-8 py-3 rounded-[10px] border-2 font-semibold text-base w-[200px] transition-colors hover:bg-white hover:text-black">
            Services
          </button>
          <button className="px-8 py-3 rounded-[10px] border-2 font-semibold text-base w-[200px] transition-colors text-black border-[#FFC65A] bg-[#F6AA1C] hover:bg-[#FFC65A] hover:border-[#F6AA1C]">
            About Us
          </button>
        </div>
      </div>
      <video
        src={require("../../public/assets/puntabanda.mp4")}
        autoPlay
        muted
        loop
        className="absolute -z-10 object-cover h-full w-full"
      />
    </section>
  );
};

export default HomeHero;
