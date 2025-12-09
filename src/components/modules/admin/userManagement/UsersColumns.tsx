"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IUser } from "@/interfaces/user.interface";
import { Star } from "lucide-react";

// export interface IAuthProvider {
//   provider: AUTHPROVIDER; // "Google", "Credential"
//   providerId: string;
// }


// export interface IUser {
//   _id?: string;
//   bio?: string;
//   name: string;
//   nickname?: string;
//   email: string;
//   bloodGroup?: BLOOD_GROUP;
//   password?: string;
//   phone?: string;
//   image?: { profile: string; banner: string };
//   address?: string;
//   isDeleted?: boolean;
//   isVerified?: boolean;
//   role?: Role;
//   dob?: Date;
//   isActive?: IsActive;
//   gender?: GENDER;
//   pronoun?: PRONOUN;
//   followers?: string[];
//   followings?: string[];
//   languages?: LANGUAGE[];
//   auths?: IAuthProvider[];
//   friends?: string[];
//   createdAt: string;
// }

export const usersColumns: Column<IUser>[] = [
  {
    header: "User",
    accessor: (user) => (
      <UserInfoCell
        name={user.name}
        email={user.email}
        photo={user.image?.profile}
      />
    ),
  },
  {
    header: "Phone",
    accessor: (user) => (
      <div className="flex flex-col">
        <span className="text-sm">{user.phone}</span>
      </div>
    ),
  },
  {
    header: "Email",
    accessor: (user) => (
      <span className="text-sm font-medium">
        {user.email}
      </span>
    ),
  },
  {
    header: "Nickname",
    accessor: (user) => (
      <span className="text-sm font-medium">{user.nickname}</span>
    ),
  },
  { 
    header: "Blood Group",
    accessor: (user) => (
      <span className="text-sm font-medium">{user.bloodGroup}</span>
    ),      
  },
  {header: "Pronoun",
    accessor: (user) => (
      <span className="text-sm font-medium">{user.pronoun}</span>
    ),      
  },
  {header: "DOB",
    accessor: (user) => (
      <span className="text-sm font-medium">{user.dob ? new Date(user.dob).toLocaleDateString() : ''}</span>
    ),      
  },
  {header: "Address",
    accessor: (user) => (
      <span className="text-sm font-medium">{user.address}</span>
    ),      
  },
  {header: "Phone",
    accessor: (user) => (
      <span className="text-sm font-medium">{user.phone}</span>
    ),      
  },
  {header: "Bio", accessor: (user) => (
    <span className="text-sm font-medium">{user.bio}</span>
  ),      
},
  {
    header: "Gender",
    accessor: (user) => (
      <span className="text-sm capitalize">{user?.gender?.toLowerCase()}</span>
    ),
  },
  {
    header: "Status",
    accessor: (user) => <StatusBadgeCell isDeleted={user?.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (user) => <DateCell date={user.createdAt} />,
  },

];
