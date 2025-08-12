"use client";

import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { useCallback, useEffect } from "react";
import { PropertyFilters as PropertyFiltersComponent } from "./PropertyFilters";
import { PropertyFilters, PropertySortBy, SortOrder } from "@/actions/drizzle/property-types";

interface PropertyFiltersManagerProps {

}

export function PropertyFiltersManager({  }: PropertyFiltersManagerProps) {
  // Search params using nuqs
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [propertyType, setPropertyType] = useQueryState("propertyType", parseAsString);
  const [listingType, setListingType] = useQueryState("listingType", parseAsString);
  const [status, setStatus] = useQueryState("status", parseAsString);
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

  // Convert query states to filters object
  const filters: PropertyFilters = {
    search: search || undefined,
    propertyType: propertyType || undefined,
    listingType: (listingType as "sale" | "rent") || undefined,
    status: status || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    beds: beds || undefined,
    baths: baths || undefined,
    city: city || undefined,
    isFeatured: isFeatured === "true" ? true : undefined,
  };



  const handleFiltersChange = (newFilters: PropertyFilters) => {
    // Update all query states
    setSearch(newFilters.search || null);
    setPropertyType(newFilters.propertyType || null);
    setListingType(newFilters.listingType || null);
    setStatus(newFilters.status || null);
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
    setStatus(null);
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
    />
  );
}
