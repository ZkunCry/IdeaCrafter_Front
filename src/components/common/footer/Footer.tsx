import { cn } from "@/src/lib/utils";
import React from "react";
interface FooterProps {
  className?: string;
  children?: React.ReactNode;
}
const Footer = ({ className, children }: FooterProps) => {
  return <footer className={cn("footer", className)}>{children}</footer>;
};

export default Footer;
