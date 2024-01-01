import DepartmentCard from "@/components/DepartmentCard";
import HomeHero from "@/components/HomeHero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col flex-grow min-h-screen items-center ">
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
      <section className="flex flex-row items-center w-[1440px] gap-4 mb-8 ">
        <div className="flex flex-col items-center justify-start">
          <h1 className="-mb-4">What Is PB PLUS?</h1>
          <h2>We offer services for the punta banda community</h2>
          <div className="h-[7px] w-[166px] bg-[#941B0C] rounded-[8px] mt-2"></div>
          <p className="text-[17px] mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            neque dolore architecto recusandae quas modi corporis explicabo,
            aperiam minus, soluta adipisci corrupti assumenda quos alias vitae.
            Laudantium quod obcaecati ea! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quaerat, atque. Mollitia blanditiis accusamus,
            sequi libero, explicabo laborum aut ab cupiditate ex iste veritatis
            alias odit quam architecto consequatur error iusto?
          </p>
        </div>
        <Image
          src={"/assets/handshake.jpg"}
          alt="About PB Plus image"
          width={620}
          height={300}
        />
      </section>
    </main>
  );
}
