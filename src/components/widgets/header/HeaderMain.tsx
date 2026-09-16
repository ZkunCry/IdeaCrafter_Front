"use client";
import React from "react";
import Link from "next/link";
import Header from "@/src/components/common/header/Header";
import Container from "@/src/components/common/container/Container";
import { Rocket, Settings, LogOut, Plus, User, Heart, Send } from "lucide-react";
import { AuthService } from "@/src/components/features/auth/api/authApi";
import { Button } from "@/src/components/ui/button";
import { useUser } from "@/src/store/user";
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
  const user = useUser();
  const avatarLetter = user.username?.charAt(0).toUpperCase() || "U";

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } finally {
      // A full reload drops the server-rendered user and every cached query.
      window.location.href = "/";
    }
  };


  return (
    <Header className="w-full border fixed top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex items-center justify-between py-[1rem]">
          <Link href={"/"}>
            <div className="flex items-center gap-[1rem] cursor-pointer">
              <div className="logo">
                <Rocket className="text-primary" size={35} />
              </div>
              <h1 className="text-[1.25rem] font-bold bg-gradient-hero bg-clip-text text-transparent">
                IdeaCrafter
              </h1>
            </div>
          </Link>

          <nav className="text-[1.1rem] hidden md:block">
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
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {user.isAuth ? (
              <>
                <Button asChild className="px-3 sm:px-4" title="Создать стартап">
                  <Link href="/startup/create">
                    <Plus aria-hidden="true" />
                    <span className="hidden sm:inline">Создать стартап</span>
                  </Link>
                </Button>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-all duration-200 group outline-none">
                    <Avatar className="h-9 w-9 border border-border group-hover:border-primary/50 transition-all">
                      <AvatarImage
                        src={user.avatarUrl}
                        alt={avatarLetter}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {avatarLetter}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden lg:block">
                      <p className="text-sm font-semibold text-foreground leading-none">
                        {user.username}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {user.email}
                      </p>
                    </div>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account"
                      className="flex items-center cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Аккаунт</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account/favorites"
                      className="flex items-center cursor-pointer"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Избранное</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account/applications"
                      className="flex items-center cursor-pointer"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      <span>Мои заявки</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account/change-password"
                      className="flex items-center cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Настройки</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Выход из аккаунта</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex gap-[0.5rem]">
                <Link href={"/auth/signin"}>
                  <Button variant={"outline"} className="hidden sm:inline-flex">
                    Войти
                  </Button>
                </Link>
                <Link href={"/auth/signup"}>
                  <Button>Зарегистрироваться</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Header>
  );
};

export default HeaderMain;
