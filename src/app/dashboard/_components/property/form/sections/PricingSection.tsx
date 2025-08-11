"use client";

import { Control, useWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyFormData } from "../property-form-schema";
import { 
  NumberFieldComponent, 
  CurrencyFieldComponent,
  DateFieldComponent 
} from "../form-fields";

interface PricingSectionProps {
  control: Control<PropertyFormData>;
}

export function PricingSection({ control }: PricingSectionProps) {
  const listingType = useWatch({ control, name: "listingType" });
  const isSale = listingType === "sale";
  const isRent = listingType === "rent";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing & Fees</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Price Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isSale && (
            <CurrencyFieldComponent
              control={control}
              name="salePrice"
              label="Sale Price"
              placeholder="Enter sale price"
              required
            />
          )}
          
          {isRent && (
            <>
              <CurrencyFieldComponent
                control={control}
                name="rentalPrice"
                label="Monthly Rent"
                placeholder="Enter monthly rental price"
                required
              />
              
              <CurrencyFieldComponent
                control={control}
                name="securityDeposit"
                label="Security Deposit"
                placeholder="Enter security deposit amount"
                description="Typically 1-2 months rent"
              />
            </>
          )}
        </div>

        {/* Additional Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CurrencyFieldComponent
            control={control}
            name="hoaFee"
            label="HOA Fee"
            placeholder="Monthly HOA fee"
            description="Homeowners Association fee (if applicable)"
          />
          
          <CurrencyFieldComponent
            control={control}
            name="annualTaxes"
            label="Annual Property Taxes"
            placeholder="Annual tax amount"
            description="Yearly property tax amount"
          />
        </div>

        {/* Availability */}
        {isRent && (
          <DateFieldComponent
            control={control}
            name="availableFrom"
            label="Available From"
            placeholder="Select availability date"
            description="When will the property be available for rent?"
          />
        )}
      </CardContent>
    </Card>
  );
}
