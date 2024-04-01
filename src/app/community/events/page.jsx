import CustomPage from "@/components/CustomPage";
import EventsDisplay from "@/components/EventsDisplay";
import ServiceCard from "@/components/ServiceCard";
import ServiceCommunityCard from "@/components/ServiceCommunityCard";
import Slider from "@/components/Slider/Slider";
import {
  IconCalendarStats,
  IconSparkles,
  IconToolsKitchen,
  IconUserHeart,
} from "@tabler/icons-react";
import Link from "next/link";

const dataSlider = [
  {
    id: 1,
    title: "PB+ COMMUNITY",
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
    <main className={`bg-[#f5f3f4]  xl:pt-[50px]`}>
      {/* <Slider dataSlider={dataSlider} /> */}
      <section
        id="services"
        className="flex flex-col w-full pt-[25px] mb-8 items-center"
      >
        <h1 className="xl:text-[64px] text-[42px]">
          Punta Banda Community Events
        </h1>
        <p className="text-[#5e5e5e] font-medium xl:text-lg texl-base xl:w-[820px] text-center mx-2">
          Let PB Plus Publish Your Events
        </p>
        <div className="w-[100px] h-1 bg-[#0077b6] mb-4"></div>

        <Link
          href={"/community/events/new-event"}
          className="px-4 py-3 rounded-2xl font-medium text-lg w-[190px] transition-colors text-white bg-[#0077b6] hover:text-black border hover:border-black hover:bg-[#ffffff] text-center col-start-5"
        >
          Create an event
        </Link>

        <EventsDisplay />
      </section>
    </main>
  );
}
