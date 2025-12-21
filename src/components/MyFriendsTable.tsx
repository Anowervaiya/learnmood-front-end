'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {  Ellipsis, MessageSquare, ShieldBan, UserRoundX } from "lucide-react";
import { useMyFriendsQuery } from "@/redux/api/user/user.api";

export default function MyFriendsTable() {
    const { data:myfriends } = useMyFriendsQuery(undefined);

    const data = myfriends?.data?.friends;
    if(data?.length===0) return 'You have no friens still now'
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Details</TableHead>

            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { data?.map((item: any) => (
            <TableRow key={item._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div>
                    <img
                      className="rounded-full"
                      src={item.image?.profile || '/logo.png'}
                      width={40}
                      height={40}
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <span className="text-muted-foreground mt-0.5 text-xs">
                      {item.username || 'Software Engineer '}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Message
                        <DropdownMenuShortcut>
                          <MessageSquare />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Block
                        <DropdownMenuShortcut>
                          {' '}
                          <ShieldBan />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Unfriend
                        <DropdownMenuShortcut>
                          <UserRoundX />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
