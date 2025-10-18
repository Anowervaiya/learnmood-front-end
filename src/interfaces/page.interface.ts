import { PAGE_CATEGORY, PAGE_ROLE } from "@/constants/page.constant";
import { IImage } from "./global.interfaces";

export interface IPage {
  _id: string;
  name: string;
  description?: string;
  owner: string; // Who created this page
  category: PAGE_CATEGORY;
  image?: IImage;
  isPublic: boolean;
}

export interface IPageMember {
  page: string;
  user: string;
  bio?: string;
  role: PAGE_ROLE;
  joinedAt?: Date;
}