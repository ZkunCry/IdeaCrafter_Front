import React from "react";
import Link from "next/link";
import Header from "@/src/components/common/header/Header";
import Container from "@/src/components/common/container/Container";
import { Rocket } from "lucide-react";
import { Button } from "@/src/components/ui/button";
const HeaderMain = () => {
  return (
    <Header className="w-full border fixed top-0 z-50  border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex items-center justify-between py-[1rem]">
          <Link href={"/"}>
            <div className="flex items-center gap-[1rem]">
              <div className="logo">
                <Rocket color="black" size={35} />
              </div>
              <h1 className="text-[1.25rem] font-bold">IdeaCrafter</h1>
            </div>
          </Link>

          <nav className="text-[1.1rem]">
            <ul className="flex items-center gap-4">
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <Link href="#">Home</Link>
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <Link href="#">Categories</Link>
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <Link href="#">Startups</Link>
              </li>
              <li className="text-muted-foreground hover:text-primary transition-colors">
                <Link href="#">Generate Idea</Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-[0.5rem]">
            <Link href={"/auth/signin"}>
              <Button className="cursor-pointer" variant={"outline"}>
                Login
              </Button>
            </Link>

            <Link href={"/auth/signup"}>
              <Button className="cursor-pointer">Register</Button>
            </Link>
          </div>
        </div>
      </Container>
    </Header>
  );
};

export default HeaderMain;
