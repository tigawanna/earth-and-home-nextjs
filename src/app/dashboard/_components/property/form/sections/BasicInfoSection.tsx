"use client";

import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyFormData } from "../property-form-schema";
import { 
  TextFieldComponent, 
  TextareaFieldComponent, 
  SelectFieldComponent 
} from "../form-fields";
import { createEnumOptions } from "@/utils/forms";

interface BasicInfoSectionProps {
  control: Control<PropertyFormData>;
}

const propertyTypeOptions = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "duplex", label: "Duplex" },
  { value: "studio", label: "Studio" },
  { value: "villa", label: "Villa" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "farm", label: "Farm" },
];

const listingTypeOptions = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
];

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "sold", label: "Sold" },
  { value: "rented", label: "Rented" },
  { value: "off_market", label: "Off Market" },
];

export function BasicInfoSection({ control }: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <p className="text-sm text-muted-foreground">
          Start by selecting your property type - this will determine which fields are available
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Type Selection - Most Important */}
        <div className="p-4 border-2 border-dashed border-primary/20 rounded-lg bg-primary/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectFieldComponent
              control={control}
              name="propertyType"
              label="Property Type"
              placeholder="Select property type"
              options={propertyTypeOptions}
              required
              description="Choose whether you're listing land or a building"
            />
            
            <SelectFieldComponent
              control={control}
              name="listingType"
              label="Listing Type"
              placeholder="Select listing type"
              options={listingTypeOptions}
              required
              description="Are you selling or renting?"
            />
          </div>
        </div>

        {/* Property Details */}
        <TextFieldComponent
          control={control}
          name="title"
          label="Property Title"
          placeholder="Enter a descriptive title for your property"
          description="This will be the main headline for your property listing"
          required
        />

        <TextareaFieldComponent
          control={control}
          name="description"
          label="Property Description"
          placeholder="Describe your property in detail..."
          description="Provide details about the property's features, condition, and highlights"
        />

        <SelectFieldComponent
          control={control}
          name="status"
          label="Listing Status"
          placeholder="Select status"
          options={statusOptions}
          description="Current status of your property listing"
        />
      </CardContent>
    </Card>
  );
}
