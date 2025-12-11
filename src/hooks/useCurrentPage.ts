'use client';

import { useEffect, useState } from 'react';
import { IPage } from '@/interfaces/page.interface';
import { serverFetch } from '@/utils/serverFetch';
import { getCookie } from '@/utils/tokenHandlers';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getPageInfo } from '@/server/moderator/page.server';
import {jwtDecode} from "jwt-decode";

export const useCurrentPage = () => {
  const [currentPage, setCurrentPage] = useState<IPage | null>(null);
  useEffect(() => {
    const fetchPageInfo = async () => {
      const accessToken = await getCookie('accessToken')
      if (!accessToken) return;
      try {
        // 1. Decode token to get pageId
    const decoded : any = jwtDecode(accessToken);

   
      const pageId = decoded?.accountId;

        if (!pageId) return;

        // 2. Fetch page info from backend
        const result = await getPageInfo(pageId)
       
        setCurrentPage(result?.data[0] || null);
      } catch (err) {
        console.error('Failed to fetch page info', err);
      }
    };

    fetchPageInfo();
  }, []);

  return currentPage;
};
