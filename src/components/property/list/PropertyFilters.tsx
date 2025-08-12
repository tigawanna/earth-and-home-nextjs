"use client";

import { useState } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
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

  return (
    <div className="space-y-6">
      {/* Main Search Card - Always Visible */}
      <div className="bg-card text-card-foreground rounded-2xl shadow-xl border border-border p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Search & Filter</h3>
              <p className="text-sm text-muted-foreground">
                Find your perfect property
              </p>
            </div>
          </div>
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {getActiveFilterCount()} active
              </Badge>
              <Button variant="outline" size="sm" onClick={handleClearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by title, description, or location..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value || null);
                setCurrentPage(1);
              }}
              className="pl-12 h-14 text-lg border-2 border-border focus:border-primary rounded-xl"
            />
          </div>
        </div>

        {/* Quick Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Property Type</Label>
            <Select
              value={propertyType || "all"}
              onValueChange={(value) => {
                setPropertyType(value === "all" ? null : value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-12 border-2 border-border focus:border-primary rounded-lg">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Listing Type</Label>
            <Select
              value={listingType || "all"}
              onValueChange={(value) => {
                setListingType(value === "all" ? null : value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-12 border-2 border-border focus:border-primary rounded-lg">
                <SelectValue placeholder="All listings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All listings</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Bedrooms</Label>
            <Select
              value={beds?.toString() || "any"}
              onValueChange={(value) => {
                setBeds(value === "any" ? null : Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-12 border-2 border-border focus:border-primary rounded-lg">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Price Range</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice || ""}
                onChange={(e) => {
                  setMinPrice(e.target.value ? Number(e.target.value) : null);
                  setCurrentPage(1);
                }}
                className="h-12 border-2 border-border focus:border-primary rounded-lg"
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice || ""}
                onChange={(e) => {
                  setMaxPrice(e.target.value ? Number(e.target.value) : null);
                  setCurrentPage(1);
                }}
                className="h-12 border-2 border-border focus:border-primary rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-center">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="px-6 py-2 rounded-full border-2 border-primary text-primary hover:bg-primary/10">
                <Filter className="h-4 w-4 mr-2" />
                {isOpen ? "Hide" : "Show"} Advanced Filters
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>

      {/* Advanced Filters Card */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <div className="bg-card text-card-foreground rounded-2xl shadow-lg border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Filter className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
                <p className="text-sm text-muted-foreground">
                  Refine your search with detailed criteria
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sort Section */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground border-b border-border pb-2">Sort & Order</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm">Sort By</Label>
                    <Select value={sortBy} onValueChange={(value) => handleSortChange("sortBy", value)}>
                      <SelectTrigger className="h-11 border-2 border-border focus:border-primary rounded-lg">
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
                    <Label className="text-sm">Sort Order</Label>
                    <Select value={sortOrder} onValueChange={(value) => handleSortChange("sortOrder", value)}>
                      <SelectTrigger className="h-11 border-2 border-border focus:border-primary rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desc">Newest First</SelectItem>
                        <SelectItem value="asc">Oldest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground border-b border-border pb-2">Property Details</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm">Bathrooms</Label>
                    <Select
                      value={baths?.toString() || "any"}
                      onValueChange={(value) => {
                        setBaths(value === "any" ? null : Number(value));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="h-11 border-2 border-border focus:border-primary rounded-lg">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">City</Label>
                    <Input
                      placeholder="Enter city name"
                      value={city || ""}
                      onChange={(e) => {
                        setCity(e.target.value || null);
                        setCurrentPage(1);
                      }}
                      className="h-11 border-2 border-border focus:border-primary rounded-lg"
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={isFeatured === "true"}
                      onChange={(e) => {
                        setIsFeatured(e.target.checked ? "true" : null);
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 text-primary bg-background border-2 border-border rounded focus:ring-primary"
                    />
                    <Label htmlFor="featured" className="text-sm font-medium">Featured properties only</Label>
                  </div>
                </div>
              </div>

              {/* Status & Extended Properties */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground border-b border-border pb-2">Additional Filters</h4>
                <div className="space-y-3">
                  {showStatusFilter && (
                    <div className="space-y-2">
                      <Label className="text-sm">Status</Label>
                      <Select
                        value={status || "all"}
                        onValueChange={(value) => {
                          setStatus(value === "all" ? null : value);
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="h-11 border-2 border-border focus:border-primary rounded-lg">
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

                  {/* Extended Property Types */}
                  <div className="space-y-2">
                    <Label className="text-sm">More Property Types</Label>
                    <Select
                      value={propertyType || "all"}
                      onValueChange={(value) => {
                        setPropertyType(value === "all" ? null : value);
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="h-11 border-2 border-border focus:border-primary rounded-lg">
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="farm">Farm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Pagination */}
      {currentPage > 1 && (
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <span className="text-sm font-medium">Page {currentPage}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 border-2 border-border hover:border-primary rounded-lg"
              >
                Previous
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 border-2 border-border hover:border-primary rounded-lg"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
