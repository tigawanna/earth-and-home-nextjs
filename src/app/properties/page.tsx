import { PublicPropertyListings } from "@/components/property/PublicPropertyListings";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { PropertyFilters } from "@/components/property/list/PropertyFilters";

function LoadingFallback() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading properties...</span>
      </CardContent>
    </Card>
  );
}

export default async function PublicPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return (
    <div className="container mx-auto py-8">
      <PropertyFilters showStatusFilter={false} />
      <Suspense fallback={<LoadingFallback />}>
        <PublicPropertyListings searchParams={params} />
      </Suspense>
    </div>
  );
}
