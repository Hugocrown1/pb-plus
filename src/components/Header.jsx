"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";

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
      name: "COMMUNITY",
    },
  ];

  const pathname = usePathname();

  // const [fix, setFix] = useState(false);
  const [headerTheme, setHeaderTheme] = useState("");

  const setHeaderStyle = (path) => {
    if (path.includes("real-estate")) {
      return "theme-real-estate";
    } else if (path.includes("legal")) {
      return "theme-legal";
    } else {
      return "";
    }
  };

  useEffect(() => {
    setHeaderTheme(setHeaderStyle(pathname));
  }, [pathname]);

  // const setFixed = () => {
  //   if (window.scrollY >= 69) {
  //     setFix(true);
  //   } else {
  //     setFix(false);
  //   }
  // };

  // window.addEventListener("scroll", setFixed);

  return (
    <header className={headerTheme}>
      <div
        className={`bg-[var(--color-primary)] max-h-[60px] fixed overflow-x-clip z-20 w-full`}
      >
        <div className="relative flex h-[60px] min-w-[1200px] w-[1200px] justify-between px-[15px] mx-auto">
          <Link
            href={"/"}
            className="text-[var(--color-text-primary)] font-semibold text-3xl flex items-center"
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
                      className="font-semibold h-full flex items-center transition-colors text-[var(--color-text-primary)] hover:text-[var(--color-primary-accent)] hover:bg-white px-4"
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
                  bg-[var(--color-secondary)]
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