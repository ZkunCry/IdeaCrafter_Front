import Link from "next/link";
import { Suspense } from "react";
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
import { Button } from "@/src/components/ui/button";
import {
  ArrowRight,
  Code,
  DollarSign,
  Gamepad2,
  HeartPulse,
  LayoutGrid,
  Lightbulb,
  SearchX,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { CategoryService } from "@/src/components/features/category/api_service/categoryService";
import CategorySearch from "@/src/components/features/category/CategorySearch";
import { StartupPagination } from "@/src/components/features/startup/review/StartupPagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;

const categoryIcons: Record<string, LucideIcon> = {
  technology: Code,
  it: Code,
  finance: DollarSign,
  health: HeartPulse,
  gaming: Gamepad2,
  ecommerce: ShoppingCart,
  cybersecurity: ShieldCheck,
  mobile: Smartphone,
};

function getCategoryIcon(slug: string): LucideIcon {
  return categoryIcons[slug.trim().toLowerCase()] ?? Lightbulb;
}

function startupsLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} стартап`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return `${count} стартапа`;
  return `${count} стартапов`;
}

type CategoriesPageProps = {
  searchParams: Promise<{ query?: string; page?: string }>;
};

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const { query, page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const { data: categories, error } = await CategoryService.getCategories(
    currentPage - 1,
    PAGE_SIZE,
    query,
  );
  const items = categories?.items ?? [];

  return (
    <>
      <Section className="mb-8 text-center space-y-4 animate-fade-in pb-[4rem]">
        <Container>
          <div className="flex flex-col items-center text-center gap-[1rem]">
            <h1 className="text-4xl sm:text-5xl font-bold animate-fade-in">
              Категории
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-delay">
              Откройте для себя идеи стартапов в различных отраслях и найдите
              идеальную нишу для своего следующего предприятия.
            </p>
            <Suspense>
              <CategorySearch />
            </Suspense>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          {error ? (
            <Card className="border-destructive/30 py-12 text-center shadow-none">
              <CardContent className="text-destructive">{error}</CardContent>
            </Card>
          ) : items.length === 0 ? (
            <Card className="py-12 text-center shadow-none">
              <CardContent className="flex flex-col items-center gap-3">
                <SearchX className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">
                  {query
                    ? `По запросу «${query}» категорий не найдено`
                    : "Категорий пока нет"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentPage === 1 && !query ? (
                <Link href="/startups" className="group block">
                  <Card className="h-full border-dashed border-border/70 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="rounded-lg bg-muted p-3 text-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                          <LayoutGrid aria-hidden="true" className="h-6 w-6" />
                        </div>
                      </div>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary">
                        Все стартапы
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="flex items-center gap-1 text-sm">
                        Смотреть без фильтра
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ) : null}

              {items.map((category) => {
                const Icon = getCategoryIcon(category.slug);

                return (
                  <Link
                    key={category.id}
                    href={`/startups?category=${encodeURIComponent(category.slug)}`}
                    className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Стартапы в категории «${category.name}»`}
                  >
                    <Card className="h-full border-border/50 transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon
                              aria-hidden="true"
                              className="h-6 w-6 transition-colors duration-200"
                            />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-semibold transition-colors duration-200 group-hover:text-primary">
                          {category.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="flex items-center gap-1 text-sm leading-relaxed">
                          {startupsLabel(category.count)}
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}

          <Suspense>
            <StartupPagination
              currentPage={currentPage}
              totalPages={categories?.total_count ?? 0}
            />
          </Suspense>

          {query && !error ? (
            <div className="mt-6 flex justify-center">
              <Button variant="ghost" asChild>
                <Link href="/categories">Сбросить поиск</Link>
              </Button>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
