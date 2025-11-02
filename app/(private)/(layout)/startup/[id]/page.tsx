import Container from "@/src/components/common/container/Container";
import Section from "@/src/components/ui/section";
import { StartupService } from "@/src/components/features/startup/api_service/startupService";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, Heart, Share2, Users } from "lucide-react";
import { formatDate } from "@/src/lib/date";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
export default async function StartupPage({
  params,
}: {
  params: { id: string };
}) {
  const id = await params.id;
  const { data: startup, error } = await StartupService.getStartupById(id);
  if (error) return error;
  console.log(startup);
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Badge className="text-sm" variant={"secondary"}>
              {startup?.stage.name}
            </Badge>
            <h1 className="text-4xl font-bold text-foreground">
              {startup?.name}
            </h1>
            <p className="text-xl text-muted-foreground">
              {startup?.short_description}
            </p>
          </div>
          <div className="flex justify-between items-center border-b pb-[2rem]">
            <div className="flex items-center gap-6 text-sm text-muted-foreground ">
              <div className="flex items-center gap-2">
                <Heart size={18} />
                <span>245 в избранном</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>12 сотрудников </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(startup?.CreatedAt)} </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={"outline"}>
                <Share2 size={18} />
                Поделиться
              </Button>
              <Button>
                <Heart size={18} /> В избранное
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8  mt-[2rem]">
          <div className="flex flex-col gap-8 max-w-fit">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Проблема</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {startup.problem}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Решение</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {startup?.solution}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Об этом стартапе
                </h2>
                {startup?.description.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-muted-foreground mb-4 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Целевая аудитория
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {startup?.target_audience}
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardContent>
                <h3 className="text-2xl font-semibold mb-4">Создатель</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      {startup?.creator.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">
                      {startup.creator.username}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {startup.creator.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
