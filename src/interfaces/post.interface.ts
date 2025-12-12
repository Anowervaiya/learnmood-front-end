import { ACCOUNT_TYPE, ReactType } from "@/constants/constant";
import { IUser } from "./user.interface";

export interface IPost {
  _id?: string;
  accountId: IUser;
  accountType: ACCOUNT_TYPE;
  content: string;
  media?: { url: string; type: string }[];
  tag?: string[];
  reactions?: Record<ReactType, number>; 
  commentCount?: number;
  shareCount?: number;
  visibility: string;
  createdAt: Date;
}
