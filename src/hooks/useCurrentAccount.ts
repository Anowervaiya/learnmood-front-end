'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '@/utils/tokenHandlers';
import { IDecodedPayload } from '@/interfaces/global.interfaces';
import { ACCOUNT_TYPE } from '@/constants/constant';



export const useCurrentAccount = () => {
  const [account, setAccount] = useState<IDecodedPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAccount= async () => {
      try {
        const token = await getCookie('accessToken');
        if (token) {
          const decoded = jwtDecode<IDecodedPayload>(token);
          setAccount(decoded);
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAccount();
  }, []);

  return { 
    account, 
    isLoading,
    isPage: account?.accountType === ACCOUNT_TYPE.Page,
    isUser: account?.accountType === ACCOUNT_TYPE.User
  };
};
