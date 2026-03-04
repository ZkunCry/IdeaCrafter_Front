"use client";
import { useEffect, useRef } from "react";
import type { IUser } from "../components/features/user/api/userApi";
import { useUserStore } from "../store/user";

export default function StoreInitializer({ user }: { user: IUser }) {
  const setCredentials = useUserStore((state) => state.actions.setCredentials);

  useEffect(() => {
    if (user) {
      setCredentials(user);
    }
  }, [user, setCredentials]);

  return null;
}
