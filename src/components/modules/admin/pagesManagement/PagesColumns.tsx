"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IPage } from "@/interfaces/page.interface";

// import { PAGE_CATEGORY, PAGE_ROLE } from "@/constants/page.constant";
// import { IImage } from "./global.interfaces";

// export interface IPage {
//   _id: string;
//   name: string;
//   description?: string;
//   owner: string; // Who created this page
//   category: PAGE_CATEGORY;
//   image?: IImage;
//   isPublic: boolean;
//   followersCount: number;
// }

// export interface IPageMember {
//   page: string;
//   user: string;
//   bio?: string;
//   role: PAGE_ROLE;
//   joinedAt?: Date;
// }


export const pagesColumns: Column<IPage>[] = [
  {
    header: "Page",
    accessor: (page) => (
      <UserInfoCell
        name={page.name}
        photo={page.image?.profile}
      />
    ),
  },
  {
    header: "Owner",
    accessor: (page) => (
      <UserInfoCell
        name={page?.owner?.name || "N/A"}
        email={page?.owner?.email}
        photo={page?.owner?.image?.profile }
      />
    ),
  },
  {
    header: "Category",
    accessor: (page) => (
      <div className="flex flex-col">
        <span className="text-sm">{page.category}</span>
      </div>
    ),
  },
  {
    header: "Followers",
    accessor: (page) => (
      <span className="text-sm font-medium">
        {page.followersCount}
      </span>
    ),
  },
  


 {  
    header: "Joined",
    accessor: (page) => <DateCell date={page.createdAt} />,
  },

];
