
import { getProperties } from "@/actions/drizzle/property-queries";
import { PropertyDashboard } from "../_components/property/PropertyDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PropertiesPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Get user's properties
  const result = await getProperties({
    filters: { agentId: session.user.id },
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
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
