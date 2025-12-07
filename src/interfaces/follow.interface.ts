
export enum FOLLOWER_TYPE {
  User = 'User',
  Page = 'Page',
} 
export interface IFollow {
  follower: {
    id: string;
    type: FOLLOWER_TYPE;
  };
  following: {
    id: string;
    type: FOLLOWER_TYPE.Page;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
