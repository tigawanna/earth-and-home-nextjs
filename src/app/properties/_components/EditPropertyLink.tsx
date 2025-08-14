"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/client-side-auth";
import { ChevronRight, Pen } from "lucide-react";
import Link from "next/link";

interface EditPropertyLinkProps {
  id: string;
}

export function EditPropertyLink({ id }: EditPropertyLinkProps) {
  const { data, isPending } = authClient.useSession();
  if (isPending) {
    return (
      <Button disabled className="text-blue-500">
        <Link href={`/properties/${id}/edit`} className="text-blue-500">
          <Pen className="mr-2 h-4 w-4" />
        </Link>
      </Button>
    );
  }
  if (data?.user?.role !== "admin") {
    return (
      <Button disabled className="text-blue-500">
        <Link href={`/properties/${id}`} className="text-blue-500">
          <ChevronRight className="mr-2 h-4 w-4" />
        </Link>
      </Button>
    );
  }

  return (
    <Button disabled className="text-blue-500">
      <Link href={`/properties/${id}/edit`} className="text-blue-500">
        <Pen className="mr-2 h-4 w-4" />
      </Link>
    </Button>
  );
}
