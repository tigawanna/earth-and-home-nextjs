"use client"

import { PropertyForm } from "@/components/property/form/PropertyForm";
import { PropertyFormData } from "@/components/property/form/property-form-schema";

export default function PropertyFormDemo() {
  const handleSubmit = async (data: PropertyFormData) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your API
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-background">
      <PropertyForm onSubmit={handleSubmit} />
    </div>
  );
}
