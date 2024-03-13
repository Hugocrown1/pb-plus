"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import {
  IconHammer,
  IconHome,
  IconHomeDollar,
  IconLogin,
  IconMenu2,
  IconPencil,
  IconPower,
  IconScale,
  IconSocial,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Spinner from "./Spinner";

const routes = [
  {
    route: "/",
    name: "Home",
    icon: <IconHome />,
  },
  {
    route: "/remo",
    name: "Remo",
    icon: <IconHammer />,
  },
  {
    route: "/real-estate",
    name: "Real Estate",
    icon: <IconHomeDollar />,
  },
  {
    route: "/legal",
    name: "Legal",
    icon: <IconScale />,
  },
  {
    route: "/community",
    name: "Community",
    icon: <IconSocial />,
  },
];

const Menu = () => {
  const pathname = usePathname();

  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // useEffect(() => {
  //   document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [isMenuOpen]);

  return (
    <>
      <button
        className="flex min-[1054px]:hidden p-2 rounded-xl border-[1px] my-auto border-white/70 text-white/70 hover:border-white h-fit w-fit hover:text-white transition-colors"
        onClick={() => setIsMenuOpen(true)}
      >
        <IconMenu2 />
      </button>
      <div
        className={`fixed flex items-end justify-end inset-0  bg-zinc-950/30 transition-transform z-40 w-full ${
          !isMenuOpen && "invisible"
        } `}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <aside
          className={`absolute p-4 flex flex-col w-[250px] min-[320px]:w-[320px] bg-[#f5f3f4] h-full rounded-l-xl overflow-auto  shadow-xl ease-out transition-all ${
            !isMenuOpen && "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full justify-between items-center mb-2 flex">
            <h2 className="text-3xl px-2  font-semibold">PB+</h2>
            <button
              className="rounded-full  hover:bg-gray-400/40 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <IconX className="cursor-pointer" size={30} />
            </button>
          </div>
          <nav>
            <hr className="w-[95%] mx-auto" />
            <ul>
              {routes.map((object, index) => (
                <li className="flex my-[2px]" key={index}>
                  <Link
                    className="flex gap-2 w-full px-2 py-1 text-lg font-bold rounded-xl hover:bg-gray-500/30 transition-colors"
                    href={object.route}
                  >
                    {object.icon}
                    <p>{object.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <hr className="w-[95%] mx-auto" />
            {status === "loading" ? (
              <div className="flex items-center justify-center w-24 aspect-square">
                <Spinner />
              </div>
            ) : session ? (
              <ul>
                <li className="flex my-[2px]">
                  <Link
                    className="flex gap-2 w-full px-2 py-1 text-lg font-bold rounded-xl hover:bg-gray-500/30 transition-colors"
                    href="/account"
                  >
                    <IconUser />
                    <p>Account</p>
                  </Link>
                </li>
                <li className="flex my-[2px]">
                  <button
                    className="flex gap-2 w-full px-2 py-1 text-lg font-bold rounded-xl hover:bg-gray-500/30 transition-colors"
                    onClick={() => signOut()}
                  >
                    <IconPower />
                    <p>Log Out</p>
                  </button>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="flex my-[2px]">
                  <Link
                    href="/auth/signup"
                    className="flex gap-2 w-full px-2 py-1 text-lg font-bold rounded-xl hover:bg-gray-500/30 transition-colors"
                  >
                    <IconPencil />
                    <p>Sign up</p>
                  </Link>
                </li>
                <li className="flex my-[2px]">
                  <Link
                    href="/auth/login"
                    className="flex gap-2 w-full px-2 py-1 text-lg font-bold rounded-xl hover:bg-gray-500/30 transition-colors"
                  >
                    <IconLogin />
                    <p>Login</p>
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </aside>
      </div>
    </>
  );
};

const Header = () => {
  const pathname = usePathname();

  // const [fix, setFix] = useState(false);
  const [headerTheme, setHeaderTheme] = useState("");

  const setHeaderStyle = (path) => {
    if (path.includes("real-estate")) {
      return "theme-real-estate";
    } else if (path.includes("legal")) {
      return "theme-legal";
    } else if (path.includes("community")) {
      return "theme-community";
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
    <header className={`${headerTheme}`}>
      <div
        className={`bg-[var(--color-primary)] max-h-[60px] fixed mb-12 overflow-x-clip z-20 w-full border-b-2 border-[var(--color-header-border)]`}
      >
        <div className=" relative flex h-[60px] w-full  min-[1054px]:w-[1000px] min-[1255px]:w-[1200px] justify-between px-[15px] mx-auto">
          <div className="flex gap-2">
            <Link
              href={"/"}
              className="text-[var(--color-logo)] font-semibold text-3xl flex items-center"
            >
              PB+
            </Link>
          </div>
          <div className="flex gap-2">
            <nav className="flex z-20">
              <ul className="hidden min-[1054px]:flex flex-row items-center">
                {routes.map((route, index) => (
                  <li key={index} className="h-[90%]">
                    <Link
                      href={route.route}
                      className="font-semibold h-full uppercase flex items-center transition-colors text-[var(--color-text-primary)] hover:text-[var(--color-primary-accent)] hover:bg-white px-4"
                    >
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex min-[1054px]:hidden">
              <Menu />
            </div>
            <div className="hidden relative min-[1054px]:flex  w-full min-[1054px]:w-[250px] h-full ">
              <UserMenu />
              <div
                className={`absolute w-[5000px] border-b-2 border-[var(--color-header-border)]
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
