import { Libre_Baskerville, Roboto } from "next/font/google";
import {
  IconGraph,
  IconHomeCog,
  IconHomeDollar,
  IconHomeEco,
  IconSparkles,
} from "@tabler/icons-react";
import ServiceCard from "@/components/ServiceCard";
import Slider from "@/components/Slider/Slider";

export const metadata = {
  title: "PB+ Real Estate",
  description: "PB+ Real Estate: Your gateway to unparalleled property solutions tailored to your needs and aspirations.",
};

const roboto = Libre_Baskerville({ subsets: ["latin"], weight: "400" });

const dataSlider = [
  {
    id: 1,
    title: "PB+ REAL ESTATE",
    subtitle:
      "PB+ Real Estate Department is your gateway to unparalleled property solutions tailored to your needs and aspirations.",

    source: "/assets/tweaks/real-estate1.PNG",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 2,
    title: "Houses & Properties",
    subtitle:
      "Houses & Properties Service is your premier destination for finding the perfect home, investment property, or commercial space tailored to your unique needs and aspirations.",
    source: "/assets/tweaks/real-estate2.PNG",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 3,
    title: "House Stitting",
    subtitle:
      "House Sitting Service offers you the peace of mind and assurance that your home is in good hands, whether you're away for a short trip or an extended vacation.",
    source: "/assets/tweaks/real-estate3.PNG",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 4,
    title: "Assesment Services",
    subtitle:
      "Understanding the value appreciation of your property after improvements or over time is crucial for making informed decisions, especially if you're considering selling your land or house. ",
    source: "/assets/house4.png",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 5,
    title: "House Keeping",
    subtitle:
      "PB+ offers a reliable service for homeowners who seek trusted employees to clean their homes on a schedule that suits their needs.",
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
          At PB+ Real Estate, we recognize that each client is unique, and we
          tailor our services to accommodate individual preferences and
          objectives.
        </p>
        <div className="bg-[#30725C] px-1 min-[400px]:px-4 py-2 text-[#FCFFFC] rounded-bl-none rounded-2xl text-lg my-4">
          Our services
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-2 min-[400px]:grid-cols-2 min-[400px]:grid-rows-4 gap-3 xl:w-[1100px] xl:h-[550px] w-full h-full min-[400px]:px-4 xl:px-0">
          <ServiceCard
            href={"/real-estate/houses-&-properties"}
            title={"Houses & Properties"}
            icon={<IconHomeDollar size={70} color="#30725C" />}
            style={"min-[400px]:col-span-2 min-[400px]:row-span-2"}
          ></ServiceCard>

          <ServiceCard
            href={"/real-estate/housekeeping"}
            title={"Housekeeping"}
            icon={<IconSparkles size={70} color="#30725C" />}
          ></ServiceCard>
          <ServiceCard
            href={"/real-estate/house-sitting"}
            title={"House Sitting"}
            icon={<IconHomeEco size={70} color="#30725C" />}
          ></ServiceCard>
          <ServiceCard
            href={"/real-estate/assessment-services"}
            title={"Assessment Services"}
            icon={<IconGraph size={70} color="#30725C" />}
          ></ServiceCard>
          <ServiceCard
            href={"/real-estate/home-management"}
            title={"Home Management"}
            icon={<IconHomeCog size={70} color="#30725C" />}
          ></ServiceCard>
        </div>
      </section>
    </main>
  );
}
