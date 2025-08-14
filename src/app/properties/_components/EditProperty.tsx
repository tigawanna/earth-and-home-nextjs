import { getProperty } from "@/dal/drizzle/property-queries";
import { SinglePropertyNotFound } from "./query-states";
import PropertyForm from "@/components/property/form/PropertyForm";

interface EditPropertyProps {
  id: string;
}

export async function EditProperty({ id }: EditPropertyProps) {
  const result = await getProperty(id);

  if (!result.success || !result.property) {
    return <SinglePropertyNotFound />;
  }

  const property = result.property;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <PropertyForm
        initialData={{
          amenities: (property.amenities || undefined) as any,
          country: property.country || undefined,
        }}
        isEdit
      />
    </div>
  );
}
