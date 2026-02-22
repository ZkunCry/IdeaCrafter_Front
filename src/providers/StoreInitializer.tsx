"use client";
import { useRef } from "react";
import type { IUser } from "../components/features/user/api/userApi";
import { useUserStore } from "../store/user";

export default function StoreInitializer({ user }: { user: IUser }) {
  if (!user) return null;
  const initialized = useRef(null);
  if (!initialized.current) {
    useUserStore.getState().actions.setCredentials(user);
    initialized.current = true;
  }

  return null;
}
