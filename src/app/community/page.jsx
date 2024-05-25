import Slider from "@/components/Slider/Slider";
import Image from "next/image";
import { IconCalendarStats, IconToolsKitchen } from "@tabler/icons-react";
import ServiceCommunityCard from "@/components/ServiceCommunityCard";

export const metadata = {
  title: "PB+ Community",
  description: "PB+ Community: The space for the Punta Banda community.",
};

const dataSlider = [
  {
    id: 1,
    title: "PB+ COMMUNITY",
    subtitle:
      "The PB+ Community initiative embodies our commitment to social responsibility, collaboration, and meaningful engagement. ",

    source: "/assets/community/slider1.png",
    linkTitle: "Take a look",
    href: "/community/events",
  },
  {
    id: 2,
    title: "Make This Beautiful Place Your New Home",
    subtitle:
      "Punta banda community is a beautiful place to invest and enjoy the plans of achievement you have made in you life.",
    source: "/assets/community/slider2.png",
    linkTitle: "Take a look",
    href: "/community/advertising",
  },
  {
    id: 3,
    title: "Share Your Business With The Community",
    subtitle:
      "We provide a space for you to publish your business ideas, menu, schedule, and great deal you want the community to know.",
    source: "/assets/community/slider3.png",
    linkTitle: "Take a look",
    href: "/community/advertising",
  },
  {
    id: 4,
    title: "PB+ Will Be There For You!",
    subtitle:
      "We provide the services you need to just enjoy your life time; Legal service for any question you have about anything you need for you to have peace.",
    source: "/assets/community/slider4.JPG",
    linkTitle: "Take a look",
    href: "/community/advertising",
  },
  {
    id: 5,
    title: "This is Your Website",
    subtitle:
      "You can ad anything you want the community to know, events, gatherings, sales, rentals, or a service you have to share.",
    source: "/assets/community/slider5.png",
    linkTitle: "Take a look",
    href: "/community/advertising",
  },
];

export default function Page() {
  return (
    <main className={`bg-[#f5f3f4]  xl:pt-[50px] mb-8`}>
      <Slider dataSlider={dataSlider} />
      <section
        id="about"
        className="flex flex-col w-full pt-[25px] mb-8 items-center"
      >
        <header className="flex flex-col items-center">
          <h1 className="xl:text-[64px] text-[42px]">Punta Banda Community</h1>
          <span className="text-[#5e5e5e] font-medium xl:text-lg texl-base xl:w-[820px] text-center mx-2">
            The space for the Punta Banda community
          </span>
          <div className="w-[100px] h-1 bg-[#0077b6] my-4"></div>
        </header>

        <div className="w-full h-fit items-center justify-center gap-x-4 max-w-[1280px] mx-auto mt-4 px-4">
          <figure className="relative w-[210px] h-[210px] xl:w-[500px] xl:h-[500px]  circle-shape bg-black xl:mr-12 m-4 float-left ">
            <Image
              loading="lazy"
              src="/assets/events.webp"
              alt="photo community"
              fill={true}
              className="circle-shape object-cover"
            />
          </figure>
          <p className=" font-medium xl:text-lg text-sm max-w-[70ch] xl:ml-80">
            Welcome to PB Plus Community, your go-to resource for staying
            connected and informed about events and restaurants in the lively
            Punta Banda neighborhood! At PB Plus Community, our mission is to
            foster a strong sense of belonging and engagement among residents
            and visitors alike by keeping you up-to-date with the latest
            happenings and dining options in Punta Banda.
          </p>
          <p className="font-medium xl:text-lg text-sm max-w-[70ch] xl:ml-80 hidden xl:block">
            Through our user-friendly platform, you'll have easy access to a
            diverse array of upcoming events, ranging from local gatherings to
            cultural festivals and beyond. Whether you're a seasoned local or a
            newcomer to the area, PB Plus Community ensures that you're always
            in the know about the best things to do in Punta Banda.
          </p>
          <p className="font-medium xl:text-lg text-sm max-w-[70ch] mt-4 xl:ml-80">
            Feeling hungry? Let PB Plus Community guide you to the perfect
            dining experience! Explore a curated selection of restaurants
            offering delectable dishes that cater to every taste and preference.
            Join us in building connections and fostering a sense of community
            as we explore the rich culture, diverse cuisine, and exciting events
            that make Punta Banda so special.
          </p>
        </div>
      </section>
      <section
        id="services"
        className="flex flex-col justify-center mt-10 xl:max-w-[1280px] mx-auto mb-24 px-4"
      >
        <header className="flex flex-col items-center">
          <h1 className="xl:text-[64px] text-[42px]">Our Community Services</h1>
          <span className="text-[#5e5e5e] font-medium xl:text-lg texl-base xl:w-[820px] text-center mx-2">
            Let PB Plus Publish Your Events And Advertise Your Business
          </span>
          <div className="w-[100px] h-1 bg-[#0077b6] my-4"></div>
        </header>
        <div className="flex xl:flex-row flex-col  justify-center gap-x-8 py-4 xl:text-right">
          <div className="flex flex-col w-full gap-y-4 text-[18px] text-pretty">
            <p className="xl:text-lg text-sm pb-2">
              Promote your restaurant to a targeted audience of food enthusiasts
              and locals. Showcase your unique menu, special offers, and dining
              ambiance on our platform. Gain visibility and drive foot traffic
              to your establishment with our effective restaurant advertising
              solutions.
            </p>
            <p className="xl:text-lg text-sm pb-2">
              Planning an event in Punta Banda? Share it with the community
              through PB Plus Community. Whether it's a music concert, art
              exhibition, food festival, or charity event, we'll help you reach
              a wider audience. Increase attendance and participation by
              leveraging our event publication services.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3  w-full h-full min-[400px]:px-4 xl:px-0 ">
            <ServiceCommunityCard
              href={"/community/events"}
              title={"Events"}
              icon={<IconCalendarStats size={70} color="#0077b6" />}
            ></ServiceCommunityCard>
            <ServiceCommunityCard
              href={"/community/advertising"}
              title={"Advertising"}
              icon={<IconToolsKitchen size={70} color="#0077b6" />}
            ></ServiceCommunityCard>
          </div>
        </div>
      </section>
    </main>
  );
}
