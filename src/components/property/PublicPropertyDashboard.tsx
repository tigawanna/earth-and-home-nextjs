import { PublicPropertyList } from "@/components/property/list/PublicPropertyList";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { getProperties } from "@/actions/drizzle/property-queries";
import { PropertyFilters as PropertyFiltersType, PropertySortBy, SortOrder } from "@/actions/drizzle/property-types";

interface PublicPropertyDashboardProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function PublicPropertyDashboard({
  searchParams,
}: PublicPropertyDashboardProps) {
  // Convert search params to filters
  const filters: PropertyFiltersType = {
    search: searchParams.search as string,
    propertyType: searchParams.propertyType as string,
    listingType: searchParams.listingType as "sale" | "rent",
    status: "active", // Only show active properties in public view
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    beds: searchParams.beds ? Number(searchParams.beds) : undefined,
    baths: searchParams.baths ? Number(searchParams.baths) : undefined,
    city: searchParams.city as string,
    isFeatured: searchParams.featured === "true" ? true : undefined,
  };

  const sortBy = (searchParams.sortBy as PropertySortBy) || "createdAt";
  const sortOrder = (searchParams.sortOrder as SortOrder) || "desc";
  const page = searchParams.page ? Number(searchParams.page) : 1;

  // Get properties with filters
  const result = await getProperties({
    filters,
    sortBy,
    sortOrder,
    page,
    limit: 20,
  });

  const properties = result.success ? result.properties : [];
  const totalCount = result.success ? result.pagination.totalCount : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Properties</h1>
        <p className="text-muted-foreground">
          {totalCount} {totalCount === 1 ? "property" : "properties"} available
        </p>
      </div>

      {/* Filters - No status filter for public view */}
      <PropertyFilters 
        showStatusFilter={false}
      />

      {/* Properties List */}
      <PublicPropertyList
        properties={properties}
      />
    </div>
  );
}
