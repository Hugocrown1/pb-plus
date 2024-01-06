"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { IconMenu2, IconPower, IconUser } from "@tabler/icons-react";
import Spinner from "./Spinner";

const Header = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    if (session) {
      document.addEventListener("mousedown", handler);
    }

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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
    <header className="relative bg-[#941B0C] max-h-[60px] overflow-x-clip">
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
            <div className="relative flex pl-5 pb-1 pt-1 z-10 gap-4">
              {status === "loading" ? (
                <Spinner />
              ) : session ? (
                <div className="menu-container" ref={menuRef}>
                  <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="menu-trigger"
                  >
                    <img
                      src={session.user?.image}
                      height={36}
                      width={36}
                      className="rounded-full"
                    />
                    <IconMenu2 size={28} color="gray" />
                  </div>

                  <div
                    className={`flex flex-col dropdown-menu shadow-sm ${
                      isMenuOpen ? "active" : "inactive"
                    }`}
                  >
                    <ul className="flex flex-col">
                      <li onClick={() => setIsMenuOpen(false)}>
                        <Link className="dropdown-item" href={"/account"}>
                          <IconUser /> <p>Account</p>
                        </Link>
                      </li>

                      <li onClick={() => setIsMenuOpen(false)}>
                        <button
                          className="dropdown-item"
                          onClick={() => signOut()}
                        >
                          <IconPower /> <p>Log out</p>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/auth/signup"
                    className="px-6 py-1 rounded-[10px] border-2 font-semibold text-base min-w-[125px]   text-[#0A100D] transition-colors border-[#FFC65A] bg-[#F6AA1C] hover:bg-[#FFC65A] hover:border-[#F6AA1C] text-center"
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/auth/login"
                    className="px-6 py-1 rounded-[10px] border-2 font-semibold text-base min-w-[125px] transition-colors text-white hover:bg-white hover:text-black text-center"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>

            <div className="absolute w-[5000px] bg-[#0A100D] h-full "></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
