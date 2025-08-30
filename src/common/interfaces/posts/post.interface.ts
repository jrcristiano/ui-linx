import type { User } from "../users/user.interface";

export interface Post {
  id: number;
  title: string;
  userId: number;
  deletedAt: null;
  createdAt: string; 
  updatedAt: null;
  user: User;
};
