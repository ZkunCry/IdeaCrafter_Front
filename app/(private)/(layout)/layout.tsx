import HeaderMain from "@/src/components/widgets/header/HeaderMain";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderMain />
      <div className="pt-[8rem]">{children}</div>
    </>
  );
}
