import Container from "@/src/components/common/container/Container";
import Header from "@/src/components/common/header/Header";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import Main from "@/src/components/ui/main";
import Section from "@/src/components/ui/section";
import { Rocket, Sparkles, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import StartupImage from "@/src/assets/startup.jpg";

export default async function Home() {
  return (
    <div className="w-full flex flex-col">
      <Header className="w-full border">
        <Container>
          <div className="flex items-center justify-between py-[1rem]">
            <div className="flex items-center gap-[1rem]">
              <div className="logo">
                <Rocket color="black" size={35} />
              </div>
              <h1 className="text-[1.25rem] font-bold">IdeaCrafter</h1>
            </div>

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
      <Main>
        <Section className="w-full pt-[8rem]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-[1.1rem]">
                <Badge className="py-[0.2rem]" variant={"outline"}>
                  <Sparkles size={30} />
                  <h1 className="text-[0.8rem] ">Welcome to IdeaCrafter</h1>
                </Badge>
                <div className="flex flex-col gap-[0.8rem]">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    Discover and Build Your
                    <span className="text-blue-600"> Next Startup </span>
                  </h1>
                  <p className="text-lg font-medium text-muted-foreground leading-relaxed max-w-md">
                    Join a community of young entrepreneurs. Explore innovative
                    ideas, find collaborators, and turn your vision into reality
                    with AI-powered insights.
                  </p>
                </div>
                <div className="flex gap-[1rem]">
                  <Link href={"/generate-idea"}>
                    <Button className=" text-xl py-[1.4rem]">
                      <Rocket />
                      Generate Idea with AI
                    </Button>
                  </Link>
                  <Link href={"/startups"}>
                    <Button
                      variant={"outline"}
                      className="cursor-pointer text-xl py-[1.4rem]"
                    >
                      Explore startups
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={StartupImage} alt="hero" />
                </div>
                <div className="absolute bottom-[-30] left-0 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="bg-blue-600 p-[0.7rem] rounded-full">
                    <Users color="white" size={30} />
                  </div>
                </div>
                <div className="absolute top-[-20] right-[-10] transform z-10 animate-pulse">
                  <div className="bg-primary p-[0.7rem] rounded-full">
                    <TrendingUp color="white" size={30} />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </Main>
    </div>
  );
}
