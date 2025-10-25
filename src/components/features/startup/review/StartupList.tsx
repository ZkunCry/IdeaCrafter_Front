import React from "react";
import type { Startup } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Heart } from "lucide-react";
const StartupList = ({ initialData }: { initialData: Startup[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-6 flex-1">
      {initialData.map((startup, index) => (
        <Card
          key={startup.id}
          className="hover-scale cursor-pointer transition-all duration-300 hover:shadow-lg group animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader>
            <div className="flex items-start justify-between relative">
              <div className="space-y-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {startup.name}
                </CardTitle>
              </div>
              <div className=" flex space-x-2">
                <Badge variant={"secondary"}>{startup.stage.name}</Badge>
              </div>
            </div>
            <CardDescription className="line-clamp-3">
              {startup.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* <div className="flex flex-wrap gap-1">
                {startup.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div> */}
              <div className="relative">
                <div className="">
                  {startup.categories?.map((category) => (
                    <Badge
                      key={`${category.id}-${category.name}`}
                      variant="outline"
                      className="text-xs"
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{startup.creator.username}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StartupList;
