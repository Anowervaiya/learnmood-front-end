'use client'
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserInfoResponse } from '@/interfaces/global.interfaces';
import { INotification } from '@/interfaces/notification.interface';
import { useUserInfoQuery } from '@/redux/api/auth/auth.api';
import { useGetNotificationQuery } from '@/redux/api/notification/notification.api';
import { useMyFriendsQuery } from '@/redux/api/user/user.api';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';

export  function  ChatDropDown ( { handleSingleChatOpen }: any) {
  const { data: myFriends } = useMyFriendsQuery(undefined);
  const {data: userMe} = useUserInfoQuery(undefined ) as any
  const { data: notificationsData } = useGetNotificationQuery({userId: userMe?.data?._id}, { skip: !userMe?.data?._id })
  const unreadCount =  notificationsData?.data
    ?.filter((notification: any) => !notification?.read) // only unread
    ?.reduce((acc: Record<string, boolean>, notif: any) => {
      
      acc[notif.sender?._id] = true; // group by sender
      return acc;
    }, {});

  const uniqueUnreadCount = unreadCount && Object.keys(unreadCount).length

  // const unreadCount = notificationsData?.data?.filter((notification: any) => !notification.read)
  // console.log('uread count' , unreadCount?.length)

  // console.log(uniqueUnreadCount)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <div className='relative'>
          <MessageSquare />
          {uniqueUnreadCount > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'> {uniqueUnreadCount} </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-4">
        <DropdownMenuLabel className="text-xl text-black">
          Chats
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {myFriends?.data?.friends?.map((item: any, idx: number) => (
            <DropdownMenuItem onClick={()=>handleSingleChatOpen(item)} key={idx}>
              <div className="flex items-center gap-4">
                <div className="relative w-[50px] h-[50px]">
                  <Image
                    src={item?.image?.profile || '/logo.png'}
                    alt="user"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-[16px] font-semibold">{item?.name}</h1>
                  <h3>You: Hello . 18h</h3>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
