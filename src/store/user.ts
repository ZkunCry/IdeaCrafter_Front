import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AuthService,
  type AuthResponse,
} from "../components/features/auth/api/authApi";
import type { IUser } from "../components/features/user/api/userApi";
export interface UserState {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  isAuth: boolean;
  actions: {
    setId: (id: string) => void;
    setIsAuth: (isAuth: boolean) => void;
    setCredentials: (credentials: AuthResponse) => void;
    getUser: () => void;
    deleteCredentials: () => void;
  };
  error?: string;
}

export const useUserStore = create<UserState>()((set, get) => ({
  id: "",
  username: "",
  email: "",
  avatarUrl: "",
  isAuth: false,
  actions: {
    setId: (id: string) => set({ id }),
    setIsAuth: (isAuth: boolean) => set({ isAuth }),
    setCredentials: (credentials: AuthResponse) => {
      set({
        id: credentials.id,
        username: credentials.username,
        email: credentials.email,
        avatarUrl: "",
        isAuth: true,
      });
    },
    deleteCredentials: () => {
      set({
        id: "",
        username: "",
        email: "",
        avatarUrl: "",
        isAuth: false,
      });
    },
    getUser: async () => {
      const user = get();
      if (user.id) return;
      try {
        console.log("we are here");
        const response = await AuthService.identityMe();
        set({
          ...response,
          isAuth: true,
        });
      } catch (error) {
        set({
          id: "",
          username: "",
          email: "",
          avatarUrl: "",
          isAuth: false,
          error: error?.message,
        });
      }
    },
  },
}));

export const useSetId = () => useUserStore((state) => state.actions.setId);
export const useSetToken = () =>
  useUserStore((state) => state.actions.setIsAuth);
export const useSetCredentials = () =>
  useUserStore((state) => state.actions.setCredentials);

export const useGetUser = () =>
  useUserStore((state) => {
    return state.actions.getUser;
  });
export const useUser = () => useUserStore((state) => state);
