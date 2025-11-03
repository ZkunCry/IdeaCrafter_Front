import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardAction,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { Users } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Heart } from "lucide-react";
import type { Startup } from "../types";
import Link from "next/link";
const StartupCard = ({ startup }: { startup: Startup }) => {
  return (
    <Card className="w-full gap-3 group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer relative">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-[1rem]">
            {startup.categories?.map((category) => (
              <Badge
                key={`${category.id}-${category.name}`}
                className="font-semibold"
                variant={"secondary"}
              >
                {category.name}
              </Badge>
            ))}
          </div>

          <div className="flex items-end gap-1 text-green-600">
            <TrendingUp size={18} />
            <span className="text-sm">Trending</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>
          <h3 className="font-semibold tracking-tight text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {startup.name}
          </h3>{" "}
        </CardTitle>
        <CardDescription className="mt-3">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {startup.description}
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
            <Users className="text-muted-foreground" size={14} />
            <span className="text-sm text-muted-foreground">12</span>
          </div>
          <CardAction className="relative z-10">
            <Button className="cursor-pointer " variant={"outline"}>
              <Heart />
              Favorite
            </Button>
          </CardAction>
        </div>
      </CardFooter>
      <Link
        href={`/startup/${startup.id}`}
        className="absolute inset-0 w-full z-[5]"
      />
    </Card>
  );
};

export default StartupCard;
