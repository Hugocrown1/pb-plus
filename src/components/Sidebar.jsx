import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const showSidebar = pathname.includes("/dashboard");

  // Actualizar el estado 'expanded' en función del tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setExpanded(window.innerWidth >= 768); // Cambia a true si el ancho de la ventana es mayor o igual a 768px
    };
    handleResize(); // Llamar una vez al principio para establecer el valor inicial
    window.addEventListener("resize", handleResize); // Escuchar cambios en el tamaño de la ventana
    return () => window.removeEventListener("resize", handleResize); // Limpiar el listener al desmontar el componente
  }, []);

  if (!showSidebar) {
    return null;
  }

  // Categorizar los items del sidebar
  const categorizedSidebarItems = categorizeSidebarItems(children);

  return (
    <div>
      <SidebarContext.Provider value={{ expanded }}>
        <div className="flex bg-green-500 pt-[60px]">
          <div
            className={` transition-all ease-in-out duration-300 ${
              expanded ? "w-[250px]" : "w-16"
            }`}
          ></div>
          <aside
            className={`fixed bg-white h-screen shadow-sm border-r-4 z-50 border-gray-200  transition-all ease-in-out duration-300 ${
              expanded ? "w-[250px]" : "w-16"
            }`}
          >
            <nav className="h-full flex flex-col">
              <div className="p-2 xl:p-4 pb-2 flex justify-between items-center">
                <img
                  src={"/assets/footerlogo.png"}
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-40" : "w-0"
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
                    <h2 className="text-gray-500 xl:mt-4 xl:mb-2 text-xs uppercase font-semibold">
                      {category}
                    </h2>
                    <ul>{items}</ul>
                  </div>
                )
              )}
            </nav>
          </aside>

          {window.innerWidth < 768 && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black opacity-25 z-40"
              onClick={() => setExpanded(false)}
              style={{ display: expanded ? "block" : "none" }}
            ></div>
          )}
        </div>
      </SidebarContext.Provider>
    </div>
  );
}

// Función para categorizar los items del sidebar
function categorizeSidebarItems(items) {
  const categorizedItems = {
    Menu: [],
    Forms: [],
    Editor: [],
  };

  // Iterar sobre los items y categorizarlos
  React.Children.forEach(items, (item) => {
    switch (item.props.category) {
      case "Menu":
        categorizedItems["Menu"].push(item);
        break;

      case "Forms":
        categorizedItems["Forms"].push(item);
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
    <Link href={href}>
      <li
        className={`relative flex items-center py-2 my-1 font-medium rounded-md cursor-pointer transition-colors group justify-center ${
          active
            ? "bg-indigo-100 text-indigo-800 m-2"
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
    </Link>
  );
}
