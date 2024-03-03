"use client";
import { useState, useEffect } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import { Baskervville } from "next/font/google";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();

  const getFooterInfo = (path) => {
    let logo,
      title,
      subtitle,
      banner,
      department = "";

    if (path.includes("real-estate")) {
      logo = "/assets/logorealestate.png";
      title = "PB+ REAL ESTATE";
      subtitle =
        "The fundamental cornerstone of the real estate market is to ensure that no one is harmed.";
      banner = "/assets/bannerrealestate.jpg";
      department = "Real Estate Department";
    } else if (path.includes("legal")) {
      logo = "/assets/logolegal.png";
      title = "PB+ LEGAL";
      subtitle = "The fist foundation of justice is not to hurt any one.";
      banner = "/assets/bannerlegal.jpg";
      department = "Legal Department";
    } else {
      logo = "/assets/logomain.png";
      title = "PB+";
      subtitle = "Your same life but better!";
      banner = "/assets/bannermain.jpg";
      department = "Home Page";
    }

    return { logo, title, subtitle, banner,department };
  };

  const { logo, title, subtitle, banner,department } = getFooterInfo(pathname);

  const [footerLogo, setFooterLogo] = useState(logo);
  const [footerTitle, setFooterTitle] = useState(title);
  const [footerSubtitle, setFooterSubtitle] = useState(subtitle);
  const [footerBanner, setFooterBanner] = useState(banner);
  const [footerDepartment, setFooterDepartment] = useState(department);

  useEffect(() => {
    const { logo, title, subtitle, banner,department } = getFooterInfo(pathname);
    setFooterLogo(logo);
    setFooterTitle(title);
    setFooterSubtitle(subtitle);
    setFooterBanner(banner);
    setFooterDepartment(department);
  }, [pathname]);

  const [copiedText, setCopiedText] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedText(text);
        setTimeout(() => {
          setCopiedText(null);
        }, 3000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <footer className=" divide-y xl:divide-y-0 bg-[#202225] text-gray-100">
      <div className="container-footer h-44 flex flex-col xl:flex-row justify-center relative">
        <img
          src={footerBanner}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover z-0 bg-black opacity-30"
        />

        <div className="relative xl:my-auto flex flex-col xl:flex-row w-full h-16 justify-center z-10">
          <span className="text-md xl:text-2xl font-semibold mt-4  text-center xl:w-1/3">
            SUBSCRIBE TO OUR PUNTA BANDA COMMUNITY
          </span>
          <div className="flex xl:w-1/3">
            <input
              type="text"
              name=""
              placeholder="Email address"
              id=""
              className="my-4 px-4 w-[70%] rounded-none rounded-s-md text-gray-950"
            />
            <button className="bg-blue-600 my-4 w-[30%] rounded-e-md text-sm font-semibold">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className="container-footer px-4 flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="xl:w-1/3 w-full flex">
          <a
            href="#"
            className="flex justify-center space-x-3 xl:justify-end w-[45%] self-center"
          >
            <img src={footerLogo} alt="" className="h-32" />
          </a>
          <div className="flex flex-col w-[55%] justify-center">
            <span className="text-2xl xl:text-4xl font-semibold">
              {footerTitle}
            </span>
            <p className="xl:w-3/4 text-base font-semibold">{footerSubtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-50 font-bold text-lg">
              PB PLUS
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/">
                  <p className="hover:text-[#cba557]">Home</p>
                </Link>
              </li>
              <li>
                <Link href="/remo">
                  <p className="hover:text-[#cba557]">Remo</p>
                </Link>
              </li>
              <li>
                <Link href="/real-estate">
                  <p className="hover:text-[#cba557]">Real Estate</p>
                </Link>
              </li>
              <li>
                <Link href="/legal">
                  <p className="hover:text-[#cba557]">Legal</p>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <p className="hover:text-[#cba557]">Community</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-50 font-bold text-lg">
              SERVICES
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/remo">
                  <p className="hover:text-[#cba557]">Home Remodelation</p>
                </Link>
              </li>
              <li>
                <Link href="/community">
                  <p className="hover:text-[#cba557]">Community Advertising</p>
                </Link>
              </li>
              <li>
                <Link href="/real-estate/houses-&-properties">
                  <p className="hover:text-[#cba557]">
                    Real Estate Sale & Renting
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/legal#learnmore">
                  <p className="hover:text-[#cba557]">
                    Legal Counseling & Representation
                  </p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-50 font-bold text-lg">
              CONTACTS
            </h3>
            <div className="flex flex-col">
              <span className="text-sm text-start">
                Email:
                <p
                  className="text-[#cba557] cursor-pointer"
                  onClick={() => copyToClipboard("info@pbplus.com.mx")}
                >
                  info@pbplus.com.mx
                </p>
              </span>
              <span className="text-sm text-start">
                Number:
                <p
                  className="text-[#cba557] cursor-pointer"
                  onClick={() => copyToClipboard("+52(646) 123 4567")}
                >
                  +52(646) 123 4567
                </p>
              </span>
              <span className="text-sm text-start">
                Address:
                <p
                  className="text-[#cba557] cursor-pointer"
                  onClick={() =>
                    copyToClipboard(
                      "Km 10.5 Carretera La Bufadora Coronel Esteban Cantú, 22794 Ensenada, B.C."
                    )
                  }
                >
                  Km 10.5 Carretera La Bufadora Coronel Esteban Cantú, 22794
                  Ensenada, B.C.
                </p>
              </span>
            </div>
            {copiedText && (
              <p className="text-green-500">
                Copied {copiedText} to clipboard!
              </p>
            )}
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-50 font-bold text-lg">
              FOLLOW
            </div>
            <div className="flex justify-start space-x-3">
              <a href="#" title="Facebook" className="flex items-center p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current hover:text-[#cba557]"
                >
                  <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                </svg>
              </a>
              <a href="#" title="Twitter" className="flex items-center p-1">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current hover:text-[#cba557]"
                >
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                </svg>
              </a>
              <a href="#" title="Instagram" className="flex items-center p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5 fill-current hover:text-[#cba557]"
                >
                  <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-2 bg-gradient-to-r from-yellow-300 to-orange-500"></div>
      <div className="bg-black flex justify-between py-4 px-2 xl:px-4">
        <p className="xl:p-4 py-4 text-sm xl:text-base">
          Ensenada Baja California <br />
          La Bufadora Road Ejido Esteban Cantu KM 10.5 <br />
          P.O. 22794 Space #5 <br />
          info@pbplus.com.mx +52(646) 148 4412
        </p>
        <div className="flex flex-col xl:flex-row">
          <img
            src="/assets/footerlogo.png"
            alt=""
            className="h-14 xl:h-32"
          />
          <div className="flex flex-col pl-2">
            <p className="text-white text-[40px] xl:text-[70px] font-bold font-serif -mb-4">
              PB+
            </p>
            <p className="font-semibold text-[10px] xl:text-[20px] font-serif text-ju">
              {footerDepartment}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
