"use client";
import {
  SidebarProvider,
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const sidebarItems = [
  { title: "Profile", url: "/account" },
  { title: "My Startups", url: "/account/startups" },
  { title: "Favorites", url: "/account/favorites" },
];

const membershipsItems = [
  { title: "Memberships", url: "/account/memberships" },
];

const SidebarAccount = () => {
  const pathname = usePathname();

  const isActive = (url: string) => pathname === url;

  return (
    <SidebarProvider>
      <Sidebar className="mt-[4.2rem]">
        <SidebarTrigger className="absolute top-2 left-[260px] z-50" />

        <SidebarContent className="h-[calc(100vh-4.2rem)] overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg">Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={
                          isActive(item.url)
                            ? "bg-muted text-primary font-medium"
                            : "hover:bg-muted/50"
                        }
                      >
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-lg">
              Memberships
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {membershipsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={
                          isActive(item.url)
                            ? "bg-muted text-primary font-medium"
                            : "hover:bg-muted/50"
                        }
                      >
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default SidebarAccount;
