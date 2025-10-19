import { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from "@/constants/challenge.constant";
import { IMedia } from "./global.interfaces";


export interface IParticipant {
  user: string;
  joinedAt?: Date;
  progress?: number; // % completion or streak count
  completed?: boolean;
}

export interface IChallengeDay {
  dayNumber: number;
  title: string;
  video?: string;
  article?: {
    image: string;
    content: string;
  };
  quiz?: [
    {
      question: string;
      options: [string];
      correctAnswer: string;
    }
  ];
}
// Challenge interface
export interface IChallenge {
  title: string;
  description?: string;
  category: CHALLENGE_CATEGORY;
  durationDays: number;
  createdBy?: string;
  participants?: IParticipant[];
  startsAt: Date;
  endsAt?: Date;
  ratings?: number;
  isPublic?: boolean;
  status: CHALLENGE_STATUS;
  banner: string;
  days?: IChallengeDay;
}
