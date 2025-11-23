"use client";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Upload } from "lucide-react";
import { Textarea } from "@/src/components/ui/textarea";
import { TabsContent } from "@radix-ui/react-tabs";

const Profile = () => {
  return (
    <div className="max-w-[850px]  space-y-6 animate-fade-in">
      <Card className="hover-scale">
        <CardHeader>
          <CardTitle>Информация об аккаунте</CardTitle>
          <CardDescription>Управляйте своей информацией</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl">TU</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="hover-scale">
              <Upload className="h-4 w-4 mr-2" />
              Загрузить фотографию
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Никнейм</Label>
              <Input id="username" defaultValue="testuser" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Почта</Label>
              <Input
                id="email"
                type="email"
                defaultValue="test@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bio">Информация об аккаунте</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                className="mt-1"
              />
            </div>
            <Button className="w-full hover-scale">Сохранить изменения</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
