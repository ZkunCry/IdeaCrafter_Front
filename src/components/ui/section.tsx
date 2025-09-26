import { cn } from "@/src/lib/utils";
import React from "react";
interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}
const Section = ({ className, children }: SectionProps) => {
  return <section className={cn(className)}>{children}</section>;
};

export default Section;
