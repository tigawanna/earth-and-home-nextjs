"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  PropertyFormData,
  propertyFormSchema,
  defaultPropertyFormValues,
} from "./property-form-schema";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { LocationSection } from "./sections/LocationSection";
import { BuildingSection } from "./sections/BuildingSection";
import { LandSection } from "./sections/LandSection";
import { ParkingSection } from "./sections/ParkingSection";
import { PricingSection } from "./sections/PricingSection";
import { FeaturesAmenitiesSection } from "./sections/FeaturesAmenitiesSection";
import { MediaSection } from "./sections/MediaSection";
import { ImagesUploadSection } from "./files/ImagesUploadSection";
import { useState, useTransition } from "react";
import { Loader2, Save, Eye } from "lucide-react";
import { toast } from "sonner";
import { useWatch } from "react-hook-form";
import { isLandProperty } from "@/utils/forms";
import { FormPersist } from "@/lib/react-hook-form/FormPersist";
import { createProperty, updateProperty } from "@/actions/drizzle/property";
import { useRouter } from "next/navigation";




interface PropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  onSubmit?: (data: PropertyFormData) => Promise<void> | void;
  isEdit?: boolean;
  propertyId?: string; // Add propertyId for editing
}

export default function PropertyForm({ initialData, onSubmit, isEdit = false, propertyId }: PropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema) as any,
    defaultValues: {
      ...defaultPropertyFormValues,
      ...initialData,
    } as PropertyFormData,
  });

  // Watch property type for conditional rendering
  const propertyType = useWatch({ control: form.control, name: "propertyType" });
  const isLand = isLandProperty(propertyType);

  const handleSubmit = async (data: PropertyFormData) => {
    if (onSubmit) {
      // Use custom submit handler if provided
      setIsSubmitting(true);
      try {
        await onSubmit(data);
        toast.success(isEdit ? "Property updated successfully!" : "Property created successfully!");
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error("Failed to save property. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Use default actions
    setIsSubmitting(true);
    try {
      let result;
      
      if (isEdit && propertyId) {
        result = await updateProperty(propertyId, data);
      } else {
        result = await createProperty(data);
      }

      if (result.success) {
        toast.success(result.message);
        // Redirect to the property page or dashboard
        if (result.property?.slug) {
          router.push(`/properties/${result.property.slug}`);
        } else {
          router.push("/dashboard/properties");
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to save property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    const data = form.getValues();
    data.status = "draft";
    await handleSubmit(data);
  };

  const handlePublish = async () => {
    const data = form.getValues();
    data.status = "active";
    await handleSubmit(data);
  };

  return (
    <div className="w-full   p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{isEdit ? "Edit Property" : "Add New Property"}</h1>
        <p className="text-muted-foreground">
          {isEdit
            ? "Update your property information"
            : "Fill in the details to list your property"}
        </p>
        {propertyType && (
          <div className="flex justify-center">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isLand
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              }`}>
              {isLand ? "🏞️ Land Property" : "🏠 Building Property"}
            </span>
          </div>
        )}
      </div>
      <FormPersist form={form} formKey="property-form" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePublish)} className="space-y-6">
          {/* Basic Information - Always shown */}
          <BasicInfoSection control={form.control as any} />

          <Separator />

          {/* Location Details - Always shown */}
          <LocationSection control={form.control as any} />

          <Separator />

          {/* Conditional Sections based on Property Type */}
          {!isLand && (
            <>
              {/* Building Information - Only for non-land properties */}
              <BuildingSection control={form.control as any} />
              <Separator />

              {/* Parking & Climate Control - Only for non-land properties */}
              <ParkingSection control={form.control as any} />
              <Separator />
            </>
          )}

          {isLand && (
            <>
              {/* Land Information - Only for land properties */}
              <LandSection control={form.control as any} />
              <Separator />
            </>
          )}

          {/* Pricing - Always shown */}
          <PricingSection control={form.control as any} />

          <Separator />

          {/* Features & Amenities - Always shown */}
          <FeaturesAmenitiesSection control={form.control as any} />

          <Separator />

          {/* Images Upload - Always shown */}
          <ImagesUploadSection 
          control={form.control as any} 
          propertyTitle={form.watch("title")} />

          <Separator />

          {/* Media - Always shown */}
          <MediaSection control={form.control as any} />

          {/* Form Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="flex items-center gap-2">
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save as Draft
                </Button>

                <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  {isEdit ? "Update Property" : "Publish Property"}
                </Button>
              </div>

              {/* Form State Debug (dev only) */}
              {process.env.NODE_ENV === "development" && (
                <details className="mt-4 p-4 bg-muted rounded-lg">
                  <summary className="cursor-pointer text-sm font-medium">
                    Form State (Development)
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto">
                    {JSON.stringify(form.formState.errors, null, 2)}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
