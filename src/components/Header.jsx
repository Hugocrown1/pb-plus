"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
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
            <div className="relative flex items-center pl-5 z-10 gap-4">
              {session ? (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                </button>
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
              {/* <DropdownMenu isOpen={isMenuOpen} ref={menuRef}>
                <li>
                  <Link
                    className="flex px-2 py-1 hover:bg-gray-600/15"
                    href={"/account"}
                  >
                    Account
                  </Link>
                </li>

                <li>
                  <button
                    className="flex w-full px-2 py-1  hover:bg-gray-600/15"
                    onClick={() => signOut()}
                  >
                    Log out
                  </button>
                </li>
              </DropdownMenu> */}

              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="flex flex-col dropdown-menu shadow-sm"
                >
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Link
                        className="flex px-2 py-1 hover:bg-gray-600/15"
                        href={"/account"}
                      >
                        Account
                      </Link>
                    </li>

                    <li>
                      <button
                        className="flex w-full px-2 py-1  hover:bg-gray-600/15"
                        onClick={() => signOut()}
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
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
