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
import ServiceCard from "@/components/ServiceCard";
import Slider from "@/components/Slider/Slider";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

const dataSlider = [
  {
    id: 1,
    title: "PB+ REAL ESTATE",
    subtitle:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",

    source: "/assets/house.jpg",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 2,
    title: "Houses & Properties",
    subtitle:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
    source: "/assets/house2.webp",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 3,
    title: "House Stitting",
    subtitle:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
    source: "/assets/house3.jpg",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 4,
    title: "Assesment Services",
    subtitle:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
    source: "/assets/house4.png",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 5,
    title: "House Keeping",
    subtitle:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
    source: "/assets/housekeeping.jpg",
    linkTitle: "Take a look",
    href: "#",
  },
];

export default function Page() {
  return (
    <main className={`bg-[#f5f3f4]  xl:pt-[50px] ${roboto.className}`}>
      <Slider dataSlider={dataSlider} />

      <section
        id="services"
        className="flex flex-col w-full pt-[25px] mb-8 items-center"
      >
        <h1 className="xl:text-[64px] text-[42px]">
          We provide A Lot of Services
        </h1>
        <p className="text-[#5e5e5e] font-medium xl:text-lg texl-base xl:w-[820px] text-center mx-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad
          minim veniam,
        </p>
        <div className="bg-[#30725C] px-4 py-2 text-[#FCFFFC] rounded-bl-none rounded-2xl text-lg my-4">
          Our services
        </div>

        

        <div className="grid xl:grid-cols-4 xl:grid-rows-2 grid-cols-2 grid-rows-4 gap-3 xl:w-[1100px] xl:h-[550px] w-full h-full px-4 xl:px-0">
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
            href={"/real-estate/house-sitting"}
            title={"House Sitting"}
            icon={<IconHomeEco size={70} color="#30725C" />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elite
          </ServiceCard>
          <ServiceCard
            href={"/real-estate/assessment-services"}
            title={"Assessment Services"}
            icon={<IconGraph size={70} color="#30725C" />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elite
          </ServiceCard>
          <ServiceCard
            href={"/real-estate/home-management"}
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
