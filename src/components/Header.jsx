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
    <header className="bg-[#941B0C]">
      <div className="relative flex h-[60px] min-w-[1200px] w-[1200px] justify-between   px-[15px] mx-auto">
        <nav className="flex">
          <ul className="flex flex-row items-center gap-10">
            {routes.map((route) => (
              <li>
                <Link
                  href={route.route}
                  className="text-white font-semibold text-base py-1 border-b-4 transition-colors border-transparent hover:border-[#F6AA1C] "
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative flex  w-[250px] h-full">
          <div className="flex items-center pl-6 z-10 gap-4">
            <button className="primary-button bg-white text-black">
              Register
            </button>

            <button className="primary-button  text-white">Login</button>
          </div>
          <div className="absolute w-[5000px] bg-[#0A100D] h-full z-0 "></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
