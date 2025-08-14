import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import {
  Phone,
  Heart,
  Share2,
  Bed,
  Bath,
  Square,
  Car,
  Calendar,
  Building,
  MapPin,
  Mail,
  Snowflake,
  TreePine,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyImageGallery } from "../_components/PropertyImageGallery";

// Sample property data for testing the beautiful UI
const sampleProperty = {
  id: "sample-123",
  title: "Luxurious 4-Bedroom Villa in Karen",
  description: `Experience luxury living in this stunning 4-bedroom villa located in the prestigious Karen neighborhood. This beautiful home features modern architecture, spacious rooms, and premium finishes throughout.

The property sits on a generous 0.5-acre plot with mature gardens, a swimming pool, and ample parking. Perfect for families seeking comfort and elegance in one of Nairobi's most sought-after areas.

Key highlights include:
- Open-plan living areas with high ceilings
- Gourmet kitchen with modern appliances
- Master suite with walk-in closet and en-suite
- Private home office/study
- Staff quarters with separate entrance
- 24/7 security and gate access`,

  slug: "luxurious-4-bedroom-villa-karen",
  listingType: "sale" as const,
  propertyType: "villa" as const,
  status: "active" as const,

  // Location
  location: "Karen, Nairobi",
  streetAddress: "Karen Road, Off Bogani Road",
  city: "Nairobi",
  state: "Nairobi County",
  postalCode: "00200",
  country: "Kenya",
  latitude: -1.3209,
  longitude: 36.7075,

  // Size & structure
  buildingSizeSqft: 4500,
  lotSizeSqft: 21780, // 0.5 acres
  lotSizeAcres: 0.5,
  yearBuilt: 2018,
  floors: 2,
  beds: 4,
  baths: 5,
  parkingSpaces: 3,
  parkingType: "garage" as const,
  heating: "none" as const,
  cooling: "central" as const,
  zoning: "residential" as const,

  // Pricing
  currency: "KES",
  price: 85000000, // 85M KES
  salePrice: 85000000,
  rentalPrice: null,
  securityDeposit: null,
  hoaFee: 15000, // Monthly maintenance
  annualTaxes: 180000,

  // Media
  imageUrl: "/real-images/house/house-1.jpg",
  images: [
    "/real-images/house/house-1.jpg",
    "/real-images/house/house-2.jpg",
    "/real-images/house-7.jpg",
    "/real-images/house-8.jpg",
    "/real-images/apartment/apartment-1.jpg",
    "/real-images/apartment/apartment-2.jpg",
  ],
  videoUrl: "https://www.youtube.com/watch?v=sample",
  virtualTourUrl: "https://my.matterport.com/show/?m=sample",

  amenities: [
    "Swimming Pool",
    "Garden",
    "Security System",
    "Backup Generator",
    "Borehole Water",
    "CCTV Surveillance",
    "Perimeter Wall",
    "Automatic Gate",
    "Garage",
    "Staff Quarters",
    "Fireplace",
    "Built-in Wardrobes",
    "Modern Kitchen",
    "Balcony",
    "Study Room",
  ],

  features: [
    "Prime Location",
    "Modern Design",
    "Spacious Rooms",
    "High-Quality Finishes",
    "Mature Garden",
    "Quiet Neighborhood",
    "Good Drainage",
    "Tiled Roof",
    "Ceramic Floors",
    "Aluminum Windows",
    "Security Lighting",
    "Landscaped Compound",
  ],

  utilities: {
    electricity: "Kenya Power",
    water: "Borehole + County Supply",
    internet: "Fiber Ready",
    sewerage: "Modern System",
  },

  // Relations
  agentId: "agent-123",
  ownerId: "owner-123",

  // Flags
  isFeatured: true,
  isNew: false,

  // Timestamps
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-20"),

  // Agent info (would come from join)
  agent: {
    id: "agent-123",
    name: "Sarah Mwangi",
    email: "sarah@premiumproperties.co.ke",
    image: "/user-fallback.png",
  },

  isFavorited: false,
};

export default function PropertyShowcasePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Property Component Showcase</h1>
              <p className="text-muted-foreground">
                Demonstrating our enhanced property detail page
              </p>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              Demo Mode
            </Badge>
          </div>
        </div>
      </div>

      {/* Component Showcase */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Sample Property Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Component Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">🖼️ Image Gallery</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Interactive photo gallery</li>
                  <li>• Full-screen lightbox</li>
                  <li>• Thumbnail navigation</li>
                  <li>• Video tour integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">📊 Property Details</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Comprehensive information</li>
                  <li>• Pricing with currency</li>
                  <li>• Property specifications</li>
                  <li>• Location details</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">👤 Agent Contact</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Agent profile card</li>
                  <li>• Contact buttons</li>
                  <li>• Favorite property</li>
                  <li>• Share functionality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Gallery Showcase */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Image Gallery Component</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyImageGallery
              images={sampleProperty.images}
              title={sampleProperty.title}
              videoUrl={sampleProperty.videoUrl}
              virtualTourUrl={sampleProperty.virtualTourUrl}
              status={sampleProperty.status}
              isFeatured={sampleProperty.isFeatured}
              isNew={sampleProperty.isNew}
            />
          </CardContent>
        </Card>

        {/* Full Property Component */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Full Property Detail Component</h2>
            <p className="text-muted-foreground">
              Below is the complete property detail page with sample data
            </p>
          </div>

          {/* Render the actual component with sample data */}
          <div className="border rounded-lg p-1">
            <SinglePropertyDemo property={sampleProperty} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component to render property details with sample data
function SinglePropertyDemo({ property }: { property: any }) {
  const formatPrice = (price: number | null, currency = "KES") => {
    if (!price) return "Price on request";
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const mainPrice =
    property.listingType === "sale"
      ? property.salePrice || property.price
      : property.rentalPrice || property.price;

  const rawImages = Array.isArray(property.images) ? property.images : [];
  const images = property.imageUrl
    ? [property.imageUrl, ...rawImages.filter((img: string) => img !== property.imageUrl)]
    : rawImages;
  const amenities = Array.isArray(property.amenities) ? property.amenities : [];
  const features = Array.isArray(property.features) ? property.features : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
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
                  {property.hoaFee && (
                    <p className="text-sm text-muted-foreground">
                      Maintenance: {formatPrice(property.hoaFee, property.currency || "KES")}/month
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
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.beds} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.baths} Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.buildingSizeSqft.toLocaleString()} sqft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.parkingSpaces} Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Built {property.yearBuilt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.floors} Floors</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {property.city}, {property.state}
                </p>
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
                  <p className="whitespace-pre-wrap">{property.description}</p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Lot Size</p>
                    <p className="text-sm text-muted-foreground">
                      {property.lotSizeSqft.toLocaleString()} sqft ({property.lotSizeAcres} acres)
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Snowflake className="h-4 w-4" />
                      Cooling
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {property.cooling.replace("_", " ")}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Parking Type
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {property.parkingType.replace("_", " ")}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Zoning</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {property.zoning.replace("_", " ")}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Annual Taxes</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(property.annualTaxes, property.currency || "KES")}
                    </p>
                  </div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <TreePine className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="amenities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Wifi className="h-4 w-4 text-primary" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
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
                      <div>
                        <p className="text-sm font-medium">City</p>
                        <p className="text-sm text-muted-foreground">{property.city}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">State/Province</p>
                        <p className="text-sm text-muted-foreground">{property.state}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Postal Code</p>
                        <p className="text-sm text-muted-foreground">{property.postalCode}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Country</p>
                        <p className="text-sm text-muted-foreground">{property.country}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Coordinates</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {property.latitude.toFixed(6)}, {property.longitude.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>

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
