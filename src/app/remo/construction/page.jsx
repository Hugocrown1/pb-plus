import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <main className="bg-[#f5f3f4]  xl:pt-[50px]">
      <div className="flex items-center justify-center w-full py-4 bg-white mt-2 mb-6">
        <h1 className="text-4xl">Construction</h1>
      </div>
      <div className="flex flex-row max-w-[1280px] justify-between mx-auto min-[503px]:px-2">
        <div className="w-[880px] h-[500px] ">
          <section id="construction" className="w-full bg-white px-1 py-4">
            <h2 className="text-2xl font-medium">Build Your Dream House</h2>
            <div className="w-full h-[422px] relative my-2">
              <Image
                src={"/assets/remo.jpg"}
                alt="remo photo"
                fill={true}
                sizes="(min-width: 1120px) 1000px"
                className="object-cover object-center"
              />
            </div>
          </section>
        </div>
        <div className="w-[360px] h-500px ">
          <section className="flex flex-col items-center w-full h-[300px] bg-white px-1 py-4">
            <h2 className="text-2xl font-medium">Do You Need a Quote?</h2>
            <button className="px-4 py-3 my-auto rounded-2xl font-medium text-lg w-[220px]  text-black transition-colors  bg-[#F6AA1C] hover:bg-[#ca9c47]  text-center">
              Free Quote
            </button>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
