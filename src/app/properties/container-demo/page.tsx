import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Calendar, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  MapPin,
  Building
} from "lucide-react";

export default function ContainerQueryDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Container Query Demo</h1>
        <p className="text-gray-600 mb-8">
          Resize your browser window to see how the sidebar components stack vertically on small screens 
          and sit side-by-side on larger screens using Tailwind CSS v4 container queries.
        </p>
        
        {/* Demo Container with Container Queries */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 @container">
          <h2 className="text-xl font-semibold mb-6">Property Sidebar - Responsive Layout</h2>
          
          {/* Container for responsive layout - stacks on small, side-by-side on larger containers */}
          <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-6">
            {/* Price and Action Buttons - Spans full width */}
            <div className="@2xl:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-primary">
                        KSh 2,500,000
                      </div>
                      <p className="text-sm text-muted-foreground">per month</p>
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
            </div>

            {/* Property Details - Takes left column on larger containers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">3 Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">2 Baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">1,200 sqft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">2 Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Built 2018</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">2 Floors</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Westlands, Nairobi</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    Nairobi, Kenya
                  </p>
                </div>

                <Separator />

                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">Apartment</Badge>
                  <Badge variant="outline">For Rent</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Agent Info - Takes right column on larger containers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Listed By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">john@realestate.com</p>
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

        {/* Explanation */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">How Container Queries Work</h3>
          <div className="text-blue-800 space-y-2">
            <p><strong>@container</strong> - Marks the parent element as a container query context</p>
            <p><strong>@2xl:grid-cols-2</strong> - When the container reaches 2xl width (672px), switch to 2-column grid</p>
            <p><strong>@2xl:col-span-2</strong> - On larger containers, the price section spans both columns</p>
            <p><strong>@md:grid-cols-2</strong> - Within the property details card, create a 2-column layout on medium container sizes</p>
            <p className="mt-4 text-sm">
              <em>Try resizing your browser window to see the layout change based on the container size, not the viewport size!</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
