export type UserInfoResponse = {
  data?: {
    data?: {
      email?: string;
      name?:string;
      image?: {
        profile?: string;
        banner?: string;
      }
    };
  };
 
};