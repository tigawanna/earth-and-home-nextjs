"use client";

import { PropertyFormData } from "@/app/dashboard/_components/property/form/property-form-schema";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PropertyForm = dynamic(() => import("@/app/dashboard/_components/property/form/PropertyForm"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Loader className="h-8 w-8 animate-spin text-muted" />
    </div>
  ),
});

export default function AddPropertyPage() {
  const router = useRouter();

  const handleSubmit = async (data: PropertyFormData) => {
    try {
      console.log("Form submitted:", data);
      // TODO: Implement actual API call to save property
      // const response = await fetch("/api/properties", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      
      // if (!response.ok) throw new Error("Failed to create property");
      
      toast.success("Property added successfully!");
      router.push("/dashboard/properties");
    } catch (error) {
      console.error("Failed to add property:", error);
      toast.error("Failed to add property. Please try again.");
      throw error; // Re-throw so PropertyForm can handle the loading state
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New Property</h2>
        <p className="text-muted-foreground">
          Fill in the details to list your property
        </p>
      </div>
      
      {/* Form */}
      <div className="bg-background">
        <PropertyForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
