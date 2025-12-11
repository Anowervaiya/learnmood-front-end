import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dropdown-menu";
import { Ellipsis, MessageSquare, ShieldBan, UserRoundX } from "lucide-react";
import { IMentor } from "@/interfaces/mentor.interface";
import Link from "next/link";
import Image from "next/image";

export default function MyTutorTable({ mentors }: { mentors: IMentor[] }) {
  console.log(mentors, "mentor table");
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
          {mentors?.map((mentor: IMentor) => (
            <TableRow key={mentor._id}>
                <TableCell>
              <Link href={`/profile/${mentor?.userId?._id}`}>
                  <div className="flex items-center gap-3">
                    
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={mentor.userId?.image?.profile || "/logo.png"}
                        alt="Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{mentor.userId?.name}</div>
                      <span className="text-muted-foreground mt-0.5 text-xs">
                        {mentor.userId?.nickname || "Software Engineer "}
                      </span>
                    </div>
                  </div>
              </Link>
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
                          {" "}
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
