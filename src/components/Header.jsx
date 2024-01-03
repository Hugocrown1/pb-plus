"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();
  const routes = [
    {
      route: "/",
      name: "HOME",
    },
    {
      route: "/remo",
      name: "REMO",
    },
    {
      route: "/real-estate",
      name: "REAL ESTATE",
    },
    {
      route: "/legal",
      name: "LEGAL",
    },
    {
      route: "/events",
      name: "EVENTS",
    },
  ];
  return (
    <header className="bg-[#941B0C] overflow-hidden">
      <div className="relative flex h-[60px] min-w-[1200px] w-[1200px] justify-between px-[15px] mx-auto">
        <Link
          href={"/"}
          className="text-white font-semibold text-3xl flex items-center"
        >
          PB+
        </Link>
        <div className="flex gap-2">
          <nav className="flex">
            <ul className="flex flex-row items-center">
              {routes.map((route, index) => (
                <li key={index} className="h-full">
                  <Link
                    href={route.route}
                    className="font-semibold h-full flex items-center transition-colors text-white  hover:text-[#941B0C] hover:bg-white px-4"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="relative flex  w-[250px] h-full">
            <div className="flex items-center pl-5 z-10 gap-4">
              {session ? (
                <Link
                  href={"/account"}
                  className="flex flex-row items-center gap-2  rounded-full overflow-hidden h-[48px] p-2 border-[1px] border-white/40 hover:border-white transition-colors"
                >
                  <img
                    src={session.user?.image}
                    height={36}
                    width={36}
                    className="rounded-full"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu-2"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="gray"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 6l16 0" />
                    <path d="M4 12l16 0" />
                    <path d="M4 18l16 0" />
                  </svg>
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/signup"
                    className="px-6 py-1 rounded-[10px] border-2 font-semibold text-base min-w-[125px]  text-[#0A100D] transition-colors border-[#FFC65A] bg-[#F6AA1C] hover:bg-[#FFC65A] hover:border-[#F6AA1C] text-center"
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/auth/login"
                    className="px-6 py-1 rounded-[10px] border-2 font-semibold text-base min-w-[125px] transition-colors text-white hover:bg-white hover:text-black text-center"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
            <div className="absolute w-[5000px] bg-[#0A100D] h-full z-0 "></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
