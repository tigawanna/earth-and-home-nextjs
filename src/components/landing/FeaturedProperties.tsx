import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import Image from "next/image";

const properties = [
	{
		id: 1,
		title: "Modern Luxury Villa",
		location: "Beverly Hills, CA",
		price: "$850,000",
		image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
		beds: 4,
		baths: 3,
		sqft: "2,500",
		type: "Featured",
		status: "For Sale",
	},
	{
		id: 2,
		title: "Downtown Penthouse",
		location: "Manhattan, NY",
		price: "$1,200,000",
		image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
		beds: 3,
		baths: 2,
		sqft: "1,800",
		type: "New",
		status: "For Sale",
	},
	{
		id: 3,
		title: "Cozy Family Home",
		location: "Austin, TX",
		price: "$475,000",
		image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
		beds: 3,
		baths: 2,
		sqft: "1,650",
		type: "Popular",
		status: "For Sale",
	},
	{
		id: 4,
		title: "Suburban Paradise",
		location: "Portland, OR",
		price: "$625,000",
		image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=800&h=600&fit=crop",
		beds: 4,
		baths: 3,
		sqft: "2,200",
		type: "Featured",
		status: "For Sale",
	},
	{
		id: 5,
		title: "Modern Condo",
		location: "Seattle, WA",
		price: "$390,000",
		image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
		beds: 2,
		baths: 2,
		sqft: "1,200",
		type: "New",
		status: "For Sale",
	},
	{
		id: 6,
		title: "Elegant Townhouse",
		location: "Chicago, IL",
		price: "$580,000",
		image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
		beds: 3,
		baths: 3,
		sqft: "1,900",
		type: "Popular",
		status: "For Sale",
	},
];

export function FeaturedProperties() {
	return (
		<section id="properties" className="py-16 bg-muted/20">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
						Featured Properties
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Discover our handpicked selection of premium properties available for
						sale
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{properties.map((property) => (
						<div
							key={property.id}
							className="bg-card text-card-foreground rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group border border-border"
						>
							{/* Image */}
							<div className="relative overflow-hidden">
								<Image
									src={property.image}
									alt={property.title}
									width={800}
									height={600}
									className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
								<div className="absolute top-4 left-4">
									<Badge className="bg-accent text-accent-foreground">
										{property.type}
									</Badge>
								</div>
								<button className="absolute top-4 right-4 bg-background/90 hover:bg-background p-2 rounded-full transition-colors border border-border">
									<Heart className="h-4 w-4 text-muted-foreground" />
								</button>
								<div className="absolute bottom-4 right-4">
									<span className="bg-background/95 backdrop-blur-xs text-foreground px-3 py-1 rounded-full font-semibold border border-border">
										{property.price}
									</span>
								</div>
							</div>

							{/* Content */}
							<div className="p-6">
								<div className="flex items-center text-muted-foreground mb-2">
									<MapPin className="h-4 w-4 mr-1" />
									<span className="text-sm">{property.location}</span>
								</div>

								<h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
									{property.title}
								</h3>

								{/* Property details */}
								<div className="grid grid-cols-3 gap-4 mb-6 text-sm text-muted-foreground">
									<div className="flex items-center">
										<Bed className="h-4 w-4 mr-1 text-primary" />
										<span>{property.beds} Beds</span>
									</div>
									<div className="flex items-center">
										<Bath className="h-4 w-4 mr-1 text-primary" />
										<span>{property.baths} Baths</span>
									</div>
									<div className="flex items-center">
										<Square className="h-4 w-4 mr-1 text-primary" />
										<span>{property.sqft} sq ft</span>
									</div>
								</div>

								<div className="flex space-x-3">
									<Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
										View Details
									</Button>
									<Button
										variant="outline"
										className="border-accent text-accent-foreground hover:bg-accent/20"
									>
										Contact
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<Button
						size="lg"
						variant="outline"
						className="border-primary text-primary hover:bg-primary/10"
					>
						View All Properties
					</Button>
				</div>
			</div>
		</section>
	);
}


