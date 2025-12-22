
import DashboardNavbar from "@/components/modules/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";
import Navbar from "@/components/modules/shared/layout/Navbar";
import React from "react";
export const dynamic = 'force-dynamic'
const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col w-full overflow-hidden">
        {/* <DashboardNavbar /> */}
        <Navbar/>
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div className=" w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;
