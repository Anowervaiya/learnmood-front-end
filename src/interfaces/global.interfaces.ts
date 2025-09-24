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