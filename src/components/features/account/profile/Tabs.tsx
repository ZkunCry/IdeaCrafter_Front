"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const tabs = [
  { href: "/account", label: "Account" },
  { href: "/account/change-password", label: "Change password" },
];

export default function Tabs() {
  const pathname = usePathname();

  return (
    <div className="w-fit my-5">
      <div className="flex items-center gap-4  mb-4 bg-accent rounded-md p-2">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`py-[4px] px-[8px] transition-colors ${
              pathname === tab.href
                ? " bg-white rounded-md py-[4px] px-[8px] font-medium"
                : "text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
