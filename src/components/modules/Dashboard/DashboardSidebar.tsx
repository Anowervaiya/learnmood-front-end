
import { getUserInfo } from "@/server/user/user.server";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { NavSection } from "@/interfaces/dashboard.interface";
import { getNavItemsByRole } from "@/utils/navItems.config";
import { IUser } from "@/interfaces/user.interface";
import { getDefaultDashboardRoute } from "@/utils/auth";
import { Role } from "@/constants/user.constant";

const DashboardSidebar = async () => {
  const {data :userInfo} = (await getUserInfo());
  const navItems: NavSection[] = getNavItemsByRole(userInfo?.role as Role);
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role as Role);
  
  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;

