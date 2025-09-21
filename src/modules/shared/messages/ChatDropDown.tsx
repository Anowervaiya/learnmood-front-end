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
import { useMyFriendsQuery } from '@/redux/api/user/user.api';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';

export function ChatDropDown({ handleSingleChatOpen }: any) {
  const { data: myFriends } = useMyFriendsQuery(undefined);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span>
          <MessageSquare />
        </span>
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
