
import Link from "next/link";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { SiteIcon } from "@/components/icons/SiteIcon";
import LinkLoadingIndicator from "@/lib/next/LinkLoadingIndicator";

interface AuthLayoutHeaderProps {}

export function AuthLayoutHeader({}: AuthLayoutHeaderProps) {
  return (
    <header className="w-full flex  items-center justify-between py-6 border-b border-border bg-background px-4">
      <Link href="/" aria-label="Earth & Home Home" className="flex items-center space-x-3">
        <SiteIcon />
        <div>
          <span className="text-2xl font-playfair font-bold text-primary hover:underline">
            Earth & Home
          </span>
          <p className="text-sm text-muted-foreground">Real Estate Excellence</p>
        </div>
        <LinkLoadingIndicator />
      </Link>
      <div className="mt-4 flex items-center gap-4">
        <ModeToggle />
      </div>
    </header>
  );
}
