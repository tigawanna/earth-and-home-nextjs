import { getFavoriteProperties } from "@/actions/drizzle/property-queries";
import { PropertyDashboard } from "../_components/property/PropertyDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function FavoritesPage({
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
  const page = params.page ? Number(params.page) : 1;

  // Get user's favorite properties
  const result = await getFavoriteProperties(session.user.id, page, 20);

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
