"use client";
import Link from "next/link";

import Menu from "./Menu";

import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import {
  IconHammer,
  IconHome,
  IconHomeDollar,
  IconScale,
  IconSocial,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

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

const Header = ({ session }) => {
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

  return (
    <header className={headerTheme}>
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
              <Menu session={session} routes={routes} />
            </div>
            <div className="hidden relative min-[1054px]:flex  w-full min-[1054px]:w-[250px] h-full ">
              <UserMenu session={session} />
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
