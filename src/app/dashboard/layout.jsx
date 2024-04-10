"use client";
import Sidebar, { SidebarItem } from "@/components/Sidebar";
import {
  IconDashboard,
  IconGraph,
  IconHomeCog,
  IconGavel,
  IconUserEdit,
  IconHomeEdit,
  IconPhotoEdit,
  IconHomeQuestion
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { usePathname } from "next/navigation";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function Layout({ user, admin }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = session?.user?.role === "admin";
  const isUser = session?.user?.role === "user";

  if (status === "loading") {
    return <LoadingScreen></LoadingScreen>;
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
    <div className={isAdmin ? `${roboto.className} flex` : ""}>
      {isAdmin && (
        <Sidebar>
          {/*Items menu*/}
          <SidebarItem
            href="/dashboard"
            icon={<IconDashboard />}
            text="Dashboard"
            category="Menu"
            active={pathname === "/dashboard"}
          />
          <SidebarItem
            href="/dashboard/analytics"
            icon={<IconGraph />}
            text="Analytics"
            category="Menu"
            active={pathname === "/dashboard/analytics"}
          />

          {/* Items remo */}
          <SidebarItem
            href="/dashboard/remo"
            icon={<IconHomeCog />}
            text="Remo Quotes"
            category="Forms"
            active={pathname === "/dashboard/remo"}
          />
          {/* Items legal */}
          <SidebarItem
            href="/dashboard/forms"
            icon={<IconGavel />}
            text="Legal Forms"
            category="Forms"
            active={pathname === "/dashboard/forms"}
          />

          {/* Items H&P */}
          <SidebarItem
            href="/dashboard/realestate"
            icon={<IconHomeQuestion />}
            text="Real Estate Forms"
            category="Forms"
            active={pathname === "/dashboard/realestate"}
          />

          {/* Items editor */}
          <SidebarItem
            href="/dashboard/users"
            icon={<IconUserEdit />}
            text="Users"
            category="Editor"
            active={pathname === "/dashboard/users"}
          />
          <SidebarItem
            href="/dashboard/properties"
            icon={<IconHomeEdit />}
            text="Properties"
            category="Editor"
            active={pathname === "/dashboard/properties"}
          />
           <SidebarItem
            href="/dashboard/events"
            icon={<IconPhotoEdit />}
            text="Events"
            category="Editor"
            active={pathname === "/dashboard/events"}
          />
        </Sidebar>
      )}
      {isAdmin ? admin : user}
    </div>
  );
}
export const revalidate = 0;
