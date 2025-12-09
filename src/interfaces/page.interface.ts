import { PAGE_CATEGORY, PAGE_ROLE } from "@/constants/page.constant";
import { IImage } from "./global.interfaces";
import { IUser } from "./user.interface";

export interface IPage {
  _id: string;
  name: string;
  description?: string;
  owner: IUser; // Who created this page
  category: PAGE_CATEGORY;
  image?: IImage;
  isPublic: boolean;
  followersCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPageMember {
  page: string;
  user: string;
  bio?: string;
  role: PAGE_ROLE;
  joinedAt?: Date;
}