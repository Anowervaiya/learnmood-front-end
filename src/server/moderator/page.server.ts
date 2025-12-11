'use server'

import { serverFetch } from "@/utils/serverFetch";
import { parse } from "cookie";
import { cookies } from "next/headers";

export const getPageInfo = async (pageId: string) => {
  try {

    const res = await serverFetch.get(`/page/${pageId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await res.json();
    return result;
  } catch (error: any) {

    console.log(error);
    return { error: "Failed to fetch page info" };
  }
}



export const switchPage = async (pageId: string) => {
  let accessTokenObject: null | any = null;
  let refreshTokenObject: null | any = null;
  try {
    const res = await serverFetch.post('/page/switch', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pageId }),
      credentials: 'include', // cookie update er jonno
    });
    const result = await res.json();

    const setCookieHeaders = res.headers.getSetCookie();


    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie['accessToken']) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie['refreshToken']) {
          refreshTokenObject = parsedCookie;
        }
      })
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

        const cookieStore = await cookies();

        cookieStore.set("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });

    return result;
  } catch (error: any) {
      if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
    console.error('Switch page error:', error);
    return { error: 'Something went wrong while switching page' };
  }
};