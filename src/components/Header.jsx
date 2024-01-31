"use client";
import Link from "next/link";
import React, { useState } from "react";

import UserMenu from "./UserMenu";

const Header = () => {
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

  const [fix, setFix] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 69) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener("scroll", setFixed);
  return (
    <header>
      <div
        className={`${
          fix ? "navbar fixed" : "navbar fixed"
        } max-h-[60px] overflow-x-clip z-20`}
      >
        <div className="relative flex h-[60px] min-w-[1200px] w-[1200px] justify-between px-[15px] mx-auto">
          <Link
            href={"/"}
            className="text-white font-semibold text-3xl flex items-center"
          >
            PB+
          </Link>
          <div className="flex gap-2">
            <nav className="flex z-20">
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
            <div className="relative flex  w-[250px] h-full ">
              <UserMenu />
              <div
                className={`absolute w-[5000px] 
                  bg-[#0A100D]
                 transition-colors h-full`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
