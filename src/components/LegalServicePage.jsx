"use client";
import { Libre_Baskerville, Roboto } from "next/font/google";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { usePathname } from "next/navigation";

const roboto = Libre_Baskerville({ subsets: ["latin"], weight: "400" });

const Page = ({ service }) => {
  const pathname = usePathname();
  const links = [
    { href: "/legal/immigration-services", label: "Immigration Services" },
    {
      href: "/legal/property-regularization",
      label: "Property Regularization",
    },
    { href: "/legal/property-acquisition", label: "Property Acquisition" },
    { href: "/legal/court-representation", label: "Court Representation" },
    { href: "/legal/legal-consulting", label: "Legal Consulting" },
    { href: "/legal/formation-of-companies", label: "Formation Of Companies" },
    { href: "/legal/funeral-arrangements", label: "Funeral Arrangements" },
    { href: "/legal/other-services", label: "Other Legal Services" },
  ];
  return (
    <main className={`bg-[#f5f3f4]`}>
      <div className="xl:mx-56 ">
        <section className="flex w-full relative">
          <div className="relative flex items-start justify-start h-[600px] bg-gray-200 w-full">
            <div className="flex flex-col gap-4 text-gray-900 text-left z-10 w-3/4 absolute top-0 left-0 ml-4 mt-4">
              <h1
                className={`text-white text-left text-[35px] xl:text-[45px] leading-tight mx-8 my-24 w-1/2 ${roboto.className}`}
              >
                {service.mainTitle}
              </h1>
            </div>

            <div className="relative h-full w-full bg-black">
              <img
                src={service.banner}
                className="absolute object-cover h-full w-full"
                alt="Background"
              />
              <div className="absolute h-full w-full bg-black opacity-60 blur-[2px] left-0"></div>
            </div>

            <div className="flex gap-2 absolute bottom-0 left-0 mb-4 px-4 xl:px-8">
              <Link href={"#contactus"}>
                <p className="px-8 xl:px-16 py-3 border border-[#cba557] font-semibold text-sm text-white transition-colors bg-[#cba557] hover:bg-[#534220]">
                  Contact Us
                </p>
              </Link>
              <Link href={"#learnmore"}>
                <p className="px-8 xl:px-16 py-3 border border-[#cba557]  font-semibold text-sm text-white transition-colors hover:bg-[#cba557] hover:text-white">
                  Learn More
                </p>
              </Link>
            </div>
          </div>
        </section>
        <section id="learnmore" className="flex my-8 flex-col xl:flex-row">
          <div className="xl:w-[25%] xl:mr-4">
            <div className="bg-white rounded-md mt-8 py-2 shadow-md text-xl">
              <ul>
                <li key={service.id} className="mx-8">
                  <div className="w-[50px] h-1 bg-[#cba557] mt-8"></div>

                  <h3 className=" my-4">{service.title}</h3>
                  <ul className=" text-gray-700 ">
                    {service.subtitles.map((subtitle) => (
                      <li key={subtitle.id}>
                        <Link href={`#${subtitle.id}`}>
                          <p className="cursor-pointer transition duration-300 transform hover:scale-105 hover:bg-[#cba557] hover:text-white p-1 rounded-md">
                            {subtitle.title}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-md mt-8 py-2 shadow-md text-xl">
              <div className="w-[50px] h-1 bg-[#cba557] mt-8 mx-8"></div>
              <h3 className="mx-8 my-4">Our Practice Areas</h3>
              <ul className="list-none mx-8 ">
                {links.map(({ href, label }) =>
                  pathname.includes(href) ? null : (
                    <li key={href} className="mb-2">
                      <Link href={href}>
                        <p className="text-gray-700 cursor-pointer transition duration-300 transform hover:scale-105 hover:bg-[#cba557] hover:text-white p-1 rounded-md">
                          {label}
                        </p>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="xl:w-[75%]" id="learnmore">
            <div
              key={service.id}
              id={service.id}
              className="bg-white rounded-md my-2 xl:my-8 py-2 shadow-md"
            >
              <div className="w-[100px] h-1 bg-[#cba557] mt-8 mx-8"></div>
              <h1 className="text-gray-900 text-left text-xl xl:text-3xl mx-8">
                {service.title}
              </h1>
              <p className="text-md xl:text-base px-8 w-full xl:w-2/3 my-4 text-justify">
                {service.content}
              </p>
              <div className="flex justify-between">
                <img
                  src={service.imagen}
                  alt=""
                  className="w-[48%] mx-auto rounded-md"
                />
                <img
                  src={service.imagen}
                  alt=""
                  className="w-[48%] mx-auto rounded-md"
                />
              </div>
              {service.subtitles.map((subtitle) => (
                <div key={subtitle.id} id={subtitle.id} className="bg-white">
                  <div className="w-[50px] h-1 bg-[#cba557] mt-8 mx-8"></div>
                  <h2 className="text-gray-900 text-left text-xl xl:text-3xl mx-8 mt-8">
                    {subtitle.title}
                  </h2>
                  <p className="text-md xl:text-base  px-8 w-full xl:w-2/3 my-4 text-justify">
                    {subtitle.content}
                  </p>
                  <div className="flex mx-4">
                    <img
                      src={subtitle.image}
                      alt=""
                      className="w-[48%] mx-auto rounded-md"
                    />
                    <img
                      src={subtitle.image2}
                      alt=""
                      className="w-[48%] mx-auto rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <ContactForm />
    </main>
  );
};

export default Page;
