import { useState, useCallback } from "react";
import { PropertyList } from "./list/PropertyList";
import { PropertyFiltersManager } from "./list/PropertyFiltersManager";
import { PaginationManager } from "./list/PaginationManager";
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

  // Handle filters change from the PropertyFiltersManager
  const handleFiltersChange = useCallback(async (
    filters: PropertyFilters, 
    sortBy: PropertySortBy, 
    sortOrder: SortOrder, 
    page: number
  ) => {
    setLoading(true);
    try {
      const result = await getProperties({
        filters,
        sortBy,
        sortOrder,
        page,
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
  }, [userId]);

  const handlePropertyDeleted = () => {
    // This will trigger a refresh through the filters manager
    // The current filters and pagination will be maintained
    window.location.reload();
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
      <PropertyFiltersManager
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
      {!loading && (
        <PaginationManager pagination={pagination} />
      )}
    </div>
  );
}
