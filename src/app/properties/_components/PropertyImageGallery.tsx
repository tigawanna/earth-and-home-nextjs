"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Camera, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
  videoUrl?: string | null;
  virtualTourUrl?: string | null;
  status: string;
  isFeatured: boolean;
  isNew: boolean;
}

export function PropertyImageGallery({
  images,
  title,
  videoUrl,
  virtualTourUrl,
  status,
  isFeatured,
  isNew,
}: PropertyImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const hasImages = images && images.length > 0;
  const mainImage = hasImages ? images[currentImageIndex] : null;

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative aspect-video w-full bg-muted group cursor-pointer">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="w-full h-full relative group">
              {mainImage ? (
                <>
                  <Image
                    src={mainImage}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    priority
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Camera className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full bg-muted">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No images available</p>
                  </div>
                </div>
              )}
            </div>
          </DialogTrigger>

          {/* Image overlay buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            {videoUrl && (
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 hover:bg-black/70 text-white border-0">
                <Play className="h-4 w-4 mr-2" />
                Video Tour
              </Button>
            )}
            {virtualTourUrl && (
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 hover:bg-black/70 text-white border-0">
                <Camera className="h-4 w-4 mr-2" />
                Virtual Tour
              </Button>
            )}
          </div>

          {/* Property badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant={status === "active" ? "default" : "secondary"}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            {isFeatured && <Badge variant="destructive">⭐ Featured</Badge>}
            {isNew && <Badge className="bg-green-600 hover:bg-green-700">New</Badge>}
          </div>

          {/* Image count indicator */}
          {hasImages && images.length > 1 && (
            <>
              <div className="absolute bottom-4 right-4">
                <Badge variant="secondary" className="bg-black/50 text-white border-0">
                  {images.length} Photos
                </Badge>
              </div>
              
              {/* Navigation arrows for main image */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
          
          {hasImages && images.length === 1 && (
            <div className="absolute bottom-4 right-4">
              <Badge variant="secondary" className="bg-black/50 text-white border-0">
                {images.length} Photo
              </Badge>
            </div>
          )}

          {/* Full screen gallery */}
          <DialogContent className="max-w-7xl w-full h-full max-h-screen p-0">
            <DialogTitle className="sr-only">{title} Image Gallery</DialogTitle>
            <DialogDescription className="sr-only">View all images of {title}</DialogDescription>
            <div className="relative w-full h-full bg-black">
              {hasImages && (
                <>
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Navigation buttons */}
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={prevImage}>
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={nextImage}>
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}

                  {/* Image counter */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="secondary" className="bg-black/50 text-white border-0">
                      {currentImageIndex + 1} of {images.length}
                    </Badge>
                  </div>

                  {/* Close button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Image Thumbnails */}
      {hasImages && images.length > 1 && (
        <div className="px-4 py-4 bg-background">
          <div className="flex gap-2 overflow-x-auto">
            {images.slice(0, 5).map((image, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded overflow-hidden flex-shrink-0 border-2 transition-all duration-200 hover:ring-2 hover:ring-primary/60 ${
                  currentImageIndex === index ? "ring-2 ring-primary" : "border-transparent"
                }`}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsOpen(true);
                }}>
                <Image
                  src={image}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-200 hover:scale-105"
                />
                {index === 4 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium text-xs">+{images.length - 4}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
