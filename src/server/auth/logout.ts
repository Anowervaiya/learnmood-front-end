"use server"

import { deleteCookie } from "@/utils/tokenHandlers";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
}