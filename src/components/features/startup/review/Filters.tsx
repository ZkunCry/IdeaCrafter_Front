"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Search,
  Code,
  DollarSign,
  Heart,
  Gamepad2,
  Truck,
  Smartphone,
  Shield,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const categories = [
  {
    name: "IT & Technology",
    icon: Code,
    count: 156,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Finance",
    icon: DollarSign,
    count: 89,
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Health & Wellness",
    icon: Heart,
    count: 124,
    color: "bg-red-100 text-red-700",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    count: 67,
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "E-commerce",
    icon: Truck,
    count: 92,
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Mobile Apps",
    icon: Smartphone,
    count: 134,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "Cybersecurity",
    icon: Shield,
    count: 45,
    color: "bg-gray-100 text-gray-700",
  },
];

const Filters = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <aside className="w-full lg:w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search startup ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <Button variant="default" className="w-full justify-start" size="sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate AI Idea
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            Create startup
          </Button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Categories</h3>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="text-xs h-6 px-2"
            >
              Clear
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;

            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-accent border border-primary/20"
                    : "hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-1.5 rounded-md ${category.color}`}>
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

      <div className="mt-6 pt-6 border-t border-border">
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
            )
          )}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
