import { MEDIA_TYPE } from "@/constants/constant";

export type UserInfoResponse = {
  data?: {
    data?: {
      _id?: string;
      email?: string;
      name?:string;
      image?: {
        profile?: string;
        banner?: string;
      }
    };
  };
 
};


export interface IMedia {
  url: string;
  type: MEDIA_TYPE;
}
// export interface IFollowers {
//   user: Types.ObjectId;
// }

export interface IImage {
  profile?: string;
  banner?: string;
}

export interface IDecodedPayload {
  accountId: string;
  accountType: string;
  role: string;
  userId: string;
  email?: string;
}

