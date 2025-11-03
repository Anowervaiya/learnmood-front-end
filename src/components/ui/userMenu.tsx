"use client"
import { CircleUser, LayoutDashboard, LogOutIcon, PersonStanding, PlusIcon } from 'lucide-react';

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
import { IPage } from '@/interfaces/page.interface';
import Image from 'next/image';


export default function UserMenu({ myPages, data, navigationLinks }: any) {
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

        

        {myPages?.map((page: IPage) =>
          <DropdownMenuItem className="hover:cursor-pointer ">
            <Link href={`/page/${page._id}`} className='flex items-center gap-2'>

              {/* <PlusIcon size={16} className="opacity-60" aria-hidden="true" /> */}
              <div className="w-10 h-10  flex items-center justify-center">
                <Image src={page.image?.profile || '/logo.png'} alt="Logo" className='rounded-full' width={40} height={40} />
              </div>
              <span>{page.name}</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="hover:cursor-pointer bg-blue-100 ">
          <Link href={'/page'} className='flex items-center gap-2'>

            <PlusIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Create your page</span>
          </Link>
        </DropdownMenuItem>

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
       
        <DropdownMenuItem className="hover:cursor-pointer">
          <Link href={'/become-tutor'} className='flex items-center gap-2'>
            <PersonStanding size={16} className="opacity-60" aria-hidden="true" />
            <span>Become Tutor</span>
          </Link>
        </DropdownMenuItem>

      
        <DropdownMenuItem onClick={handleLogout} className="hover:cursor-pointer">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span >Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
