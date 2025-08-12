"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Edit, Trash2, Eye, MapPin, Home, Bed, Bath } from "lucide-react";
import { deleteProperty, toggleFavorite } from "@/actions/drizzle/property-mutations";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PropertyWithAgent } from "@/actions/drizzle/property-types";

interface PropertyListProps {
  properties: PropertyWithAgent[];
  showActions?: boolean;
  showFavorite?: boolean;
  onPropertyDeleted?: () => void;
}

export function PropertyList({ 
  properties, 
  showActions = true, 
  showFavorite = true,
  onPropertyDeleted 
}: PropertyListProps) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = (propertyId: string) => {
    setDeletingId(propertyId);
    startTransition(async () => {
      const result = await deleteProperty(propertyId);
      
      if (result.success) {
        toast.success(result.message);
        onPropertyDeleted?.();
      } else {
        toast.error(result.message);
      }
      setDeletingId(null);
    });
  };

  const handleFavorite = (propertyId: string) => {
    startTransition(async () => {
      const result = await toggleFavorite(propertyId);
      
      if (result.success) {
        toast.success(result.message);
        // Force a refresh to update favorite status
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const formatPrice = (property: PropertyWithAgent) => {
    const price = property.salePrice || property.rentalPrice || property.price;
    if (!price) return "Price on request";
    
    const formatted = new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: property.currency || "KES",
      maximumFractionDigits: 0,
    }).format(price);

    return property.listingType === "rent" ? `${formatted}/month` : formatted;
  };

  if (properties.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="space-y-4">
          <Home className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">No properties found</h3>
            <p className="text-muted-foreground">
              {showActions 
                ? "Create your first property listing to get started."
                : "No properties match your current filters."
              }
            </p>
          </div>
          {showActions && (
            <Button asChild>
              <Link href="/dashboard/properties/new">Add Property</Link>
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden group">
          {/* Property Image */}
          <div className="aspect-video relative bg-muted">
            {property.imageUrl ? (
              <Image
                src={property.imageUrl}
                alt={property.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Home className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            
            {/* Status Badge */}
            <div className="absolute top-2 left-2">
              <Badge
                variant={
                  property.status === "active" ? "default" :
                  property.status === "sold" ? "destructive" :
                  property.status === "rented" ? "secondary" :
                  "outline"
                }
              >
                {property.status}
              </Badge>
            </div>

            {/* Listing Type Badge */}
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-background/80">
                {property.listingType === "sale" ? "For Sale" : "For Rent"}
              </Badge>
            </div>

            {/* Featured Badge */}
            {property.isFeatured && (
              <div className="absolute bottom-2 left-2">
                <Badge className="bg-yellow-500 text-yellow-50">
                  ⭐ Featured
                </Badge>
              </div>
            )}
          </div>

          <CardHeader className="pb-3">
            <div className="space-y-2">
              <CardTitle className="line-clamp-1">
                <Link 
                  href={`/properties/${property.slug}`}
                  className="hover:underline"
                >
                  {property.title}
                </Link>
              </CardTitle>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="line-clamp-1">{property.location}</span>
              </div>

              <div className="text-lg font-bold text-primary">
                {formatPrice(property)}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Property Details */}
              <div className="flex gap-4 text-sm text-muted-foreground">
                {property.beds && (
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.beds} bed{property.beds !== 1 ? "s" : ""}</span>
                  </div>
                )}
                {property.baths && (
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.baths} bath{property.baths !== 1 ? "s" : ""}</span>
                  </div>
                )}
              </div>

              {/* Agent Info */}
              {property.agent && (
                <div className="text-xs text-muted-foreground">
                  Listed by {property.agent.name}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/properties/${property.slug}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </Button>

                {showFavorite && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFavorite(property.id)}
                    disabled={isPending}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        property.isFavorited 
                          ? "fill-red-500 text-red-500" 
                          : ""
                      }`} 
                    />
                  </Button>
                )}

                {showActions && (
                  <>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/properties/${property.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-destructive hover:text-destructive-foreground"
                          disabled={deletingId === property.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Property</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{property.title}"? 
                            This will also delete all associated images and documents. 
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(property.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete Property
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
