"use client";

import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyFormData } from "../property-form-schema";
import { TextFieldComponent, NumberFieldComponent } from "../form-fields";

interface LocationSectionProps {
  control: Control<PropertyFormData>;
}

export function LocationSection({ control }: LocationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TextFieldComponent
          control={control}
          name="location"
          label="Location Description"
          placeholder="e.g., Westlands, Nairobi"
          description="General area or neighborhood description"
          required
        />

        <TextFieldComponent
          control={control}
          name="streetAddress"
          label="Street Address"
          placeholder="Enter street address"
          description="Specific street address or plot number"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextFieldComponent
            control={control}
            name="city"
            label="City"
            placeholder="Enter city"
          />
          
          <TextFieldComponent
            control={control}
            name="state"
            label="County/State"
            placeholder="Enter county"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextFieldComponent
            control={control}
            name="postalCode"
            label="Postal Code"
            placeholder="Enter postal code"
          />
          
          <TextFieldComponent
            control={control}
            name="country"
            label="Country"
            placeholder="Kenya"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NumberFieldComponent
            control={control}
            name="latitude"
            label="Latitude"
            placeholder="e.g., -1.2921"
            description="Decimal degrees (optional)"
          />
          
          <NumberFieldComponent
            control={control}
            name="longitude"
            label="Longitude"
            placeholder="e.g., 36.8219"
            description="Decimal degrees (optional)"
          />
        </div>
      </CardContent>
    </Card>
  );
}
