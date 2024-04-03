import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";
import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const showSidebar = pathname.includes("/dashboard");

  if (!showSidebar) {
    return null;
  }

  // Categorizar los items del sidebar
  const categorizedSidebarItems = categorizeSidebarItems(children);

  return (
    <div className={` `}>
      <SidebarContext.Provider value={{ expanded }}>
        <aside
          className={`fixed top-0 left-0 h-screen bg-white border-r shadow-sm z-50 mt-[60px] ${
            expanded ? "w-60" : " w-16 xl:w-20"
          } transition-all`}
        >
          <nav className="h-full flex flex-col">
            <div className="p-4 pb-2 flex justify-between items-center">
              <img
                src={"/assets/footer/footerlogo.png"}
                className={`overflow-hidden transition-all ${
                  expanded ? "w-32" : "w-0"
                }`}
              />

              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                {expanded ? <IconArrowLeft /> : <IconArrowRight />}
              </button>
            </div>

            {/* Renderizar los items del sidebar categorizados */}
            {Object.entries(categorizedSidebarItems).map(
              ([category, items]) => (
                <div key={category}>
                  <h2 className="text-gray-500 mt-4 mb-2 text-xs uppercase font-semibold">
                    {category}
                  </h2>
                  <ul>{items}</ul>
                </div>
              )
            )}
          </nav>
        </aside>
        <div className="ml-16 xl:ml-20"></div>
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-25 z-40"
          onClick={() => setExpanded(false)}
          style={{ display: expanded ? "block" : "none" }}
        ></div>
      </SidebarContext.Provider>
    </div>
  );
}

// Función para categorizar los items del sidebar
function categorizeSidebarItems(items) {
  const categorizedItems = {
    Menu: [],
    Remo: [],
    Legal: [],
    Editor: [],
  };

  // Iterar sobre los items y categorizarlos
  React.Children.forEach(items, (item) => {
    switch (item.props.category) {
      case "Menu":
        categorizedItems["Menu"].push(item);
        break;
      case "Remo":
        categorizedItems["Remo"].push(item);
        break;
      case "Legal":
        categorizedItems["Legal"].push(item);
        break;
      case "Editor":
        categorizedItems["Editor"].push(item);
        break;
      default:
        break;
    }
  });

  return categorizedItems;
}

export function SidebarItem({ href, icon, text, active, alert, category }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <a href={href}>
      <li
        className={`relative flex items-center py-2 my-1 font-medium rounded-md cursor-pointer transition-colors group justify-center ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-100 text-gray-600 m-2"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all text-base ${
            expanded ? "w-40" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md ml-4 px-2 py-1 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </a>
  );
}
