import CustomPage from "@/components/CustomPage";
import ServiceRemoCard from "@/components/ServiceRemoCard";
import Slider from "@/components/Slider/Slider";
import {
  IconBackhoe,
  IconBolt,
  IconClipboard,
  IconGardenCart,
  IconLeaf,
  IconPaint,
  IconTool,
  IconWind,
} from "@tabler/icons-react";
import Image from "next/image";

const dataSlider = [
  {
    id: 1,
    title: "PB+ REMO",
    subtitle:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",

    source: "/assets/remo.jpg",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 2,
    title: "Remodelation Services Just For You",
    subtitle:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
    source: "/assets/bannerrealestate.jpg",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 3,
    title: "Let Us Take Care Of It",
    subtitle:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
    source: "/assets/house3.jpg",
    linkTitle: "Take a look",
    href: "#",
  },
];

export default function Page() {
  return (
    <main className="bg-[#f5f3f4]  xl:pt-[50px]">
      <Slider dataSlider={dataSlider} />
      <section
        id="about"
        className="flex flex-row mx-auto gap-8 max-w-[1280px] min-[503px]:px-2 pt-[50px]"
      >
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full aspect-square">
          <div className="relative col-span-2 rounded-xl overflow-hidden ">
            <Image
              src={"/assets/remo.jpg"}
              alt="remo photo"
              fill={true}
              sizes="(min-width: 1120px) 1000px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden ">
            <Image
              src={"/assets/assessment.webp"}
              alt="remo photo"
              fill={true}
              sizes="(min-width: 1120px) 800px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden ">
            <Image
              src={"/assets/assessment1.webp"}
              alt="remo photo"
              fill={true}
              sizes="(min-width: 1120px) 800px"
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="flex flex-col items-start h-full w-full">
          <h1 className="xl:text-[64px] text-[35px] text-left leading-tight">
            Home Remodeling In Punta Banda
          </h1>
          <div className="h-[7px] w-[100px] min-[652px]:w-[166px] bg-[#941B0C] rounded-[8px] mt-2"></div>
          <h2 className="text-left text-[22px] xl:text-[32px] font-semibold">
            PB Plus Home Remodeling
          </h2>
          <p className="text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            eum, optio voluptatum voluptate illum molestiae veniam, saepe ipsa
            repellendus rem perspiciatis id! Fugit deleniti natus, tempore dolor
            sit perspiciatis alias? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dignissimos corporis aspernatur, facilis a eveniet
            itaque iste debitis nisi voluptatem at odio accusamus aut eum illum
            necessitatibus laborum possimus ipsum sunt!
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center mx-auto max-w-[1280px] min-[503px]:px-2 py-[50px]">
        <h1 className="xl:text-[64px] text-[35px] text-left leading-tight">
          We Offer Home Renovation Services
        </h1>
        <h2>Creating One-of-a-Kind Homes</h2>
        <div className="h-[7px] w-[100px] min-[652px]:w-[166px] bg-[#941B0C] rounded-[8px] mt-2"></div>
        <div className="grid w-[90%] min-h-[550px] grid-cols-4 grid-rows-2 gap-2 mt-6">
          <ServiceRemoCard
            href={"/remo/construction"}
            title={"Construction"}
            icon={<IconBackhoe color="#941B0C" size={70} />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </ServiceRemoCard>
          <ServiceRemoCard
            href={"#"}
            title={"Remodeling"}
            icon={<IconPaint color="#941B0C" size={70} />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </ServiceRemoCard>
          <ServiceRemoCard
            href={"/remo/electrical"}
            title={"Electrical"}
            icon={<IconBolt color="#941B0C" size={70} />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </ServiceRemoCard>
          <ServiceRemoCard
            href={"#"}
            title={"Plumbing"}
            icon={<IconTool color="#941B0C" size={70} />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </ServiceRemoCard>
          <ServiceRemoCard
            href={"#"}
            title={"Project Management"}
            icon={<IconClipboard color="#941B0C" size={70} />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </ServiceRemoCard>
          <ServiceRemoCard
            href={"#"}
            title={"Patio"}
            icon={<IconLeaf color="#941B0C" size={70} />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </ServiceRemoCard>
          <ServiceRemoCard
            href={"#"}
            title={"Concrete"}
            icon={<IconGardenCart color="#941B0C" size={70} />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </ServiceRemoCard>
          <ServiceRemoCard
            href={"#"}
            title={"A/C"}
            icon={<IconWind color="#941B0C" size={70} />}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </ServiceRemoCard>
        </div>
      </section>
    </main>
  );
}
