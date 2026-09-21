import HeaderMain from "@/src/components/widgets/header/HeaderMain";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Idea Crafter",
  description: "Idea Crafter",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderMain />
      <div className="pt-[8rem]">{children}</div>
    </>
  );
}
