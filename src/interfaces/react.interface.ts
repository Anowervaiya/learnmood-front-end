
import { ReactType } from "@/constants/constant";

export interface IReact {
  _id: string;
  entityId: string;
  entityType: string;
  user: string;
  reactType:  ReactType; // match your ReactType enum
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  entityId: string;
  entityType: string;
  user: {
    name: string,
    image: {
      profile:string
    },
    _id:string
  };
  content: string;// match your ReactType enum
  createdAt: string;
  updatedAt: string;
}
