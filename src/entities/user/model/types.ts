import type { User } from "@/entities/session/model/types";

export interface Profile {
  _id: string;
  designation: string;
  bio: string;
  photo: string;
  dob: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}
