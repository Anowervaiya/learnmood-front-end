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
    <div className="min-h-screen  dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar সব page এর উপরে থাকবে */}
      <Navbar  />

      {/* Main container */}
      <main className="flex mx-auto max-w-[1400px] w-full px-4 mt-6 gap-6">
        {children}
      </main>
    </div>
  );
}
