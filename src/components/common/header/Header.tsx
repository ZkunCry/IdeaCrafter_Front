import { cn } from "@/src/lib/utils";
import React from "react";
interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}
const Header = ({ className, children }: HeaderProps) => {
  return <header className={cn("header", className)}>{children}</header>;
};

export default Header;
