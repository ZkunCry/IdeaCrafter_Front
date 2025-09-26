import { cn } from "@/src/lib/utils";
import React from "react";
interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}
const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4", className)}>{children}</div>
  );
};

export default Container;
