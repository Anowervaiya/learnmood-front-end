import { BLOOD_GROUP } from "@/constants/blood.constant";
import { AUTHPROVIDER, GENDER, IsActive, LANGUAGE, PRONOUN, Role } from "@/constants/user.constant";

export interface IAuthProvider {
  provider: AUTHPROVIDER; // "Google", "Credential"
  providerId: string;
}


export interface IUser {
  _id?: string;
  bio?: string;
  name: string;
  nickname?: string;
  email: string;
  bloodGroup?: BLOOD_GROUP;
  password?: string;
  phone?: string;
  image?: { profile: string; banner: string };
  address?: string;
  isDeleted?: boolean;
  isVerified?: boolean;
  role?: Role;
  dob?: Date;
  isActive?: IsActive;
  gender?: GENDER;
  pronoun?: PRONOUN;
  followers?: string[];
  followings?: string[];
  languages?: LANGUAGE[];
  auths?: IAuthProvider[];
  friends?: string[];
  createdAt?: string;
  updatedAt?: string;
}
