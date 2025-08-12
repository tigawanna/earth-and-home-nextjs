"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {  type PropertyFilters, PropertySortBy, SortOrder } from "@/actions/drizzle/property-types";

interface PropertyFiltersProps {
  filters: PropertyFilters;
  sortBy: PropertySortBy;
  sortOrder: SortOrder;
  onFiltersChange: (filters: PropertyFilters) => void;
  onSortChange: (sortBy: PropertySortBy, sortOrder: SortOrder) => void;
  onClearFilters: () => void;
  showOwnerFilter?: boolean;
}

export function PropertyFilters({
  filters,
  sortBy,
  sortOrder,
  onFiltersChange,
  onSortChange,
  onClearFilters,
  showOwnerFilter = false,
}: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof PropertyFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== "" && value !== null
  );

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => 
      value !== undefined && value !== "" && value !== null
    ).length;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
            {hasActiveFilters && (
              <Badge variant="secondary">
                {getActiveFilterCount()} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
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
              value={filters.search || ""}
              onChange={(e) => updateFilter("search", e.target.value)}
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
                  onValueChange={(value) => onSortChange(value as PropertySortBy, sortOrder)}
                >
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
                  onValueChange={(value) => onSortChange(sortBy, value as SortOrder)}
                >
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
                  value={filters.propertyType || ""}
                  onValueChange={(value) => updateFilter("propertyType", value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All types</SelectItem>
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
                  value={filters.listingType || ""}
                  onValueChange={(value) => updateFilter("listingType", value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All listings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All listings</SelectItem>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={filters.status || ""}
                onValueChange={(value) => updateFilter("status", value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="off_market">Off Market</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Price (KES)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice || ""}
                  onChange={(e) => updateFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>

              <div className="space-y-2">
                <Label>Max Price (KES)</Label>
                <Input
                  type="number"
                  placeholder="No limit"
                  value={filters.maxPrice || ""}
                  onChange={(e) => updateFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>

            {/* Beds & Baths */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Select
                  value={filters.beds?.toString() || ""}
                  onValueChange={(value) => updateFilter("beds", value ? Number(value) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
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
                  value={filters.baths?.toString() || ""}
                  onValueChange={(value) => updateFilter("baths", value ? Number(value) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
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
                value={filters.city || ""}
                onChange={(e) => updateFilter("city", e.target.value)}
              />
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={filters.isFeatured === true}
                onChange={(e) => updateFilter("isFeatured", e.target.checked ? true : undefined)}
                className="rounded"
              />
              <Label htmlFor="featured">Featured properties only</Label>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
