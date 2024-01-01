import Link from "next/link";
import React from "react";

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

              <Link href="/auth/signin">
                <button className="primary-button  text-[#0A100D] transition-colors border-[#FFC65A] bg-[#F6AA1C] hover:bg-[#FFC65A] hover:border-[#F6AA1C]">
                  Sign in
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="primary-button transition-colors text-white hover:bg-white hover:text-black">
                  Log In
                </button>
              </Link>

            </div>
            <div className="absolute w-[5000px] bg-[#0A100D] h-full z-0 "></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
