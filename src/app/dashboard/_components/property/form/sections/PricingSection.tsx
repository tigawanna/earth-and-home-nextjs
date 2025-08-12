"use client";

import { Control, useWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyFormData } from "../property-form-schema";
import { 
  NumberFieldComponent, 
  CurrencyFieldComponent,
  DateFieldComponent,
  SelectFieldComponent
} from "../form-fields";

// Common currencies with their symbols and names
const CURRENCIES = [
  { value: "KES", label: "KES - Kenyan Shilling (KSh)" },
  { value: "USD", label: "USD - US Dollar ($)" },
  { value: "EUR", label: "EUR - Euro (€)" },
  { value: "GBP", label: "GBP - British Pound (£)" },
  { value: "CAD", label: "CAD - Canadian Dollar (C$)" },
  { value: "AUD", label: "AUD - Australian Dollar (A$)" },
  { value: "JPY", label: "JPY - Japanese Yen (¥)" },
  { value: "CHF", label: "CHF - Swiss Franc (CHF)" },
  { value: "CNY", label: "CNY - Chinese Yuan (¥)" },
  { value: "INR", label: "INR - Indian Rupee (₹)" },
  { value: "ZAR", label: "ZAR - South African Rand (R)" },
  { value: "NGN", label: "NGN - Nigerian Naira (₦)" },
  { value: "GHS", label: "GHS - Ghanaian Cedi (₵)" },
  { value: "TZS", label: "TZS - Tanzanian Shilling (TSh)" },
  { value: "UGX", label: "UGX - Ugandan Shilling (USh)" },
];



interface PricingSectionProps {
  control: Control<PropertyFormData>;
}

export function PricingSection({ control }: PricingSectionProps) {
  const listingType = useWatch({ control, name: "listingType" });
  const selectedCurrency = useWatch({ control, name: "currency" });
  const isSale = listingType === "sale";
  const isRent = listingType === "rent";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing & Fees</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Currency Selection and Primary Price Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectFieldComponent
            control={control}
            name="currency"
            label="Currency"
            placeholder="Select currency"
            description="Choose the currency for all pricing"
            options={CURRENCIES}
            required
          />
          
          {isSale && (
            <CurrencyFieldComponent
              control={control}
              name="salePrice"
              label="Sale Price"
              placeholder="Enter sale price"
              currency={selectedCurrency || "KES"}
              required
            />
          )}
          
          {isRent && (
            <CurrencyFieldComponent
              control={control}
              name="rentalPrice"
              label="Monthly Rent"
              placeholder="Enter monthly rental price"
              currency={selectedCurrency || "KES"}
              required
            />
          )}
        </div>

        {/* Secondary Price Fields for Rent */}
        {isRent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencyFieldComponent
              control={control}
              name="securityDeposit"
              label="Security Deposit"
              placeholder="Enter security deposit amount"
              description="Typically 1-2 months rent"
              currency={selectedCurrency || "KES"}
            />
          </div>
        )}

        {/* Additional Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CurrencyFieldComponent
            control={control}
            name="hoaFee"
            label="HOA Fee"
            placeholder="Monthly HOA fee"
            description="Homeowners Association fee (if applicable)"
            currency={selectedCurrency || "KES"}
          />
          
          <CurrencyFieldComponent
            control={control}
            name="annualTaxes"
            label="Annual Property Taxes"
            placeholder="Annual tax amount"
            description="Yearly property tax amount"
            currency={selectedCurrency || "KES"}
          />
        </div>

        {/* Availability */}
        {isRent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateFieldComponent
              control={control}
              name="availableFrom"
              label="Available From"
              placeholder="Select availability date"
              description="When will the property be available for rent?"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
