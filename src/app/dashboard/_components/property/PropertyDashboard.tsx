"use client";

import { useState, useEffect } from "react";

import { PropertyList } from "./PropertyList";
import { PropertyFilters as PropertyFiltersComponent } from "./PropertyFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { getProperties } from "@/actions/drizzle/property-queries";
import { PropertyWithAgent, PropertyFilters, PropertySortBy, SortOrder } from "@/actions/drizzle/property-types";

interface PropertyDashboardProps {
  initialProperties: PropertyWithAgent[];
  initialPagination: any;
  userId?: string;
  showActions?: boolean;
  showFavorite?: boolean;
  title?: string;
}

export function PropertyDashboard({
  initialProperties,
  initialPagination,
  userId,
  showActions = true,
  showFavorite = true,
  title = "Properties",
}: PropertyDashboardProps) {
  const [properties, setProperties] = useState<PropertyWithAgent[]>(initialProperties);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  // Filter and sort state
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [sortBy, setSortBy] = useState<PropertySortBy>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch properties when filters change
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const result = await getProperties({
          filters,
          sortBy,
          sortOrder,
          page: currentPage,
          limit: 20,
          userId,
        });

        if (result.success) {
          setProperties(result.properties);
          setPagination(result.pagination);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, sortBy, sortOrder, currentPage, userId]);

  const handleFiltersChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = (newSortBy: PropertySortBy, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handleClearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handlePropertyDeleted = () => {
    // Refresh the current page
    const fetchProperties = async () => {
      const result = await getProperties({
        filters,
        sortBy,
        sortOrder,
        page: currentPage,
        limit: 20,
        userId,
      });

      if (result.success) {
        setProperties(result.properties);
        setPagination(result.pagination);
      }
    };

    fetchProperties();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            {pagination.totalCount} {pagination.totalCount === 1 ? "property" : "properties"} found
          </p>
        </div>
        {showActions && (
          <Button asChild>
            <Link href="/dashboard/properties/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </Button>
        )}
      </div>

      {/* Filters */}
      <PropertyFiltersComponent
        filters={filters}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onFiltersChange={handleFiltersChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />

      {/* Loading Overlay */}
      {loading && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading properties...</span>
          </CardContent>
        </Card>
      )}

      {/* Properties List */}
      {!loading && (
        <PropertyList
          properties={properties}
          showActions={showActions}
          showFavorite={showFavorite}
          onPropertyDeleted={handlePropertyDeleted}
        />
      )}

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
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
      )}
    </div>
  );
}
