import { Roboto } from "next/font/google";
import Link from "next/link";
import {
  IconGavel,
  IconHeartHandshake,
  IconHomeCog,
  IconTie,
  IconGrave2,
  IconFiles,
  IconQuestionMark,
  IconPlus,
  IconBriefcase,
  IconUsersGroup,
  
} from "@tabler/icons-react";
import LegalCard from "@/components/LegalCard";
import ServiceLegalCard from "@/components/ServiceLegalCard";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

const Page = () => {
  return (
    <main className={`bg-[#f5f3f4] ${roboto.className}`}>
      <section className="flex w-full">
        <div className="relative flex items-center justify-center h-[700px] bg-black/10 w-full ">
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
                className="px-6 py-4 mt-4 rounded-[10px] font-medium text-lg w-[220px]   text-[#FCFFFC] transition-colors  bg-[#D3AC2B] hover:bg-[#d3ac2bbe]  text-center"
              >
                Contact Us
              </Link>
              <Link
                href={"#learnmore"}
                className="px-6 py-4 mt-4 rounded-[10px] font-medium text-lg w-[220px]   text-[#FCFFFC] transition-colors  bg-[#D3AC2B] hover:bg-[#d3ac2bbe]  text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <img
            src="https://i.imgur.com/99mteXf.jpeg"
            className="absolute  object-cover h-full w-full bg-black grayscale"
            alt="Background"
          />
        </div>
      </section>
      <section 
      id="learnmore"
      className="flex flex-col w-full my-8 items-center">
        <p className="text-[#5e5e5e] font-medium text-lg w-[820px] text-center">
          WHY CHOOSE US
        </p>
        <h1>Why Choose Us To Handle Your Case</h1>
        <p className="text-[#5e5e5e] font-medium text-lg w-[820px] text-center">
        PB+ Law Group is a Punta Banda, Baja California Employment Law Firm
        </p>
        <div className="grid grid-cols-3 grid-rows-1 gap-3 w-[1100px] h-[275px]">
          <LegalCard
            href={"/"}
            title={"Experience"}
            icon={<IconTie size={70} color="#D3AC2B" />}
          >
            Our decades of experience, honed our legal process so that we are best prepared for any and all case developments.
          </LegalCard>
          <LegalCard
            href={"/"}
            title={"Commitment"}
            icon={<IconHeartHandshake size={70} color="#D3AC2B" />}
          >
            Our firm’s commitment to professionalism, civility, and open and honest communication allows us to provide our clients with the highest level of professional service.
          </LegalCard>
          <LegalCard
            href={"/"}
            title={"Results"}
            icon={<IconGavel size={70} color="#D3AC2B" />}
          >
            Our law office will persistently yet speedily handle your case. While we can't control the speed of the court's agenda, we will work to move your case fast
          </LegalCard>
          
        </div>
        <p className="text-[#5e5e5e] font-medium text-lg w-[820px] text-center mt-16">
          SERVICES
        </p>
        <h1>Our Areas of Practice</h1>
        <p className="text-[#5e5e5e] font-medium text-lg w-[820px] text-center">
        Experienced, Knowledgeable, Dedicated and Accessible
        </p>
        <div className="grid grid-cols-4 grid-rows-2 gap-3 w-[1100px] h-[550px] ">
        <ServiceLegalCard
            href={"/legal/services"}
            title={"Inmigration Services"}
            icon={<IconFiles size={70} color="#D3AC2B" />}
          >
            
          </ServiceLegalCard><ServiceLegalCard
            href={"/legal/services"}
            title={"Property Regularization"}
            icon={<IconHomeCog size={70} color="#D3AC2B" />}
          >
            
          </ServiceLegalCard><ServiceLegalCard
            href={"/legal/services"}
            title={"Property Acquisition"}
            icon={<IconHomeCog size={70} color="#D3AC2B" />}
          >
            
          </ServiceLegalCard><ServiceLegalCard
            href={"/legal/services"}
            title={"Court Representation"}
            icon={<IconBriefcase size={70} color="#D3AC2B" />}
          >
            
          </ServiceLegalCard><ServiceLegalCard
            href={"/legal/services"}
            title={"Legal Consulting"}
            icon={<IconQuestionMark size={70} color="#D3AC2B" />}
          >
            
          </ServiceLegalCard><ServiceLegalCard
            href={"/legal/services"}
            title={"Formation Of Companies"}
            icon={<IconUsersGroup size={70} color="#D3AC2B" />}
          >
            
          </ServiceLegalCard><ServiceLegalCard
            href={"/legal/services"}
            title={"Funeral Arrangements"}
            icon={<IconGrave2 size={70} color="#D3AC2B" />}
          >
            
          </ServiceLegalCard><ServiceLegalCard
           href={"/legal/services"}
            title={"Other Legal Services"}
            icon={<IconPlus size={70} color="#D3AC2B" />}
          >
            
          </ServiceLegalCard>
        </div>

        <p id="contactus" className="text-[#5e5e5e] font-medium text-lg w-[820px] text-center mt-16">
        GET YOUR FREE CONSULTATION TODAY
        </p>

        <div className="flex bg-[#30373F] w-[1100px] rounded-md">
          <img
            src="/assets/legal-consultation.jpg"
            alt=""
            className="w-[50%] rounded-md "
          />

          <div className="w-[50%]">
            <p className="text-white font-medium text-3xl text-center mt-16">
              Need Legal Advice?
            </p>
            <form
              
              action="/enviar-consulta"
              method="post"
              className=" mx-auto bg-[#30373F] p-6 rounded-md shadow-md"
            >
              <label htmlFor="nombre" className="block text-white  mb-2">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                className="w-full p-2 border rounded-md"
              />

              <label htmlFor="correo" className="block text-white  mt-4 mb-2">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                required
                className="w-full p-2 border rounded-md"
              />

              <label htmlFor="telefono" className="block text-white  mt-4 mb-2">
                Teléfono:
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                className="w-full p-2 border rounded-md"
              />

              <label htmlFor="mensaje" className="block text-white  mt-4 mb-2">
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
                className="mt-4 bg-[#D3AC2B] text-white p-2 rounded-md hover:bg-[#d3ac2bbe]"
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
