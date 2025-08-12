"use client";

import { useState } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  PropertyFilters as PropertyFiltersType,
  PropertySortBy,
  SortOrder,
} from "@/actions/drizzle/property-types";

interface PropertyFiltersProps {
  showStatusFilter?: boolean;
}

export function PropertyFilters({ showStatusFilter = true }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Search params using nuqs - these automatically update the URL
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

  // Convert query states to filters object for counting active filters
  const filters: PropertyFiltersType = {
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

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== "" && value !== null
  );

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(
      (value) => value !== undefined && value !== "" && value !== null
    ).length;
  };

  const handleClearFilters = () => {
    setSearch(null);
    setPropertyType(null);
    setListingType(null);
    if (showStatusFilter) setStatus(null);
    setMinPrice(null);
    setMaxPrice(null);
    setBeds(null);
    setBaths(null);
    setCity(null);
    setIsFeatured(null);
    setCurrentPage(1);
  };

  const handleSortChange = (field: "sortBy" | "sortOrder", value: string) => {
    if (field === "sortBy") {
      setSortBy(value);
    } else {
      setSortOrder(value);
    }
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Reset page when filters change
  const resetPageOnChange = (setter: (value: any) => void) => (value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
              {hasActiveFilters && (
                <Badge variant="secondary">{getActiveFilterCount()} active</Badge>
              )}
            </CardTitle>
            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={handleClearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm">
                    {isOpen ? "Hide" : "Show"} Filters
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Properties</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by title, description, or location..."
                value={search}
                onChange={(e) => resetPageOnChange(setSearch)(e.target.value || null)}
                className="pl-10"
              />
            </div>
          </div>

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleContent className="space-y-4">
              {/* Sort */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => handleSortChange("sortBy", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="createdAt">Date Created</SelectItem>
                      <SelectItem value="updatedAt">Last Updated</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Select
                    value={sortOrder}
                    onValueChange={(value) => handleSortChange("sortOrder", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Descending</SelectItem>
                      <SelectItem value="asc">Ascending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Property Type & Listing Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select
                    value={propertyType || "all"}
                    onValueChange={(value) => resetPageOnChange(setPropertyType)(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="farm">Farm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Listing Type</Label>
                  <Select
                    value={listingType || "all"}
                    onValueChange={(value) => resetPageOnChange(setListingType)(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All listings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All listings</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Status (only show if enabled) */}
              {showStatusFilter && (
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={status || "all"}
                    onValueChange={(value) => resetPageOnChange(setStatus)(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                      <SelectItem value="off_market">Off Market</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Min Price (KES)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={minPrice || ""}
                    onChange={(e) =>
                      resetPageOnChange(setMinPrice)(e.target.value ? Number(e.target.value) : null)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Max Price (KES)</Label>
                  <Input
                    type="number"
                    placeholder="No limit"
                    value={maxPrice || ""}
                    onChange={(e) =>
                      resetPageOnChange(setMaxPrice)(e.target.value ? Number(e.target.value) : null)
                    }
                  />
                </div>
              </div>

              {/* Beds & Baths */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <Select
                    value={beds?.toString() || "1"}
                    onValueChange={(value) =>
                      resetPageOnChange(setBeds)(value ? Number(value) : null)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <Select
                    value={baths?.toString() || "1"}
                    onValueChange={(value) =>
                      resetPageOnChange(setBaths)(value ? Number(value) : null)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  placeholder="Enter city name"
                  value={city || ""}
                  onChange={(e) => resetPageOnChange(setCity)(e.target.value || null)}
                />
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={isFeatured === "true"}
                  onChange={(e) =>
                    resetPageOnChange(setIsFeatured)(e.target.checked ? "true" : null)
                  }
                  className="rounded"
                />
                <Label htmlFor="featured">Featured properties only</Label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Pagination */}
      {currentPage > 1 && (
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div className="text-sm text-muted-foreground">Page {currentPage}</div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage <= 1}>
                Previous
              </Button>

              <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
