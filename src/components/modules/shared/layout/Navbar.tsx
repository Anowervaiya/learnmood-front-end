"use client";

import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import React, { useState } from "react";
import {
  Bell,
  Droplets,
  House,
  Moon,
  Search,
  SquarePlay,
  Sun,
  Trophy,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { ROLE } from "@/constants/constant";
import UserMenu from "@/components/ui/userMenu";
import Link from "next/link";
import { ChatDropDown } from "../messages/ChatDropDown";
import ChatCard from "../messages/ChatCard";
import { useGetMyPagesQuery, useGetPageInfoQuery } from "@/redux/api/page/page.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: ROLE.ADMIN },
  { href: "/seller", label: "Dashboard", role: ROLE.SELLER },
  { href: "/user", label: "Dashboard", role: ROLE.USER },
];

export type IChat = {
  _id: string;
  name?: string;
  image?: {
    profile: string;
    banner: string;
  };
  isOpen?: boolean;
};

function Navbar() {
  const [openChat, setOpenChat] = useState<IChat[]>([]);
  const [isDark, setIsDark] = useState(false);
  
  // Get current account from token
  const { account, isPage, isUser, isLoading } = useCurrentAccount();

  const { data: userData } = useUserInfoQuery(
    isUser ? undefined : skipToken
  ) as any
  
  const { data: pageData } = useGetPageInfoQuery(
    isPage ? undefined: skipToken
  );

  const { data: myPages } = useGetMyPagesQuery(undefined);



  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSingleChatOpen = (user: IChat) => {
    setOpenChat((prev) => {
      const exists = prev.find((chat) => chat._id === user._id);
      if (exists) {
        return prev.map((chat) =>
          chat._id === user._id ? { ...chat, isOpen: true } : chat
        );
      }
      return [...prev, { ...user, isOpen: true }];
    });
  };

  const handleSingleChatClose = (userId: string) => {
    setOpenChat((prev) =>
      prev.map((chat) =>
        chat._id === userId ? { ...chat, isOpen: false } : chat
      )
    );
  };

  // Determine which data to show
  const currentData = isPage ? pageData?.data : userData?.data;
  const filteredPages = myPages?.data?.filter(
  (p: any) => p._id !== account?.accountId
);




  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 mx-auto max-w-7xl">
          {/* left side  */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
              </div>
            </Link>
            <div className="hidden md:flex items-center justify-center flex-1 max-w-md ">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for skills, people..."
                  className="pl-9 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-700 border-none rounded-full focus-visible:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* middle */}
          <div className="flex items-center gap-3 md:gap-6 lg:gap-12">
            <Link
              href={"/"}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <House />
            </Link>
            {isUser &&<Link
              href={"/friends/recommended"}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Users />
            </Link>}
            <Link
              href={"/tutors"}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 "
            >
              <LiaChalkboardTeacherSolid className="w-7 h-7" />
            </Link>
            <Link
              href={"/course"}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <SquarePlay />
            </Link>
            <Link
              href={"/challenge"}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Trophy />
            </Link>
            <Link
              href={"/blood"}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Droplets />
            </Link>
          </div>

          {/* right side */}
          <div className="flex items-center gap-5">
            <span
              onClick={toggleTheme}
              className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDark ? <Sun /> : <Moon />}
            </span>

            {/* chat */}
            {isUser && <span className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <ChatDropDown handleSingleChatOpen={handleSingleChatOpen} />
            </span>}

            {/* notification */}
            <span className="rounded-full p-2 hover:cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <Bell />
            </span>

            {/* avatar - Show based on current identity */}
            <div className="flex items-center gap-4">
              {currentData && (
                <UserMenu
                  myPages={filteredPages}
                  navigationLinks={navigationLinks}
                  data={currentData}
                  isPage={isPage}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Single Chat  */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-4">
        {openChat
          .filter((chat) => chat.isOpen)
          .map((chat) => (
            <div key={chat._id} className="relative">
              <ChatCard user={chat} />
              <button
                onClick={() => handleSingleChatClose(chat._id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Navbar;