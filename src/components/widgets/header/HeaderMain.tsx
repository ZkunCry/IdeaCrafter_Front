"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Header from "@/src/components/common/header/Header";
import Container from "@/src/components/common/container/Container";
import { Rocket, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useGetUser, useUser } from "@/src/store/user";
import { Skeleton } from "../../ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/src/components/ui/dropdown-menu";
const HeaderMain = () => {
  const getUser = useGetUser();
  const user = useUser();

  console.log(user);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Header className="w-full border fixed top-0 z-50  border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex items-center justify-between py-[1rem]">
          <Link href={"/"}>
            <div className="flex items-center gap-[1rem]">
              <div className="logo">
                <Rocket className="text-primary" size={35} />
              </div>
              <h1 className="text-[1.25rem] font-bold bg-gradient-hero bg-clip-text text-transparent">
                IdeaCrafter
              </h1>
            </div>
          </Link>

          <nav className="text-[1.1rem]">
            <ul className="flex items-center gap-4">
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <Link href="/">Главная</Link>
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <Link href="/categories">Категории</Link>
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <Link href="/startups">Стартапы</Link>
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <Link href="/generate">Сгенерировать идею</Link>
              </li>
            </ul>
          </nav>
          {!user.id && (!user.error || !user.isInitialized) ? (
            <div className="flex items-center gap-1 p-[0.5rem]">
              <Skeleton className="h-[30px] w-[30px] rounded-full" />

              <Skeleton className="h-[20px] w-[100px]" />
            </div>
          ) : user.isAuth ? (
            <div className="flex gap-[0.5rem]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-all duration-200 group">
                    <Avatar className="h-9 w-9  bg-primary group-hover:ring-primary/40 transition-all">
                      <AvatarImage src={user.avatarUrl} alt={user.username} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary-hover text-primary-foreground font-semibold">
                        {user.username
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden lg:block">
                      <p className="text-sm font-semibold text-foreground">
                        {user.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/account" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Аккаунт</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/account" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Настройки</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" color="red" />
                    <span>Выход из аккаунта</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-[0.5rem]">
              <Link href={"/auth/signin"}>
                <Button className="cursor-pointer" variant={"outline"}>
                  Войти
                </Button>
              </Link>

              <Link href={"/auth/signup"}>
                <Button className="cursor-pointer">Зарегистрироваться</Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </Header>
  );
};

export default HeaderMain;
