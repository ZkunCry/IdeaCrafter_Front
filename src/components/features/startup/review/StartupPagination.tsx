"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

export function StartupPagination({ currentPage, totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageLink = (page: number) => {
    const basePath = pathname.replace(/\/$/, "");

    const newParams = new URLSearchParams(searchParams?.toString() || "");

    newParams.set("page", String(page));

    const queryString = newParams.toString();

    return `${basePath}?${queryString}`;
  };
  const visiblePages = getVisiblePages(currentPage, totalPages);
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageLink(currentPage - 1)} />
          </PaginationItem>
        )}

        {visiblePages.map((page, idx) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageLink(page as number)}
                isActive={page === currentPage + 1}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageLink(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2)
    return [1, "...", total - 3, total - 2, total - 1, total];

  return [1, "...", current - 1, current, current + 1, "...", total];
}
