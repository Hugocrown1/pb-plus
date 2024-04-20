"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import {
  IconX,
  IconLogin,
  IconMenu2,
  IconPencil,
  IconPower,
  IconUser,
  IconDashboard,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Spinner from "./Spinner";

const Menu = ({ routes, session }) => {
  const pathname = usePathname();

  // const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
            {session ? (
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
                {session.user?.role === "admin" && (
                  <li className="flex my-[2px]">
                    <a
                      className="flex gap-2 w-full px-2 py-1 text-lg font-bold rounded-xl hover:bg-gray-500/30 transition-colors"
                      href={"/dashboard"}
                    >
                      <IconDashboard /> <p>Dashboard</p>
                    </a>
                  </li>
                )}
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

export default Menu;
