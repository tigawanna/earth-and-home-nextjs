import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Search } from "lucide-react"
import Link from "next/link"

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Saved Properties</h2>
          <p className="text-muted-foreground">
            Properties you've bookmarked for later
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">
            <Search className="mr-2 h-4 w-4" />
            Browse Properties
          </Link>
        </Button>
      </div>

      {/* Empty State */}
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <CardTitle className="text-xl mb-2">No saved properties yet</CardTitle>
          <CardDescription className="text-center mb-6 max-w-md">
            You haven't saved any properties yet. Browse our listings and save the ones you're interested in.
          </CardDescription>
          <Button asChild>
            <Link href="/">
              <Search className="mr-2 h-4 w-4" />
              Browse Properties
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
