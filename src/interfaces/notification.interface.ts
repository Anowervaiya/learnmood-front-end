import { Notification_entityType } from "@/constants/notification.constant";


export interface INotification {
  entityId: string;
  entityType: Notification_entityType;
  sender: string;
  receiver: string;
  read: boolean;
  createdAt?: Date;
  
}
