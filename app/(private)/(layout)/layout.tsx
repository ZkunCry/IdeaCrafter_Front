import FooterMain from "@/src/components/widgets/footer/FooterMain";
import HeaderMain from "@/src/components/widgets/header/HeaderMain";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderMain />
      <main className="w-full pt-[10rem] mb-[1rem] flex-1">{children}</main>
      <FooterMain />
    </>
  );
}
