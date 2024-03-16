"use client"
import Sidebar, { SidebarItem } from "@/components/Sidebar";
import { IconDashboard, IconGraph, IconHomeCog, IconGavel, IconUserEdit, IconHomeEdit, IconClockEdit } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({ user, admin }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  
  const isAdmin = session?.user?.role === "admin";
  
  const isUser = session?.user?.role === "user";

  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) {
    router.replace("/");
    return null;
  }

  if (!isAdmin && !isUser) {
    router.replace("/");
    return null;
  }

  return (
    <div className={isAdmin ? "flex" : ""}>
       {isAdmin && (
        <Sidebar>
          <p className="text-gray-500 font bold my-2 text-xs">MENU</p>
          <SidebarItem
            href={"/dashboard"}
            icon={<IconDashboard size={20} />}
            text="Dashboard"
          />
          <SidebarItem
            href={"/dashboard/analytics"}
            icon={<IconGraph size={20} />}
            text="Analytics"
          />
          <p className="text-gray-500 font bold my-2 text-xs">REMO</p>
          <SidebarItem
            href={"/dashboard/remo"}
            icon={<IconHomeCog size={20} />}
            text="Remo Quotes"
          />
           <p className="text-gray-500 font bold my-2 text-xs">LEGAL</p>
          <SidebarItem
            href={"/dashboard/forms"}
            icon={<IconGavel size={20} />}
            text="Legal Forms"
          />
          <p className="text-gray-500 font bold my-2 text-xs">EDITOR</p>
          <SidebarItem
            href={"/dashboard/users"}
            icon={<IconUserEdit size={20} />}
            text="Users"
          />
          <SidebarItem
            href={"/dashboard/properties"}
            icon={<IconHomeEdit size={20} />}
            text="Properties"
          />
          
          
         
        </Sidebar>
      )}
      {isAdmin ? admin : user}
    </div>
  );
}
