"use client";

import Tabs from "@/src/components/features/account/profile/Tabs";
import Container from "@/src/components/common/container/Container";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Tabs />
      {children}
    </>
  );
}
