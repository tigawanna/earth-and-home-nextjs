import { Suspense } from "react";
import { SingleProperty } from "../_components/SingleProperty";
import { SinglePropertyLoadingFallback } from "../_components/query-states";

interface PageProps {
  params: {
    id: string;
  };
}

export default function SinglePropertyPage({ params }: PageProps) {
  return (
    <section className="w-full h-full  flex flex-col items-center justify-center">
      <Suspense fallback={<SinglePropertyLoadingFallback />}>
        <SingleProperty id={params.id} />
      </Suspense>
    </section>
  );
}
