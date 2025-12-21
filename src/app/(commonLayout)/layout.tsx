import Navbar from "@/components/modules/shared/layout/Navbar";
import { getUserInfo } from "@/server/user/user.server";
import { getCookie } from "@/utils/tokenHandlers";
import { redirect } from "next/navigation";
import React from "react";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {


 
  return (
    <div className="min-h-screen w-full  dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar সব page এর উপরে থাকবে */}
      <Navbar  />

      {/* Main container */}
      <main className="max-w-7xl mx-auto grid grid-cols-12  w-full mt-4  gap-6">
        {children}
      </main>

    </div>
  );
}
