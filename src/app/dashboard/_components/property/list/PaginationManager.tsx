"use client";

import { useQueryState, parseAsInteger } from "nuqs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PaginationManagerProps {
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export function PaginationManager({ pagination }: PaginationManagerProps) {
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <Card>
      <CardContent className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * pagination.limit + 1} to{" "}
          {Math.min(currentPage * pagination.limit, pagination.totalCount)} of{" "}
          {pagination.totalCount} properties
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrevPage}>
            Previous
          </Button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
            const page = Math.max(1, currentPage - 2) + i;
            if (page > pagination.totalPages) return null;

            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}>
                {page}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNextPage}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
