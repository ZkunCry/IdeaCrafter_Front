import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponse } from "../components/features/auth/api/authApi";
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
  };
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
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
      },
    }),
    {
      name: "user-store",
    }
  )
);
export const useSetId = () => useUserStore((state) => state.actions.setId);
export const useSetToken = () =>
  useUserStore((state) => state.actions.setIsAuth);
export const useSetCredentials = () =>
  useUserStore((state) => state.actions.setCredentials);
