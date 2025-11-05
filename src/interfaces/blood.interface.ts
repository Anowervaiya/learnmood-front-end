import { BLOOD_GROUP, BLOOD_REQUEST_STATUS, BLOOD_URGENCY_LEVEL } from "@/constants/blood.constant";


interface IDonationHistory {
  date: Date;
  location: string;
  recipient:string;
  quantity: number;
}
export interface IBloodDonor {
  _id: string;
  user:string; // Who created this page
  bloodGroup: BLOOD_GROUP;
  location: string;
  donationHistory?: IDonationHistory[];
}
export interface IBloodRequest {
  _id?: string;
  requestedBy?: {
    _id: string;
    name:string,
    image: {
      profile: string,
      banner:string
    }
  }; // Who created this page
  bloodGroup: BLOOD_GROUP;
  location: string;
  hospital?: string;
  contactNumber: string;
  details?: string;
  urgencyLevel: BLOOD_URGENCY_LEVEL;
  status?: BLOOD_REQUEST_STATUS;
  createdAt?: string;
}
