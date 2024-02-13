import { Roboto } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { IconGavel, IconHeartHandshake, IconTie } from "@tabler/icons-react";
import LegalCard from "@/components/LegalCard";
import ServiceLegalCard from "@/components/ServiceLegalCard";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

const Page = () => {
  return (
    <main className={`bg-white ${roboto.className}`}>
      <section className="flex w-full">
        <div className="relative flex items-center justify-center h-[770px] bg-black/10 w-full ">
          <div className="flex flex-col gap-4 text-white text-left z-10 w-3/4">
            <p className="text-[#ffffff] text-[100px] leading-tight">
              PB+ LEGAL
            </p>
            <p className="text-2xl">
              The first foundation of justice is not to hurt anyone
            </p>
            <div className="flex w-full gap-12 text-xl justify-start items-start font-medium">
              <Link
                href={"#contactus"}
                className="px-6 py-4 mt-4 rounded-[10px] font-medium text-lg w-[220px]   text-[#FCFFFC] transition-colors  bg-[#cba557] hover:bg-[#c29029]  text-center"
              >
                Contact Us
              </Link>
              <Link
                href={"#learnmore"}
                className="px-6 py-4 mt-4 rounded-[10px] font-medium text-lg w-[220px]   text-[#FCFFFC] transition-colors  bg-[#cba557] hover:bg-[#c29029]  text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <img
            src="/assets/legalbanner.jpeg"
            className="absolute  object-cover h-full w-full bg-black grayscale"
            alt="Background"
          />
        </div>
      </section>

      <section className="w-[1100px] h-[600px] mx-auto my-16 flex justify-center pt-16">
        <div className="w-[60%] text-start">
          <div className="w-[100px] h-1 bg-[#cba557] mb-4"></div>
          <p className="text-3xl pb-8">About Us</p>
          <p className="text-xl pb-8">PB+ Legal Law Firm</p>
          <p className="text-[#5e5e5e] font-medium text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <Link
            href={"#contactus"}
            className="px-4 py-2 rounded-[10px] font-medium text-lg w-[220px]   text-[#FCFFFC] transition-colors  bg-[#cba557] hover:bg-[#c29029]  text-center"
          >
            📧 FREE CONSULTATION
          </Link>
        </div>
        <div className="w-[40%] relative col-span-2 row-span-3 rounded-3xl overflow-hidden">
          <Image
            src="/assets/legalservices.jpg"
            alt="photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>

      <section className="bg-gray-200 w-full h-[300px] flex justify-center items-center">
        <div className="flex w-[1100px] my-16">
          <div className="mx-3">
            <LegalCard
              title={"Experience"}
              icon={<IconTie size={70} color="#D3AC2B" />}
            >
              Our decades of experience, honed our legal process so that we are
              best prepared for any and all case developments.
            </LegalCard>
          </div>
          <div className="mx-3">
            <LegalCard
              title={"Commitment"}
              icon={<IconHeartHandshake size={70} color="#D3AC2B" />}
            >
              Our firm’s commitment to professionalism, civility, and open and
              honest communication allows us to provide our clients with the
              highest level of professional service.
            </LegalCard>
          </div>
          <div className="mx-3">
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

      <section
        id="learnmore"
        className="w-[1100px] h-[600px] mx-auto my-16 flex justify-center pt-16"
      >
        <div className="w-[40%] text-start ">
          <div className="w-[100px] h-1 bg-[#cba557] mb-4"></div>
          <p className="text-3xl pb-8">Our Practice Areas</p>

          <p className="text-[#5e5e5e] font-medium text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Image
            src="/assets/lawyers.jpg"
            width={400}
            height={400}
            alt="services photo"
            className="rounded-md"
          />
        </div>

        <div className="w-[60%] grid grid-cols-2 grid-rows-4 gap-3  h-[550px] ">
          <ServiceLegalCard
            href={"/legal/services"}
            title={"Inmigration Services"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/services"}
            title={"Property Regularization"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/services"}
            title={"Property Acquisition"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/services"}
            title={"Court Representation"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard href={"/legal/services"} title={"Legal Consulting"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/services"}
            title={"Formation Of Companies"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/services"}
            title={"Funeral Arrangements"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
          <ServiceLegalCard
            href={"/legal/services"}
            title={"Other Legal Services"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </ServiceLegalCard>
        </div>
      </section>

      <section id="contactus" className="bg-gray-200 w-full h-[700px] mt-32">
        <div className="w-[1100px] h-[550px] mx-auto  flex justify-center bg-gray-200 my-32 pt-32">
          <div className="w-[30%] text-start">
            <div className="w-[100px] h-1 bg-[#cba557] mb-4"></div>
            <p className="text-3xl pb-8">Contact Us</p>

            <p className="text-[#5e5e5e] font-medium text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="w-[70%]">
            <form
              action="/enviar-consulta"
              method="post"
              className="mx-auto  p-6 rounded-md "
            >
              <label htmlFor="nombre" className="block text-gray-800   mb-2">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                className="w-full p-2 border rounded-md"
              />

              <label
                htmlFor="correo"
                className="block text-gray-800  mt-4 mb-2"
              >
                Correo electrónico:
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                required
                className="w-full p-2 border rounded-md"
              />

              <label
                htmlFor="telefono"
                className="block text-gray-800   mt-4 mb-2"
              >
                Teléfono:
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                className="w-full p-2 border rounded-md"
              />

              <label
                htmlFor="mensaje"
                className="block text-gray-800   mt-4 mb-2"
              >
                Mensaje:
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                required
                className="w-full p-2 border rounded-md"
              ></textarea>

              <button
                type="submit"
                className="my-1 px-4 py-2 rounded-[10px] font-medium text-lg w-[220px]   text-[#FCFFFC] transition-colors  bg-[#cba557] hover:bg-[#c29029]  text-center"
              >
                Enviar Consulta
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
