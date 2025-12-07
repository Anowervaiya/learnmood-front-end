import { IUser } from "./user.interface";

export interface IMentor {
  _id: string;
  userId: IUser;
  bio: string;
  subject: string[];
  experienceYears: number;
  education: string;
  location: string;
  duration: string;
  studentCount?:number;
  monthlyRate: number;
  createdAt: string;
}
