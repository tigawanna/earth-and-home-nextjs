import { getProperty } from "@/dal/drizzle/property-queries";
import { SinglePropertyNotFound } from "./query-states";
import { PropertyImageGallery } from "./PropertyImageGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Calendar, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Thermometer,
  Snowflake,
  TreePine,
  Wifi,
  Building,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface SinglePropertyProps {
  id: string; // Property ID to fetch details
}

export async function SingleProperty({ id }: SinglePropertyProps) {
  const result = await getProperty(id);
  
  if (!result.success || !result.property) {
    return <SinglePropertyNotFound />;
  }

  const property = result.property;

  // Format price with currency
  const formatPrice = (price: number | null, currency = "KES") => {
    if (!price) return "Price on request";
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get the main price based on listing type
  const mainPrice = property.listingType === "sale" 
    ? property.salePrice || property.price 
    : property.rentalPrice || property.price;

  const rawImages = Array.isArray(property.images) ? property.images : [];
  // Combine primary image with gallery images
  const images = property.imageUrl 
    ? [property.imageUrl, ...rawImages.filter(img => img !== property.imageUrl)]
    : rawImages;
  const amenities = Array.isArray(property.amenities) ? property.amenities : [];
  const features = Array.isArray(property.features) ? property.features : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/properties">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Gallery */}
        <div className="lg:col-span-2">
          <PropertyImageGallery
            images={images as string[]}
            title={property.title}
            videoUrl={property.videoUrl}
            virtualTourUrl={property.virtualTourUrl}
            status={property.status}
            isFeatured={property.isFeatured}
            isNew={property.isNew}
          />
        </div>

        {/* Property Details Sidebar */}
        <div className="space-y-6">
          {/* Price and Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(mainPrice, property.currency || "KES")}
                  </div>
                  {property.listingType === "rent" && (
                    <p className="text-sm text-muted-foreground">per month</p>
                  )}
                  {property.securityDeposit && property.listingType === "rent" && (
                    <p className="text-sm text-muted-foreground">
                      Security deposit: {formatPrice(property.securityDeposit, property.currency || "KES")}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {property.beds && (
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.beds} Beds</span>
                  </div>
                )}
                {property.baths && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.baths} Baths</span>
                  </div>
                )}
                {property.buildingSizeSqft && (
                  <div className="flex items-center gap-2">
                    <Square className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.buildingSizeSqft.toLocaleString()} sqft</span>
                  </div>
                )}
                {property.parkingSpaces && (
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.parkingSpaces} Parking</span>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Built {property.yearBuilt}</span>
                  </div>
                )}
                {property.floors && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.floors} Floors</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.location}</span>
                </div>
                {property.city && (
                  <p className="text-sm text-muted-foreground ml-6">
                    {property.city}, {property.state}
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex gap-2">
                <Badge variant="outline">
                  {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                </Badge>
                <Badge variant="outline">
                  For {property.listingType.charAt(0).toUpperCase() + property.listingType.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Agent Info */}
          {property.agent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Listed By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={property.agent.image || undefined} />
                    <AvatarFallback>
                      {property.agent.name?.charAt(0).toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{property.agent.name}</p>
                    <p className="text-sm text-muted-foreground">{property.agent.email}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{property.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {property.description ? (
                    <p className="whitespace-pre-wrap">{property.description}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      No description provided for this property.
                    </p>
                  )}
                </div>

                {/* Additional Details */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {property.lotSizeSqft && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Lot Size</p>
                      <p className="text-sm text-muted-foreground">
                        {property.lotSizeSqft.toLocaleString()} sqft
                      </p>
                    </div>
                  )}
                  
                  {property.heating && property.heating !== "none" && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Thermometer className="h-4 w-4" />
                        Heating
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {property.heating.replace("_", " ")}
                      </p>
                    </div>
                  )}

                  {property.cooling && property.cooling !== "none" && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Snowflake className="h-4 w-4" />
                        Cooling
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {property.cooling.replace("_", " ")}
                      </p>
                    </div>
                  )}

                  {property.parkingType && property.parkingType !== "none" && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        Parking Type
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {property.parkingType.replace("_", " ")}
                      </p>
                    </div>
                  )}

                  {property.zoning && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Zoning</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {property.zoning.replace("_", " ")}
                      </p>
                    </div>
                  )}

                  {property.hoaFee && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">HOA Fee</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(property.hoaFee, property.currency || "KES")}/month
                      </p>
                    </div>
                  )}

                  {property.annualTaxes && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Annual Taxes</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(property.annualTaxes, property.currency || "KES")}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Features</CardTitle>
              </CardHeader>
              <CardContent>
                {features.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <TreePine className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature as string}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">No specific features listed.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="amenities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                {amenities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <Wifi className="h-4 w-4 text-primary" />
                        <span className="text-sm">{amenity as string}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">No amenities listed.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          {property.streetAddress || property.location}
                        </p>
                      </div>
                      {property.city && (
                        <div>
                          <p className="text-sm font-medium">City</p>
                          <p className="text-sm text-muted-foreground">{property.city}</p>
                        </div>
                      )}
                      {property.state && (
                        <div>
                          <p className="text-sm font-medium">State/Province</p>
                          <p className="text-sm text-muted-foreground">{property.state}</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      {property.postalCode && (
                        <div>
                          <p className="text-sm font-medium">Postal Code</p>
                          <p className="text-sm text-muted-foreground">{property.postalCode}</p>
                        </div>
                      )}
                      {property.country && (
                        <div>
                          <p className="text-sm font-medium">Country</p>
                          <p className="text-sm text-muted-foreground">{property.country}</p>
                        </div>
                      )}
                      {property.latitude && property.longitude && (
                        <div>
                          <p className="text-sm font-medium">Coordinates</p>
                          <p className="text-sm text-muted-foreground font-mono">
                            {property.latitude.toFixed(6)}, {property.longitude.toFixed(6)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Map placeholder */}
                  <div className="mt-6 h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
