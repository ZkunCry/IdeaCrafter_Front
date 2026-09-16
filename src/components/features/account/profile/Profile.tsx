"use client";
import React from "react";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useUser } from "@/src/store/user";

const Profile = () => {
  const user = useUser();
  return (
    <div className="max-w-[850px] space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Информация об аккаунте</CardTitle>
          <CardDescription>Данные, указанные при регистрации</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Никнейм</Label>
              <Input
                id="username"
                value={user.username}
                readOnly
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Почта</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                readOnly
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
