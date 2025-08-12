"use client";

import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { useCallback, useEffect } from "react";
import { PropertyFilters as PropertyFiltersComponent } from "@/app/dashboard/_components/property/list/PropertyFilters";
import { PropertyFilters, PropertySortBy, SortOrder } from "@/actions/drizzle/property-types";

interface PublicPropertyFiltersManagerProps {
  onFiltersChange: (filters: PropertyFilters, sortBy: PropertySortBy, sortOrder: SortOrder, page: number) => void;
}

export function PublicPropertyFiltersManager({ onFiltersChange }: PublicPropertyFiltersManagerProps) {
  // Search params using nuqs
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [propertyType, setPropertyType] = useQueryState("propertyType", parseAsString);
  const [listingType, setListingType] = useQueryState("listingType", parseAsString);
  const [minPrice, setMinPrice] = useQueryState("minPrice", parseAsInteger);
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", parseAsInteger);
  const [beds, setBeds] = useQueryState("beds", parseAsInteger);
  const [baths, setBaths] = useQueryState("baths", parseAsInteger);
  const [city, setCity] = useQueryState("city", parseAsString);
  const [isFeatured, setIsFeatured] = useQueryState("featured", parseAsString);
  
  // Sort parameters
  const [sortBy, setSortBy] = useQueryState("sortBy", parseAsString.withDefault("createdAt"));
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", parseAsString.withDefault("desc"));
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));

  // Convert query states to filters object (exclude status and agent filters for public view)
  const filters: PropertyFilters = {
    search: search || undefined,
    propertyType: propertyType || undefined,
    listingType: (listingType as "sale" | "rent") || undefined,
    status: "active", // Only show active properties in public view
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    beds: beds || undefined,
    baths: baths || undefined,
    city: city || undefined,
    isFeatured: isFeatured === "true" ? true : undefined,
  };

  // Notify parent when filters change
  const notifyFiltersChange = useCallback(() => {
    onFiltersChange(filters, sortBy as PropertySortBy, sortOrder as SortOrder, currentPage);
  }, [filters, sortBy, sortOrder, currentPage, onFiltersChange]);

  useEffect(() => {
    notifyFiltersChange();
  }, [notifyFiltersChange]);

  const handleFiltersChange = (newFilters: PropertyFilters) => {
    // Update all query states (excluding status and agent fields)
    setSearch(newFilters.search || null);
    setPropertyType(newFilters.propertyType || null);
    setListingType(newFilters.listingType || null);
    setMinPrice(newFilters.minPrice || null);
    setMaxPrice(newFilters.maxPrice || null);
    setBeds(newFilters.beds || null);
    setBaths(newFilters.baths || null);
    setCity(newFilters.city || null);
    setIsFeatured(newFilters.isFeatured ? "true" : null);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = (newSortBy: PropertySortBy, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handleClearFilters = () => {
    setSearch(null);
    setPropertyType(null);
    setListingType(null);
    setMinPrice(null);
    setMaxPrice(null);
    setBeds(null);
    setBaths(null);
    setCity(null);
    setIsFeatured(null);
    setCurrentPage(1);
  };

  return (
    <PropertyFiltersComponent
      filters={filters}
      sortBy={sortBy as PropertySortBy}
      sortOrder={sortOrder as SortOrder}
      onFiltersChange={handleFiltersChange}
      onSortChange={handleSortChange}
      onClearFilters={handleClearFilters}
      showOwnerFilter={false} // Hide owner filter in public view
    />
  );
}
