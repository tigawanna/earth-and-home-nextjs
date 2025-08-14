import { SinglePropertyLoadingFallback } from "@/app/properties/_components/query-states";
import { SingleProperty } from "@/app/properties/_components/SingleProperty";
import { Suspense } from "react";


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
