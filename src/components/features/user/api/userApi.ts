import { axiosInstance } from "@/src/api/axios";
export interface IUser {
  id: string;
  username: string;
  email: string;
}
export interface UserResponse extends IUser {
  avatarUrl: string;
}

export const UserService = {};
