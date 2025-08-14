import { getProperty } from "@/dal/drizzle/property-queries";
import { SinglePropertyNotFound } from "./query-states";

interface SinglePropertyProps {
  id: string; // Property ID to fetch details
}

export async function SingleProperty({ id }: SinglePropertyProps) {
  const property = await getProperty(id);
  if (!property.success) {
    return <SinglePropertyNotFound />;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Property Details</h1>
      <p className="text-gray-500">Displaying details for property ID: {id}</p>
    </div>
  );
}
