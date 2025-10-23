import Section from "@/src/components/ui/section";
import Container from "@/src/components/common/container/Container";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Code, Webhook } from "lucide-react";
export default function CategoriesPage() {
  return (
    <>
      <Section className="py-[4rem]">
        <Container>
          <div className="flex flex-col items-center text-center gap-[1rem]">
            <h1 className="text-4xl sm:text-5xl font-bold  text-primary animate-fade-in">
              Категории
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-delay">
              Откройте для себя идеи стартапов в различных отраслях и найдите
              идеальную нишу для своего следующего предприятия.
            </p>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-lg transition-colors duration-200">
                    <Code className="w-6 h-6 transition-colors duration-200" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    123
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                  IT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Online marketplaces, retail solutions, delivery services, and
                  commerce platforms
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
