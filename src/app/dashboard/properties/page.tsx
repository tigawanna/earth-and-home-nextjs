
import { getProperties } from "@/actions/drizzle/property-queries";
import { PropertyDashboard } from "../_components/property/PropertyDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PropertyFilters, PropertySortBy, SortOrder } from "@/actions/drizzle/property-types";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const params = await searchParams;

  // Convert search params to filters
  const filters: PropertyFilters = {
    agentId: session.user.id, // Always filter by user's properties
    search: params.search as string,
    propertyType: params.propertyType as string,
    listingType: params.listingType as "sale" | "rent",
    status: params.status as string,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    beds: params.beds ? Number(params.beds) : undefined,
    baths: params.baths ? Number(params.baths) : undefined,
    city: params.city as string,
    isFeatured: params.featured === "true" ? true : undefined,
  };

  const sortBy = (params.sortBy as PropertySortBy) || "createdAt";
  const sortOrder = (params.sortOrder as SortOrder) || "desc";
  const page = params.page ? Number(params.page) : 1;

  // Get user's properties with filters
  const result = await getProperties({
    filters,
    sortBy,
    sortOrder,
    page,
    limit: 20,
    userId: session.user.id,
  });

  return (
    <PropertyDashboard
      initialProperties={result.success ? result.properties : []}
      initialPagination={result.success ? result.pagination : { page: 1, limit: 20, totalCount: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false }}
      userId={session.user.id}
      showActions={true}
      showFavorite={false}
      title="My Properties"
    />
  );
}
