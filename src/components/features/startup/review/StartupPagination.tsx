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
  /** 1-based number of the page being shown. */
  currentPage: number;
  totalPages: number;
}

export function StartupPagination({ currentPage, totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageLink = (page: number) => {
    const basePath = pathname.replace(/\/$/, "");
    const newParams = new URLSearchParams(searchParams?.toString() || "");

    if (page <= 1) newParams.delete("page");
    else newParams.set("page", String(page));

    const queryString = newParams.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
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
                href={createPageLink(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
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
