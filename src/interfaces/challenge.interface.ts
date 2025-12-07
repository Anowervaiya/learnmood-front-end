import { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from "@/constants/challenge.constant";
import { IUser } from "./user.interface";

export interface IChallengeVideo {
  fileName: string;
  fileType: string;
  key: string;
  uploadUrl: string;
}

export interface IQuize {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface IArticle {
  image: string;
  content: string;
}

export interface IChallengeDay {
  _id?: string;
  challengeId: string;
  dayNumber: number;
  title: string;
  notes?: string[];
  video?: IChallengeVideo[];
  article?: string;
  // quiz?: IQuize[];
}
// Challenge interface
export interface IChallenge {
  _id: string;
  title: string;
  description?: string;
  category: CHALLENGE_CATEGORY;
  durationDays: number;
  price:number;
  createdBy: IUser;
  startsAt: string;
  endsAt?: string;
  ratings: number;
  isPublic: boolean;
  status: CHALLENGE_STATUS;
  banner?: string;
  createdAt: string;
  participantCount:number
}
