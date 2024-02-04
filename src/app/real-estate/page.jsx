import CustomPage from "@/components/CustomPage";
import Link from "next/link";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { IconHome } from "@tabler/icons-react";
import { IconArrowNarrowRight } from "@tabler/icons-react";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export default function Page() {
  //TODO: Hacer componente de boton de servicio
  return (
    <main className={`bg-[#f5f3f4] pt-[50px] ${roboto.className}`}>
      <section className="flex flex-row w-full p-12 ">
        <div className="flex flex-col text-left w-[45%]">
          <h1 className="text-[#0A100D] text-left text-[100px] leading-tight">
            PB+ REAL ESTATE
          </h1>
          <p className="text-[#5e5e5e] font-medium text-xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
            voluptate sequi asperiores nemo possimus quod et quis, rerum
            reiciendis veritatis cum tempora
          </p>
          <Link
            href={"/real-estate"}
            className="px-6 py-4 mt-4 rounded-[10px] font-medium text-lg w-[220px]   text-[#FCFFFC] transition-colors  bg-[#184E77] hover:bg-[#113753]  text-center"
          >
            Take a look
          </Link>
        </div>
        <div className="relative grid grid-cols-4 grid-rows-3 gap-4 w-[55%] h-[500px]">
          <div className="relative col-span-2 row-span-3 rounded-3xl overflow-hidden">
            <Image
              src={"/assets/house.jpg"}
              alt="real estate photo"
              fill={true}
              sizes="(min-width: 1120px) 1000px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative  row-span-3 rounded-3xl overflow-hidden">
            <Image
              src={"/assets/house2.webp"}
              alt="real estate photo"
              fill={true}
              sizes="(min-width: 1120px) 1000px"
              className="object-cover object-left"
            />
          </div>
          <div className="relative  row-span-3 rounded-3xl overflow-hidden">
            <Image
              src={"/assets/house3.jpg"}
              alt="real estate photo"
              fill={true}
              sizes="(min-width: 1120px) 1000px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full my-8 items-center">
        <h1>We provide A Lot of Services</h1>
        <p className="text-[#5e5e5e] font-medium text-lg w-[820px] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad
          minim veniam,
        </p>
        <div className="bg-[#184E77] px-4 py-2 text-[#FCFFFC] rounded-bl-none rounded-2xl text-lg my-4">
          Our services
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-3 w-[1100px] h-[550px] ">
          <article className="group bg-[#FCFFFC] overflow-hidden col-span-2 row-span-2 text-center shadow-lg hover:bg-[#30725C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <Link href={"/"}>
              <div className="relative flex w-full h-full items-center justify-center text-2xl">
                <div className="flex flex-col z-10 px-10 items-center justify-center">
                  <div className="p-4 rounded-full bg-gray-100 group-hover:bg-white">
                    <IconHome size={120} color="#30725C" />
                  </div>
                  <p className="font-semibold group-hover:text-white">
                    Houses & properties
                  </p>
                  <p className="text-base font-light text-[#5e5e5e] group-hover:text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Laboriosam, labore illo nam libero ratione, natus ipsum
                  </p>
                </div>
                <div className="absolute inset-y-[50%] inset-x-[15%]  bg-[#FCFFFC] w-[90%] h-[90%] transition-all group-hover:-rotate-45 group-hover:bg-[#2f6655]"></div>
              </div>
            </Link>
          </article>
          <article className="group bg-[#FCFFFC] overflow-hidden text-center shadow-lg hover:bg-[#30725C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <Link href={"/"}>
              <div className="relative flex w-full h-full items-center justify-center text-2xl">
                <div className="flex flex-col z-10 px-4 items-center justify-center">
                  <div className="p-4 rounded-full bg-gray-100 group-hover:bg-white">
                    <IconHome size={60} color="#30725C" />
                  </div>
                  <p className="font-semibold group-hover:text-white">
                    Houses & properties
                  </p>
                  <p className="text-base font-light text-[#5e5e5e] group-hover:text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="absolute inset-y-[50%] inset-x-[15%]  bg-[#FCFFFC] w-[90%] h-[90%] transition-all group-hover:-rotate-45 group-hover:bg-[#2f6655]"></div>
              </div>
            </Link>
          </article>
          <article className="group bg-[#FCFFFC] overflow-hidden text-center shadow-lg hover:bg-[#30725C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <Link href={"/"}>
              <div className="relative flex w-full h-full items-center justify-center text-2xl">
                <div className="flex flex-col z-10 px-4 items-center justify-center">
                  <div className="p-4 rounded-full bg-gray-100 group-hover:bg-white">
                    <IconHome size={60} color="#30725C" />
                  </div>
                  <p className="font-semibold group-hover:text-white">
                    Houses & properties
                  </p>
                  <p className="text-base font-light text-[#5e5e5e] group-hover:text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="absolute inset-y-[50%] inset-x-[15%]  bg-[#FCFFFC] w-[90%] h-[90%] transition-all group-hover:-rotate-45 group-hover:bg-[#2f6655]"></div>
              </div>
            </Link>
          </article>
          <article className="group bg-[#FCFFFC] overflow-hidden text-center shadow-lg hover:bg-[#30725C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <Link href={"/"}>
              <div className="relative flex w-full h-full items-center justify-center text-2xl">
                <div className="flex flex-col z-10 px-4 items-center justify-center">
                  <div className="p-4 rounded-full bg-gray-100 group-hover:bg-white">
                    <IconHome size={60} color="#30725C" />
                  </div>
                  <p className="font-semibold group-hover:text-white">
                    Houses & properties
                  </p>
                  <p className="text-base font-light text-[#5e5e5e] group-hover:text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="absolute inset-y-[50%] inset-x-[15%]  bg-[#FCFFFC] w-[90%] h-[90%] transition-all group-hover:-rotate-45 group-hover:bg-[#2f6655]"></div>
              </div>
            </Link>
          </article>
          <article className="group bg-[#FCFFFC] overflow-hidden text-center shadow-lg hover:bg-[#30725C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <Link href={"/"}>
              <div className="relative flex w-full h-full items-center justify-center text-2xl">
                <div className="flex flex-col z-10 px-4 items-center justify-center">
                  <div className="p-4 rounded-full bg-gray-100 group-hover:bg-white">
                    <IconHome size={60} color="#30725C" />
                  </div>
                  <p className="font-semibold group-hover:text-white">
                    Houses & properties
                  </p>
                  <p className="text-base font-light text-[#5e5e5e] group-hover:text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="absolute inset-y-[50%] inset-x-[15%]  bg-[#FCFFFC] w-[90%] h-[90%] transition-all group-hover:-rotate-45 group-hover:bg-[#2f6655]"></div>
              </div>
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
