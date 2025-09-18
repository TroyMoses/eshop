"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function CategoriesSidebar() {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <aside className="w-64 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold text-foreground">ALL CATEGORIES</h2>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="space-y-1">
          {categories.map((category) => (
            <Collapsible
              key={category.id}
              open={openCategories.includes(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <div className="space-y-1">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-auto p-2 text-left font-normal hover:bg-muted"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{category.icon}</span>
                      <span className="text-sm text-muted-foreground">
                        {category.name}
                      </span>
                    </div>
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <ChevronRight
                          className={`h-3 w-3 transition-transform ${
                            openCategories.includes(category.id)
                              ? "rotate-90"
                              : ""
                          }`}
                        />
                      )}
                  </Button>
                </CollapsibleTrigger>

                {category.subcategories &&
                  category.subcategories.length > 0 && (
                    <CollapsibleContent className="pl-6 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/categories/${category.slug}/${subcategory.slug}`}
                          className="block py-1 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  )}
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </aside>
  );
}
