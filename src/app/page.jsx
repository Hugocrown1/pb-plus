import DepartmentCard from "@/components/DepartmentCard";
import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <main className="flex-grow min-h-screen ">
      <HomeHero />

      <section className="flex flex-col justify-center items-center my-4">
        <h1>Meet Our Departments Services</h1>
        <h2>Let's do it right!</h2>

        <div className="h-[7px] w-[166px] bg-[#941B0C] rounded-[8px] mt-2"></div>

        <div className="relative grid grid-cols-4 w-[1440px] my-12">
          <DepartmentCard
            title={"PB+ REMO"}
            src={"/assets/remo.jpg"}
            href={"/remo"}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            ad excepturi ducimus magni
          </DepartmentCard>
          <DepartmentCard
            title={"PB+ REAL ESTATE"}
            src={"/assets/real_estate.jpg"}
            href={"/real-estate"}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            ad excepturi ducimus magni
          </DepartmentCard>
          <DepartmentCard
            title={"PB+ LEGAR"}
            src={"/assets/legal.jpg"}
            href={"/legal"}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            ad excepturi ducimus magni
          </DepartmentCard>
          <DepartmentCard
            title={"PB+ EVENTS"}
            src={"/assets/events.jpg"}
            href={"/events"}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            ad excepturi ducimus magni
          </DepartmentCard>
        </div>
      </section>
    </main>
  );
}
