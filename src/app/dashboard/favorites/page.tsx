import { getFavoriteProperties } from "@/actions/drizzle/property";
import { PropertyDashboard } from "../_components/property/PropertyDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function FavoritesPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Get user's favorite properties
  const result = await getFavoriteProperties(session.user.id, 1, 20);

  return (
    <PropertyDashboard
      initialProperties={result.success ? result.properties : []}
      initialPagination={result.success ? result.pagination : { page: 1, limit: 20, totalCount: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false }}
      userId={session.user.id}
      showActions={false}
      showFavorite={true}
      title="My Favorites"
    />
  );
}
