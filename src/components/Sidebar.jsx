import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const showSidebar = pathname.includes("/dashboard");

  if (!showSidebar) {
    return null;
  }

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside className={`fixed top-0 left-0 h-screen bg-white border-r shadow-sm z-50 mt-[60px] ${expanded ? "w-60" : "w-16"} transition-all`}>
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={"/assets/footerlogo.png"}
              className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            />

            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <IconArrowLeft /> : <IconArrowRight />}
            </button>
          </div>

          <ul className="flex-1 px-2">{children}</ul>
        </nav>
      </aside>
      <div className="ml-16"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-25 z-40" onClick={() => setExpanded(false)} style={{ display: expanded ? 'block' : 'none' }}></div>
    </SidebarContext.Provider>
  );
}

export function SidebarItem({ href, icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <a href={href}>
      <li
        className={`relative flex items-center py-2 my-1 font-medium rounded-md cursor-pointer transition-colors group justify-center ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
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
