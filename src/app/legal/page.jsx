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
        "Obtaining the Multiple Migratory Forms or Tourist Cards from Mexico is an essential legal obligation for individuals who are not Mexican citizens and intend to enter the country temporarily. ",
      source: "/assets/immigrationservices.jpg",
      linkTitle: "Take a look",
      href: "/legal/immigration-services",
    },
    {
      id: 3,
      title: "Property Regularization",
      subtitle:
        "The process of property regularization involves navigating through various legal requirements and administrative procedures to ensure that your property is recognized and documented appropriately under the law.",
      source: "/assets/propertyregularization.jpg",
      linkTitle: "Take a look",
      href: "/legal/property-regularization",
    },
    {
      id: 4,
      title: "Property Acquisition",
      subtitle:
        "Ensuring the right procedure is followed when acquiring property, whether you're a Mexican national or a foreigner, is paramount for a smooth and legally sound transaction. ",
      source: "/assets/propertyadquisition.jpg",
      linkTitle: "Take a look",
      href: "/legal/property-acquisition",
    },
    {
      id: 5,
      title: "Court Representation",
      subtitle:
        " Our experienced team of attorneys specializes in providing comprehensive representation across a wide range of legal matters.",
      source: "/assets/courtrepresentation.jpg",
      linkTitle: "Take a look",
      href: "/legal/court-representation",
    },
    {
      id: 6,
      title: "Legal Consulting",
      subtitle:
        "PB+ Legal offers comprehensive consulting services to address a wide range of legal needs and challenges.",
      source: "/assets/legalconsulting.jpg",
      linkTitle: "Take a look",
      href: "/legal/legal-consulting",
    },
    {
      id: 7,
      title: "Formation of Companies",
      subtitle:
        "PB+ Legal offers a comprehensive service for the formation of companies, providing expert guidance and support to entrepreneurs, startups, and businesses of all sizes.",
      source: "/assets/formationofcompanies.jpg",
      linkTitle: "Take a look",
      href: "/legal/formation-of-companies",
    },
    {
      id: 8,
      title: "Funeral Arrangements",
      subtitle:
        "Our service is designed to provide comprehensive support and guidance in documenting your final wishes, including instructions for funeral arrangements, distribution of assets, appointment of guardianship for minors, and any other important considerations you may have.",
      source: "/assets/funeralarrangements.jpg",
      linkTitle: "Take a look",
      href: "/legal/funeral-arrangements",
    },
    {
      id: 9,
      title: "Other Legal Services",
      subtitle:
        "In PB+ Legal, we understand the importance of finding the right solutions to your legal challenges. Whether you're facing complex business transactions, navigating personal legal matters, or seeking guidance on compliance and regulatory issues, we are here to help.",
      source: "/assets/otherlegalservices.jpg",
      linkTitle: "Take a look",
      href: "/legal/other-services",
    },
  ];
  return (
    <main className={`bg-white xl:pt-[50px] ${roboto.className}`}>
      <Slider dataSlider={dataSlider} />

      <section className="w-full flex flex-col justify-center p-4 xl:flex-row xl:w-[1100px] xl:mx-auto xl:my-16">
        <div className="w-full text-start xl:w-[50%]">
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
        <div className="xl:w-[50%] my-8 grid grid-cols-3 grid-rows-2 gap-2">
          <div className="relative rounded-sm shadow-md  overflow-hidden">
            <Image
              src="/assets/legal/lawyer-arturo-jr.webp"
              alt="photo"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50">
              <p className="text-white text-center text-xs xl:text-sm p-2">
                Lic. Arturo Rivera JR
              </p>
            </div>
          </div>
          <div className="relative rounded-sm shadow-md  overflow-hidden">
            <Image
              src="/assets/legal/lawyer-arturo.webp"
              alt="photo"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50">
              <p className="text-white text-center text-xs xl:text-sm p-2">
                Lic. Arturo R. Pozo
              </p>
            </div>
          </div>
          <div className="relative rounded-sm shadow-md  overflow-hidden">
            <Image
              src="/assets/legal/lawyer-tatiana.webp"
              alt="photo"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50">
              <p className="text-white text-center text-xs xl:text-sm p-2">Lic. Tatiana G. Fischer</p>
            </div>
          </div>
          <div className="relative rounded-sm shadow-md  overflow-hidden bg-gray-300">
            {/* <Image
              src="/assets/lawyer3.jpeg"
              alt="photo"
              layout="fill"
              objectFit="cover"
            /> */}
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50">
              <p className="text-white text-center text-xs xl:text-sm p-2">Lic. Platero</p>
            </div>
          </div>
          <div className="relative w-full h-0 pb-[50%] lg:w-200 lg:h-32 col-span-2">
            <Image
              src="/assets/legal/legal-poder-judicial.webp"
              alt="photo"
              layout="fill"
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
              src="/assets/legal/legal-practice-areas.webp"
              width={450}
              height={200}
              alt="services photo"
              className="rounded-md"
            />
          </div>
        </div>

        <div className="w-full xl:w-[60%] grid grid-cols-2 grid-rows-2 gap-2 h-full">
          <ServiceLegalCard
            href={"/legal/immigration-services"}
            title={"Immigration Services"}
          ></ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/property-regularization"}
            title={"Property Regularization"}
          ></ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/property-acquisition"}
            title={"Property Acquisition"}
          ></ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/court-representation"}
            title={"Court Representation"}
          ></ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/legal-consulting"}
            title={"Legal Consulting"}
          ></ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/formation-of-companies"}
            title={"Formation Of Companies"}
          ></ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/funeral-arrangements"}
            title={"Funeral Arrangements"}
          ></ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/other-services"}
            title={"Other Legal Services"}
          ></ServiceLegalCard>
        </div>
      </section>

      <ContactForm />
    </main>
  );
};

export default Page;
