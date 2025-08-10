"use client";

// import  PropertyForm  from "@/components/property/form/PropertyForm";
import { PropertyFormData } from "@/components/property/form/property-form-schema";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";

const PropertyForm = dynamic(() => import("@/components/property/form/PropertyForm"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Loader className="h-8 w-8 animate-spin text-muted" />
    </div>
  ),
});

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
