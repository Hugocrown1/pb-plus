import DepartmentCard from "@/components/DepartmentCard";
import GridGallery from "@/components/GridGallery";
import HomeHero from "@/components/HomeHero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-col  min-h-screen items-center ">
      <HomeHero />

      <section
        id="departments"
        className="flex flex-col justify-center items-center my-4"
      >
        <h1 className="">Meet Our Departments Services</h1>
        <h2>Let's do it right!</h2>

        <div className="h-[7px] w-[100px] min-[652px]:w-[166px] bg-[#941B0C] rounded-[8px] mt-2"></div>

        <div className="relative grid grid-cols-1 min-[726px]:grid-cols-2 min-[1450px]:grid-cols-4 max-w-[1440px] my-12">
          <DepartmentCard
            title={"PB+ REMO"}
            src={"/assets/remo.jpg"}
            href={"/remo"}
          >
            PB+ Remo specializes in overseeing and executing construction
            projects with precision and expertise.
          </DepartmentCard>
          <DepartmentCard
            title={"PB+ REAL ESTATE"}
            src={"/assets/tweaks/real-estate.PNG"}
            href={"/real-estate"}
          >
            PB+ Real Estate Department is your gateway to unparalleled property
            solutions tailored to your needs and aspirations.
          </DepartmentCard>
          <DepartmentCard
            title={"PB+ LEGAL"}
            src={"/assets/legal.jpg"}
            href={"/legal"}
          >
            PB+ Legal Department is your dedicated partner in navigating the
            complex and dynamic landscape of legal matters with precision and
            expertise.
          </DepartmentCard>
          <DepartmentCard
            title={"PB+ COMMUNITY"}
            src={"/assets/tweaks/community.PNG"}
            href={"/community"}
          >
            PB+ Community initiative embodies our commitment to social
            responsibility, collaboration, and meaningful engagement.
          </DepartmentCard>
        </div>
      </section>
      <section
        id="about"
        className="flex flex-col items-center min-[1400px]:items-start justify-center min-[1400px]:flex-row max-w-[1440px] gap-4 mb-40 px-2 min-[1449px]:px-0 "
      >
        <div className="relative w-full min-[652px]:w-[80%] min-[1400px]:w-[50%] ">
          <GridGallery />
        </div>
        <div className="flex flex-col w-full min-[1400px]:w-[50%]">
          <h1 className="-mb-4 text-center min-[1400px]:text-left w-full">
            What Is PB PLUS?
          </h1>
          <h2 className="text-center min-[1400px]:text-left w-full">
            We offer services for the punta banda community
          </h2>
          <div className="h-[7px] w-[100px] min-[652px]:w-[166px] bg-[#941B0C] rounded-[8px] mt-2 mx-auto min-[1400px]:mx-0"></div>
          <p className="text-[17px] mt-6">
            Punta Banda Plus is a company that was born in Ensenada Baja
            California, at the Punta Banda area to provide multi services to the
            community. PB+ is a company that wants to improve the local
            community, and earn the trust of the people that what to make this
            place their home
          </p>
        </div>
      </section>
    </main>
  );
}
