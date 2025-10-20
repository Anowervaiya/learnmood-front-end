import { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from "@/constants/challenge.constant";

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
  createdBy: string;
  startsAt: Date;
  endsAt?: Date;
  ratings: number;
  isPublic: boolean;
  status: CHALLENGE_STATUS;
  banner?: string;
}
