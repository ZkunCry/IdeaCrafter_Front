import Container from "@/src/components/common/container/Container";
import Header from "@/src/components/common/header/Header";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import Main from "@/src/components/ui/main";
import Section from "@/src/components/ui/section";
import { Rocket, Sparkles, Users, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import StartupImage from "@/src/assets/startup.jpg";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/src/components/ui/card";
import HeaderMain from "@/src/components/widgets/header/HeaderMain";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="w-full flex flex-col">
      <HeaderMain />

      <Main>
        <Section className="w-full pt-[9rem]">
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
                  <div className="bg-green-600 p-[0.7rem] rounded-full">
                    <TrendingUp color="white" size={30} />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
        <Section className="w-full pt-[8rem]">
          <Container>
            <div className="flex lg:flex-row flex-col">
              <div className="flex-1 lg:order-1 gap-8">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-foreground">
                      Trending Startup Ideas
                    </h2>
                    <p className="text-muted-foreground">
                      Discover the most popular and innovative startup ideas
                      from our community
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="w-full gap-3 group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge
                            className="font-semibold"
                            variant={"secondary"}
                          >
                            Green Tech
                          </Badge>
                          <div className="flex items-end gap-1 text-green-600">
                            <TrendingUp size={18} />
                            <span className="text-sm">Trending</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle>
                          <h3 className="font-semibold tracking-tight text-lg leading-tight group-hover:text-blue-600 transition-colors">
                            EcoTrack - carbon Footpring Tracker
                          </h3>{" "}
                        </CardTitle>
                        <CardDescription className="mt-3">
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            AI-powered app that helps individuals and businesses
                            track, reduce, and offset their carbon footprint
                            through personalized recommendations and
                            gamification.
                          </p>
                        </CardDescription>
                        <div className="flex gap-2">
                          <Badge variant={"outline"}>AI</Badge>
                          <Badge variant={"outline"}>Sustainability</Badge>
                          <Badge variant={"outline"}>Mobile</Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full justify-between">
                          <div className="flex items-center gap-1">
                            <Users
                              className="text-muted-foreground"
                              size={14}
                            />
                            <span className="text-sm text-muted-foreground">
                              12
                            </span>
                          </div>
                          <CardAction>
                            <Button
                              className="cursor-pointer"
                              variant={"outline"}
                            >
                              <Heart />
                              Favorite
                            </Button>
                          </CardAction>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="flex"></div>
            </div>
          </Container>
        </Section>
      </Main>
    </div>
  );
}
