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
import { CategoryService } from "@/src/components/features/category/api_service/categoryService";
export default async function CategoriesPage() {
  const { data: categories, error } = await CategoryService.getCategories(
    0,
    10
  );
  if (error) return <p>{error}</p>;
  return (
    <>
      <Section>
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
            {categories?.items.map((category) => (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20"
              >
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
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {" "}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
