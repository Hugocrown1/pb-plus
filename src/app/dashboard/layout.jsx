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
        {/*Items menu*/}
        <SidebarItem href="/dashboard" icon={<IconDashboard />} text="Dashboard" category="Menu" />
        <SidebarItem href="/dashboard/analytics" icon={<IconGraph />} text="Analytics" category="Menu" />

        {/* Items remo*/}
        <SidebarItem href="/dashboard/remo" icon={<IconHomeCog />} text="Remo Quotes" category="Remo" />
        {/* Items legal*/}
        <SidebarItem href="/dashboard/forms" icon={<IconGavel />} text="Legal Forms" category="Legal" />

        {/* Items editor */}
        <SidebarItem href="/dashboard/users" icon={<IconUserEdit />} text="Users" category="Editor" />
        <SidebarItem href="/dashboard/properties" icon={<IconHomeEdit />} text="Properties" category="Editor" />
      </Sidebar>
      )}
      {isAdmin ? admin : user}
    </div>
  );
}
