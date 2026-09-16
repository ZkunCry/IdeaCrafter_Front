"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Search,
  Code,
  DollarSign,
  HeartPulse,
  Gamepad2,
  ShoppingCart,
  Smartphone,
  ShieldCheck,
  Plus,
  LayoutGrid,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type {
  Category,
  CategoryResponse,
} from "@/src/components/features/category/types";

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

function getCategoryIcon(slug: string) {
  return categoryIcons[slug.toLowerCase()] ?? Lightbulb;
}

const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/category/list?offset=0&limit=100")
      .then(async (response) => {
        if (!response.ok) throw new Error("Не удалось загрузить категории");
        return (await response.json()) as CategoryResponse;
      })
      .then((data) => {
        if (!cancelled) setCategories(data.items);
      })
      .catch(() => {
        if (!cancelled) setCategories([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateFilters = (category?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) params.set("category", category);
    else params.delete("category");
    params.delete("page");
    const queryString = params.toString();
    replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term.trim()) {
      params.set("query", term.trim());
    } else {
      params.delete("query");
    }
    params.delete("page");
    const queryString = params.toString();
    replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, 300);

  return (
    <aside className="w-full lg:w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Поиск идей стартапов..."
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
            defaultValue={searchParams.get("query")?.toString()}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Быстрые действия
        </h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" size="sm" asChild>
            <Link href="/startup/create">
              <Plus className="w-4 h-4" />
              Создать стартап
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm" asChild>
            <Link href="/categories">
              <LayoutGrid className="w-4 h-4" />
              Все категории
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Категории</h3>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateFilters()}
              className="text-xs h-6 px-2"
            >
              Сбросить
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.slug);
            const isSelected = selectedCategory === category.slug;

            return (
              <button
                key={category.id}
                onClick={() =>
                  updateFilters(isSelected ? undefined : category.slug)
                }
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-accent border border-primary/20"
                    : "hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="rounded-md bg-primary/10 p-1.5 text-primary">
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {category.name}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Trending Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {["AI", "SaaS", "Blockchain", "Mobile", "IoT", "Green Tech"].map(
            (tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs cursor-pointer hover:bg-accent"
              >
                {tag}
              </Badge>
            ),
          )}
        </div>
      </div> */}
    </aside>
  );
};

export default Filters;
