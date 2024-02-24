"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IconX, IconMenu2 } from "@tabler/icons-react";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [headerTheme, setHeaderTheme] = useState("");

  useEffect(() => {
    setHeaderTheme(setHeaderStyle(pathname));
  }, [pathname]);

  const setHeaderStyle = (path) => (
    path.includes("real-estate") ? "theme-real-estate" :
    path.includes("legal") ? "theme-legal" :
    ""
  );

  const routes = [
    { route: "/", name: "HOME" },
    { route: "/remo", name: "REMO" },
    { route: "/real-estate", name: "REAL ESTATE" },
    { route: "/legal", name: "LEGAL" },
    { route: "/events", name: "COMMUNITY" },
  ];

  const toggleMenu = () => setOpen(!open);

  return (
    <header className={headerTheme}>
      <div className="bg-[var(--color-primary)] max-h-[60px] fixed overflow-x-clip z-20 w-screen border-b-2 border-[var(--color-header-border)]">
        <div className="relative flex h-[60px] xl:w-[1200px] justify-between px-[15px] mx-auto">
          <Link href={"/"} className="text-[var(--color-logo)] font-semibold text-3xl flex items-center">
            PB+
          </Link>
          <div className="flex gap-2">
            <div onClick={toggleMenu} className="text-3xl absolute right-8 top-5 cursor-pointer xl:hidden">
              {open ? <IconX className="text-white" /> : <IconMenu2 className="text-white" />}
            </div>
            <nav className="flex z-20">
              <ul className={`xl:flex xl:items-center bg-[var(--color-primary)] border-b-2 border-[var(--color-header-border)] xl:pb-0 absolute xl:static xl:z-auto left-0 w-full xl:w-auto xl:pl-0 px-8 ${open ? "top-16" : "top-[-490px]"} `}>
                {routes.map((route, index) => (
                  <li key={index} className="h-[90%]">
                    <Link onClick={toggleMenu} href={route.route} className="font-semibold h-full flex items-center transition-colors text-[var(--color-text-primary)] hover:text-[var(--color-primary-accent)] hover:bg-white px-4 xl:my-0 my-4">
                      {route.name}
                    </Link>
                  </li>
                ))}
                <div className="xl:hidden  flex justify-center" onClick={toggleMenu}>
                  <UserMenu />
                </div>
              </ul>
            </nav>
            <div className="relative xl:flex w-[250px] h-full hidden">
              <UserMenu />
              <div className="absolute w-[5000px] border-b-2 border-[var(--color-header-border)] bg-[var(--color-secondary)] transition-colors h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

