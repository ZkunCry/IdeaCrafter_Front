import { create, createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";
import {
  AuthService,
  type AuthResponse,
} from "../components/features/auth/api/authApi";
import type { IUser } from "../components/features/user/api/userApi";
import { useContext } from "react";
import { UserStoreContext } from "../providers/StoreProvider";
export interface UserState {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  isAuth: boolean;
  isInitialized: boolean;
  actions: {
    setId: (id: string) => void;
    setIsAuth: (isAuth: boolean) => void;
    setCredentials: (credentials: AuthResponse) => void;
    deleteCredentials: () => void;
  };
  error?: string;
}

export const createUserStore = (initialUser: AuthResponse | null) =>
  createStore<UserState>((set) => ({
    id: initialUser?.id ?? "",
    username: initialUser?.username ?? "",
    email: initialUser?.email ?? "",
    avatarUrl: "",
    isAuth: !!initialUser,
    isInitialized: true,

    actions: {
      setId: (id) => set({ id }),
      setIsAuth: (isAuth) => set({ isAuth }),
      setCredentials: (credentials) =>
        set({
          id: credentials.id,
          username: credentials.username,
          email: credentials.email,
          isAuth: true,
        }),
      deleteCredentials: () =>
        set({
          id: "",
          username: "",
          email: "",
          avatarUrl: "",
          isAuth: false,
        }),
    },
  }));
type UserStore = ReturnType<typeof createUserStore>;
type UserStoreState = ReturnType<UserStore["getState"]>;
export const useUserStore = <T>(selector: (state: UserStoreState) => T) => {
  const store = useContext(UserStoreContext);
  if (!store) throw new Error("StoreProvider missing");
  return useStore(store, selector);
};
export const useSetId = () => useUserStore((state) => state.actions.setId);
export const useSetToken = () =>
  useUserStore((state) => state.actions.setIsAuth);
export const useSetCredentials = () =>
  useUserStore((state) => state.actions.setCredentials);

export const useUser = () => useUserStore((state) => state);
