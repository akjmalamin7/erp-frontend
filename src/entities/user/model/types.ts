import type { User } from "@/entities/session/model/types";

export interface Profile {
  _id: string;
  name: string;
  phone: string;
  designation: string;
  nid: number;
  blood_group: string;
  address: string;
  bio: string;
  photo: string;
  dob: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}
