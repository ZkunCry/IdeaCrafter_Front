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
import { FolderOpen, Heart, Send, User } from "lucide-react";
const sidebarItems = [
  { title: "Аккаунт", url: "/account", icon: User },
  { title: "Мои стартапы", url: "/account/startups", icon: FolderOpen },
  { title: "Избранные", url: "/account/favorites", icon: Heart },
];

const membershipsItems = [
  { title: "Мои заявки", url: "/account/applications", icon: Send },
];

const SidebarAccount = () => {
  const pathname = usePathname();

  const isActive = (url: string) =>
    url === "/account"
      ? pathname === url || pathname === "/account/change-password"
      : pathname === url || pathname.startsWith(`${url}/`);

  return (
    <SidebarProvider>
      <Sidebar className="">
        <SidebarContent className=" overflow-y-auto pt-[5.2rem]">
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg">Аккаунт</SidebarGroupLabel>
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
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-lg">Участие</SidebarGroupLabel>
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
                        <item.icon className="mr-2 h-4 w-4" />
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
      <SidebarTrigger className="mt-[5.6rem] ml-[1rem]" />
    </SidebarProvider>
  );
};

export default SidebarAccount;
