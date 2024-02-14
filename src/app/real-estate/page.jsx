import CustomPage from "@/components/CustomPage";
import Link from "next/link";
import { Roboto } from "next/font/google";
import Image from "next/image";
import {
  IconGraph,
  IconHome,
  IconHomeCog,
  IconHomeDollar,
  IconHomeEco,
  IconSparkles,
} from "@tabler/icons-react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import ServiceCard from "@/components/ServiceCard";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export default function Page() {
  return (
    <main className={`bg-[#f5f3f4] container-xl pt-[50px] ${roboto.className}`}>
      <section className="flex flex-row w-full pt-12 gap-8 ">
        <div className="flex flex-col text-left w-[45%]">
          <h1 className="text-[#0A100D] text-left text-[90px] leading-tight">
            PB+ REAL ESTATE
          </h1>
          <p className="text-[#5e5e5e] font-medium text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
            voluptate sequi asperiores nemo possimus quod et quis, rerum
            reiciendis veritatis cum tempora
          </p>
          <Link
            href={"#services"}
            className="px-4 py-3 mt-4 rounded-2xl font-medium text-lg w-[190px]   text-[#FCFFFC] transition-colors  bg-[#30725C] hover:bg-[#214d3e]  text-center"
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
              sizes="(min-width: 1120px) 800px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative  row-span-3 rounded-3xl overflow-hidden">
            <Image
              src={"/assets/house2.webp"}
              alt="real estate photo"
              fill={true}
              sizes="(min-width: 1120px) 800px"
              className="object-cover object-left"
            />
          </div>
          <div className="relative  row-span-3 rounded-3xl overflow-hidden">
            <Image
              src={"/assets/house3.jpg"}
              alt="real estate photo"
              fill={true}
              sizes="(min-width: 1120px) 800px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section
        id="services"
        className="flex flex-col w-full pt-[60px] mb-8 items-center"
      >
        <h1>We provide A Lot of Services</h1>
        <p className="text-[#5e5e5e] font-medium text-lg w-[820px] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad
          minim veniam,
        </p>
        <div className="bg-[#30725C] px-4 py-2 text-[#FCFFFC] rounded-bl-none rounded-2xl text-lg my-4">
          Our services
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-3 w-[1100px] h-[550px] ">
          <ServiceCard
            href={"/real-estate/houses-&-properties"}
            title={"Houses & Properties"}
            icon={<IconHomeDollar size={70} color="#30725C" />}
            style={"col-span-2 row-span-2"}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            ducimus tempore quia sequi!
          </ServiceCard>

          <ServiceCard
            href={"/real-estate/housekeeping"}
            title={"Housekeeping"}
            icon={<IconSparkles size={70} color="#30725C" />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elite
          </ServiceCard>
          <ServiceCard
            href={"/"}
            title={"House Sitting"}
            icon={<IconHomeEco size={70} color="#30725C" />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elite
          </ServiceCard>
          <ServiceCard
            href={"/"}
            title={"Assesment Services"}
            icon={<IconGraph size={70} color="#30725C" />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elite
          </ServiceCard>
          <ServiceCard
            href={"/"}
            title={"Home Management"}
            icon={<IconHomeCog size={70} color="#30725C" />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elite
          </ServiceCard>
        </div>
      </section>
    </main>
  );
}
