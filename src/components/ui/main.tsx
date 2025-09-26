import { cn } from "@/src/lib/utils";
import React from "react";
interface MainProps {
  className?: string;
  children?: React.ReactNode;
}
const Main = ({ className, children }: MainProps) => {
  return <section className={cn(className)}>{children}</section>;
};

export default Main;
