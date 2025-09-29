export interface IPost {
  _id?: string;
  user: any;
  content: string;
  media?: { url: string; type: string }[];
  tag?: string[];
  visibility: string;
  createdAt: Date;
}
