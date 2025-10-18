"use client"
import { CircleUser, LayoutDashboard, LogOutIcon, PersonStanding } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch } from '@/redux/hooks';
import { authApi, useLogoutMutation } from '@/redux/api/auth/auth.api';
import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';


export default function UserMenu({ data, navigationLinks }: any) {
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();

 const handleLogout = async () => {
   try {
   
     await logout(undefined).unwrap();
   
     dispatch(authApi.util.resetApiState());
     
     toast.success('logout successful')
       } catch (error : unknown) {
     toast.error('Logout failed:');

   }
 };
  return (
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
            {data?.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuItem className="hover:cursor-pointer">
          {navigationLinks?.map((link: any, index: any) => (
            <React.Fragment key={index}>
              {link.role === data?.role && (
                <>
                  <LayoutDashboard
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <Link href={link.href}>{link.label}</Link>
                </>
              )}
            </React.Fragment>
          ))}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="hover:cursor-pointer">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span >Logout</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          <Link href={'/become-tutor'} className='flex items-center gap-2'>
            <PersonStanding size={16} className="opacity-60" aria-hidden="true" />
            <span>Become Tutor</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
