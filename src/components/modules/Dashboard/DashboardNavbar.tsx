
import { getUserInfo } from "@/server/user/user.server";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { IUser } from "@/interfaces/user.interface";
import { getNavItemsByRole } from "@/utils/navItems.config";
import { getDefaultDashboardRoute } from "@/utils/auth";

const DashboardNavbar = async () => {
  const {data : userInfo} = (await getUserInfo());
  const navItems = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
