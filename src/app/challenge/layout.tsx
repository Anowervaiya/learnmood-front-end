import Navbar from "@/modules/shared/layout/Navbar";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
   
      <Navbar />

     
      <main className="flex mx-auto max-w-7xl w-full px-4 mt-6 gap-6">
        {children}
      </main>
    </div>
  );
}
