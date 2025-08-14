import { Suspense } from "react";
import { SingleProperty } from "../_components/SingleProperty";
import { SinglePropertyLoadingFallback } from "../_components/query-states";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SinglePropertyPage({ params }: PageProps) {
  const { id } = await params;
  
  return (
    <section className="w-full min-h-screen">
      <Suspense fallback={<SinglePropertyLoadingFallback />}>
        <SingleProperty id={id} />
      </Suspense>
    </section>
  );
}
