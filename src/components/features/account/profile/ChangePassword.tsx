import React from "react";
import { TabsContent } from "@/src/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
const ChangePassword = () => {
  return (
    <Card className="max-w-[850px] hover-scale">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your account security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input id="confirm-password" type="password" className="mt-1" />
        </div>
        <Button className="w-full hover-scale">Change Password</Button>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
