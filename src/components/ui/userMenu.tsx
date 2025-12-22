"use client";
import {
  CircleUser,
  LayoutDashboard,
  LogOutIcon,
  PersonStanding,
  PlusIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hooks";
import { authApi, useLogoutMutation } from "@/redux/api/auth/auth.api";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { IPage } from "@/interfaces/page.interface";
import Image from "next/image";
import { getCookie } from "@/utils/tokenHandlers";
import { baseApi } from "@/redux/baseApi";
import { useRouter } from "next/navigation";
import { getDefaultDashboardRoute } from "@/utils/auth";
import { logoutUser } from "@/server/auth/auth.server";
import { switchPage } from "@/server/moderator/page.server";
import { ROLE } from "@/constants/constant";

export default function UserMenu({
  isPage,
  myPages,
  data,
}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleLogout = async () => {
    try {
      // 1. Clear all RTK Query cache
      dispatch(baseApi.util.resetApiState());

      // 2. Server-side logout (delete cookies)
      await logoutUser();

      // 3. Use replace instead of href (cleaner history)
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSwitchPage = async (pageId: string) => {
    if (isSwitching) return; // Prevent multiple clicks
    try {
      setIsSwitching(true);

      // 1. Call backend to switch page (this updates the cookie)
      const result = await switchPage(pageId);
      if (result.success) {
        // 2. Clear RTK Query cache so new queries use new token
        dispatch(baseApi.util.resetApiState());

        // 3. Refresh the page to reload with new token
        // This ensures all components get the new identity
        window.location.reload();
         window.location.replace("/");
      }
    } catch (error) {
      console.error("Switch page error:", error);
      toast.error("Failed to switch page");
    } finally {
      setIsSwitching(false);
    }
  };

  console.log(data.role)
  return (
    <>
      {isSwitching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <Avatar>
              <AvatarFallback>
                {data?.image?.profile ? (
                  <img src={data?.image?.profile} alt="img" />
                ) : (
                  <CircleUser />
                )}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64" align="end">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {data?.name}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {data?.email && data?.email}
            </span>
          </DropdownMenuLabel>

          {myPages?.map((page: IPage) => (
            <DropdownMenuItem
              key={page._id}
              className="hover:cursor-pointer flex items-center gap-2"
              onClick={() => handleSwitchPage(page._id)}
              disabled={isSwitching}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={page?.image?.profile || "/logo.png"}
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <span>{isSwitching ? "Switching..." : page?.name}</span>
            </DropdownMenuItem>
          ))}

          {!isPage && (
            <DropdownMenuItem className="hover:cursor-pointer">
              <Link href={"/page"} className="flex items-center gap-2">
                <PlusIcon size={16} className="opacity-60" aria-hidden="true" />
                <span>Create your page</span>
              </Link>
            </DropdownMenuItem>
          )}


          <DropdownMenuItem className="hover:cursor-pointer">
       
              <React.Fragment >
               
                  <Link href={getDefaultDashboardRoute(data?.role || ROLE.MODERATOR)} className="flex items-center gap-2">
                    <LayoutDashboard
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    Dashboard
                  </Link>
               
              </React.Fragment>
          
          </DropdownMenuItem>

   

          <DropdownMenuItem
            onClick={handleLogout}
            className="hover:cursor-pointer"
          >
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
