"use client";

import { createContext, useRef, type ReactNode } from "react";
import type { AuthResponse } from "../components/features/auth/types";
import { createUserStore } from "../store/user";

type Props = {
  children: ReactNode;
  initialUser: AuthResponse | null;
};

export const UserStoreContext =
  createContext<ReturnType<typeof createUserStore>>(null);

export default function StoreProvider({ children, initialUser }: Props) {
  const storeRef = useRef<ReturnType<typeof createUserStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = createUserStore(initialUser);
  }
  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
}
