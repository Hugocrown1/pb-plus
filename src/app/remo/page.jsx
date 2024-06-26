import CustomPage from "@/components/CustomPage";
import ServiceRemoCard from "@/components/ServiceRemoCard";
import Slider from "@/components/Slider/Slider";
import {
  IconAirConditioning,
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
import GridGallery from "@/components/GridGallery";

export const metadata = {
  title: "PB+ Remo",
  description: "PB+ Remo: Premier remodeling service for your dream home. Craftsmanship, excellence, and satisfaction.",
};

const data = [
  "/assets/remo-gallery/remo.webp",
  "/assets/remo-gallery/remo2.webp",
  "/assets/remo-gallery/remo3.webp",
  "/assets/remo-gallery/remo4.webp",
  "/assets/remo-gallery/remo5.webp",
  "/assets/remo-gallery/remo6.webp",
  "/assets/remo-gallery/remo7.webp",
  "/assets/remo-gallery/remo8.webp",
  "/assets/remo-gallery/remo9.webp",
];

const dataSlider = [
  {
    id: 1,
    title: "PB+ REMO",
    subtitle:
      "PB+ Remo Department specializes in overseeing and executing construction projects with precision and expertise.",
    source: "/assets/tweaks/remo1.PNG",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 2,
    title: "Remodelation Services Just For You",
    subtitle:
      "From the inception phase to the final delivery, our dedicated team ensures seamless coordination, timely execution, and adherence to the highest industry standards.",
    source: "/assets/tweaks/remo2.PNG",
    linkTitle: "Take a look",
    href: "#",
  },
  {
    id: 3,
    title: "Let Us Take Care Of It",
    subtitle:
      "We handle a diverse range of projects, from commercial buildings to residential complexes, with a commitment to excellence in every detail.",
    source: "/assets/tweaks/remo3.PNG",
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
        className="flex flex-col items-center min-[855px]:justify-start min-[855px]:flex-row mx-auto gap-x-8 max-w-[1280px] min-[503px]:px-2 pt-[50px]"
      >
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[60%] min-[855px]:w-full aspect-square">
          <div className="relative col-span-2 rounded-xl overflow-hidden ">
            <Image
              src={"/assets/tweaks/remo4.PNG"}
              alt="remo photo"
              fill={true}
              sizes="(min-width: 1120px) 1000px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden ">
            <Image
              src={"/assets/tweaks/remo5.PNG"}
              alt="remo photo"
              fill={true}
              sizes="(min-width: 1120px) 800px"
              className="object-cover object-center"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden ">
            <Image
              src={"/assets/tweaks/remo6.PNG"}
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
            Our comprehensive approach integrates effective project planning,
            budget management, resource allocation, and quality control,
            ensuring that each endeavor is completed efficiently and to the
            client's utmost satisfaction. With a focus on innovation and
            sustainability, we strive to deliver outstanding results that exceed
            expectations while maintaining a steadfast dedication to safety and
            environmental responsibility. Trust us to bring your vision to life
            and transform ideas into reality with professionalism, integrity,
            and unparalleled expertise.
          </p>
        </div>
      </section>
      <section
        id="about"
        className="flex flex-col items-center min-[1400px]:items-start justify-center min-[1400px]:flex-row max-w-[1280px] gap-x-8 py-12 px-2 min-[1449px]:px-0 mx-auto"
      >
        <div className="flex flex-col items-end w-full min-[1400px]:w-[50%]">
          <h1 className="-mb-4 text-center min-[1400px]:text-right w-full">
            Check Some of Our Work!
          </h1>

          <div className="h-[7px] w-[100px] min-[652px]:w-[166px] bg-[#941B0C] rounded-[8px] mt-2 mx-auto min-[1400px]:mx-0"></div>
          <p className="text-[17px] my-6 text-center min-[1400px]:text-right text-pretty">
            We are dedicated to providing unparalleled home remodeling services
            designed specifically to enhance your living spaces. Our team is
            committed to delivering exceptional craftsmanship and personalized
            attention to ensure your vision is brought to life with the highest
            quality and care.
          </p>
        </div>
        <div className="relative w-full min-[652px]:w-[80%] min-[1400px]:w-[50%] ">
          <GridGallery data={data} />
        </div>
      </section>
      <section className="flex flex-col items-center mx-auto max-w-[1280px] min-[503px]:px-2 py-[50px]">
        <h1 className="xl:text-[64px] text-[35px] text-center leading-tight">
          We Offer Home Renovation Services
        </h1>
        <h2>Creating One-of-a-Kind Homes</h2>
        <div className="h-[7px] w-[100px] min-[652px]:w-[166px] bg-[#941B0C] rounded-[8px] mt-2"></div>
        <div className="grid w-[90%] min-h-[550px] grid-cols-1 min-[525px]:grid-cols-2 min-[1067px]:grid-cols-4 grid-rows-2 gap-2 mt-6">
          <ServiceRemoCard
            href={"/remo/construction"}
            title={"Construction"}
            icon={<IconBackhoe color="#941B0C" size={70} />}
          ></ServiceRemoCard>
          <ServiceRemoCard
            href={"/remo/remodeling"}
            title={"Remodeling"}
            icon={<IconPaint color="#941B0C" size={70} />}
          ></ServiceRemoCard>
          <ServiceRemoCard
            href={"/remo/electrical"}
            title={"Electrical"}
            icon={<IconBolt color="#941B0C" size={70} />}
          ></ServiceRemoCard>
          <ServiceRemoCard
            href={"/remo/plumbing"}
            title={"Plumbing"}
            icon={<IconTool color="#941B0C" size={70} />}
          ></ServiceRemoCard>
          <ServiceRemoCard
            href={"/remo/project-management"}
            title={"Project Management"}
            icon={<IconClipboard color="#941B0C" size={70} />}
          ></ServiceRemoCard>
          <ServiceRemoCard
            href={"/remo/patio"}
            title={"Patio"}
            icon={<IconLeaf color="#941B0C" size={70} />}
          ></ServiceRemoCard>
          <ServiceRemoCard
            href={"/remo/concrete"}
            title={"Concrete"}
            icon={<IconGardenCart color="#941B0C" size={70} />}
          ></ServiceRemoCard>
          <ServiceRemoCard
            href={"/remo/air-conditioner"}
            title={"A/C"}
            icon={<IconAirConditioning color="#941B0C" size={70} />}
          ></ServiceRemoCard>
        </div>
      </section>
    </main>
  );
}
