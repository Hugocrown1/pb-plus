import { Libre_Baskerville, Roboto } from "next/font/google";
import Link from "next/link";
import { Noto_Serif } from "next/font/google";
import Image from "next/image";
import { IconGavel, IconHeartHandshake, IconTie } from "@tabler/icons-react";
import ContactForm from "@/components/ContactForm";
import LegalCard from "@/components/LegalCard";
import ServiceLegalCard from "@/components/ServiceLegalCard";
import Slider from "@/components/Slider/Slider";

const roboto = Libre_Baskerville({ subsets: ["latin"], weight: "400" });

const Page = () => {
  const dataSlider = [
    {
      id: 1,
      title: "PB+ LEGAL",
      subtitle:
        "The first foundation of justice is not to hurt anyone.  PB Plus is born with the intention of re-establishing the order and legality within a community with diverse needs.",

      source: "/assets/legar.jpeg",
      linkTitle: "Take a look",
      href: "#learnmore",
    },
    {
      id: 2,
      title: "Immigration Services",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
      source: "/assets/immigrationservices.jpg",
      linkTitle: "Take a look",
      href: "/legal/immigration-services",
    },
    {
      id: 3,
      title: "Property Regularization",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
      source: "/assets/propertyregularization.jpg",
      linkTitle: "Take a look",
      href: "/legal/property-regularization",
    },
    {
      id: 4,
      title: "Property Acquisition",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
      source: "/assets/propertyadquisition.jpg",
      linkTitle: "Take a look",
      href: "/legal/property-acquisition",
    },
    {
      id: 5,
      title: "Court Representation",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
      source: "/assets/courtrepresentation.jpg",
      linkTitle: "Take a look",
      href: "/legal/court-representation",
    },
    {
      id: 6,
      title: "Legal Consulting",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
      source: "/assets/legalconsulting.jpg",
      linkTitle: "Take a look",
      href: "/legal/legal-consulting",
    },
    {
      id: 7,
      title: "Formation of Companies",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
      source: "/assets/formationofcompanies.jpg",
      linkTitle: "Take a look",
      href: "/legal/formation-of-companies",
    },
    {
      id: 8,
      title: "Funeral Arrangements",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
      source: "/assets/funeralarrangements.jpg",
      linkTitle: "Take a look",
      href: "/legal/funeral-arrangements",
    },
    {
      id: 9,
      title: "Other Legal Services",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non deserunt recusandae quis animi natus dicta quod amet deleniti ut velit, consequatur iusto nostrum incidunt molestias consequunt",
      source: "/assets/otherlegalservices.jpg",
      linkTitle: "Take a look",
      href: "/legal/other-services",
    },
  ];
  return (
    <main className={`bg-white xl:pt-[50px] ${roboto.className}`}>
      <Slider dataSlider={dataSlider} />

      <section className="w-full flex flex-col justify-center p-4 xl:flex-row xl:w-[1100px] xl:mx-auto xl:my-16">
        <div className="w-full text-start xl:w-[60%]">
          <div className="w-[100px] h-1 bg-[#cba557] mb-4"></div>
          <p className="text-xl xl:text-3xl pb-8 font-semibold">About Us</p>
          <p className="text-lg xl:text-xl pb-8">PB+ Legal Law Firm</p>
          <p className="text-[#5e5e5e] text-sm xl:text-lg mb-4 mr-8 text-justify">
            PB Plus is born with the intention of re-establishing the order and
            legality within a community with diverse needs. Our primary aim is
            to achieve this through the proper implementation of Mexican law
            while steadfastly adhering to our principles: <br />
            <span className="font-semibold">
              "Procure justice and deliver it to everyone as a natural right."
            </span>
          </p>

          <Link
            href={"#contactus"}
            className="px-4 py-2 rounded-[10px] font-medium text-sm xl:text-lg   text-[#FCFFFC] transition-colors  bg-[#cba557] hover:bg-[#c29029]  text-center"
          >
            📧 SCHELUDE A CONSULTATION
          </Link>
        </div>
        <div className="xl:w-[40%] my-8 grid grid-cols-2 grid-rows-2 gap-4">
          <div className="relative rounded-sm shadow-md  overflow-hidden">
            <Image
              src="/assets/lawyer1.webp"
              alt="photo"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50">
              <p className="text-white text-center text-sm p-2">
                Lic. Jeff Bezos
              </p>
            </div>
          </div>
          <div className="relative rounded-sm shadow-md  overflow-hidden">
            <Image
              src="/assets/lawyer2.jpg"
              alt="photo"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50">
              <p className="text-white text-center text-sm p-2">
                Lic. Saul Goodman
              </p>
            </div>
          </div>
          <div className="relative rounded-sm shadow-md  overflow-hidden">
            <Image
              src="/assets/lawyer3.jpeg"
              alt="photo"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50">
              <p className="text-white text-center text-sm p-2">Lic. Lincoln</p>
            </div>
          </div>
          <div className="relative rounded-sm shadow-md overflow-hidden">
            <Image
              src="/assets/logojusticia.jpg"
              alt="photo"
              width={250}
              height={300}
              layout="fixed"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-200 w-full flex flex-row justify-center p-4 ">
        <div className="flex xl:flex-row xl:w-[1100px] xl:mx-auto xl:my-8">
          <div className="mx-1 w-1/3">
            <LegalCard
              title={"Experience"}
              icon={<IconTie size={70} color="#D3AC2B" />}
            >
              Our decades of experience, honed our legal process so that we are
              best prepared for any and all case developments.
            </LegalCard>
          </div>
          <div className="mx-1 w-1/3">
            <LegalCard
              title={"Commitment"}
              icon={<IconHeartHandshake size={70} color="#D3AC2B" />}
            >
              Our firm’s commitment to professionalism, civility, and open and
              honest communication allows us to provide our clients with the
              highest level of professional service.
            </LegalCard>
          </div>
          <div className="mx-1 w-1/3">
            <LegalCard
              title={"Results"}
              icon={<IconGavel size={70} color="#D3AC2B" />}
            >
              Our law office will persistently yet speedily handle your case.
              While we can't control the speed of the court's agenda, we will
              work to move your case fast.
            </LegalCard>
          </div>
        </div>
      </section>
      <div id="learnmore"></div>
      <section className="w-full flex flex-col justify-center p-4 xl:w-[1100px] xl:mx-auto xl:my-16 xl:flex-row">
        <div className="w-full xl:w-[40%] text-start">
          <div className="w-[100px] h-1 bg-[#cba557] mb-4"></div>
          <p className="text-xl pb-8 xl:text-3xl font-semibold">
            Our Practice Areas
          </p>

          <p className="text-[#5e5e5e] text-sm xl:text-lg mb-4 ">
            Explore our extensive range of legal services tailored to meet your
            specific needs.
          </p>
          <div className="flex justify-center">
            <Image
              src="/assets/lawyers.jpg"
              width={400}
              height={400}
              alt="services photo"
              className="rounded-md"
            />
          </div>
        </div>

        <div className="w-full xl:w-[60%] grid grid-cols-2 grid-rows-2 gap-2 h-full">
          <ServiceLegalCard
            href={"/legal/immigration-services"}
            title={"Immigration Services"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/property-regularization"}
            title={"Property Regularization"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/property-acquisition"}
            title={"Property Acquisition"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/court-representation"}
            title={"Court Representation"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/legal-consulting"}
            title={"Legal Consulting"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/formation-of-companies"}
            title={"Formation Of Companies"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/funeral-arrangements"}
            title={"Funeral Arrangements"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/other-services"}
            title={"Other Legal Services"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
        </div>
      </section>

      <ContactForm />
    </main>
  );
};

export default Page;
