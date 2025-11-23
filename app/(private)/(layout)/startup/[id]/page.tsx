import Container from "@/src/components/common/container/Container";
import Section from "@/src/components/ui/section";
import { StartupService } from "@/src/components/features/startup/api_service/startupService";
import { Badge } from "@/src/components/ui/badge";
import {
  Calendar,
  Heart,
  Share2,
  Users,
  Tag,
  ExternalLink,
  Mail,
  AlertCircle,
  Home,
  Search,
  Target,
  Lightbulb,
  CheckCircle,
  Eye,
  FileText,
  Briefcase,
  Rocket,
} from "lucide-react";
import { formatDate } from "@/src/lib/date";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
export default async function StartupPage({
  params,
}: {
  params: { id: string };
}) {
  const id = await params.id;
  const { data: startup, error } = await StartupService.getStartupById(id);
  if (error) return error;
  console.log(startup.categories.length);
  return (
    <Section>
      <Container>
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <div className="flex items-start gap-6 mb-8  ">
            <div className="min-w-[124px] min-h-[124px] md:min-w-[200px] md:min-h-[200px] rounded-2xl overflow-hidden border-2 border-border shadow-xl bg-card">
              {startup?.LogoURL && (
                <Image
                  className="w-full h-full object-cover aspect-square"
                  src={startup.LogoURL}
                  alt="Logo"
                  width={128}
                  height={128}
                />
              )}
            </div>

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
          </div>

          <div className="flex justify-between items-center border-b pb-[2rem] ">
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
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-[2rem]">
            <div className="flex flex-col gap-8">
              <Card className="border-2 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-card/50">
                <CardContent className="p-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="problem"
                  >
                    <AccordionItem
                      value="problem"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="hover:no-underline group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/10 to-orange-500/10 group-hover:from-red-500/20 group-hover:to-orange-500/20 transition-colors">
                            <Target className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                          <span className="text-xl font-semibold">
                            Проблема
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-2">
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {startup.problem}
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="solution"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="hover:no-underline group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 group-hover:from-green-500/20 group-hover:to-emerald-500/20 transition-colors">
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-xl font-semibold">Решение</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-2">
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {startup.solution}
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="description" className="border-0">
                      <AccordionTrigger className="hover:no-underline group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-colors">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-xl font-semibold">
                            Полное описание
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-2">
                        <div className="prose prose-lg max-w-none">
                          {startup.description
                            .split("\n\n")
                            .map((paragraph, index) => (
                              <p
                                key={index}
                                className="text-muted-foreground mb-4 leading-relaxed text-base"
                              >
                                {paragraph}
                              </p>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-card/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                      <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">
                        Целевая аудитория
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {startup.target_audience}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {startup.categories.length > 0 && (
                <Card className="border-2 hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-card/50 hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10">
                        <Tag className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3">
                          Categories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {startup.categories.map((category: any) => (
                            <Badge
                              key={category.id}
                              variant="outline"
                              className="border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors px-3 py-1 text-sm"
                            >
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
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
        </div>
      </Container>
    </Section>
  );
}
