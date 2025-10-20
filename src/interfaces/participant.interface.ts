import { EntityType } from "@/constants/constant";

export interface IParticipant {
  entityId: string;
  entityType: EntityType;
  user: string;
  joinedAt?: Date;
  progress?: number; // % completion or streak count
  completed?: boolean;
}
