"use server";

import { property, favorite, user } from "@/lib/drizzle/schema";
import { eq, and, desc, asc, sql, count, like, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PropertyFormData } from "@/app/dashboard/_components/property/form/property-form-schema";
import { db } from "@/lib/drizzle/client";

import { headers } from "next/headers";
import { deleteAllPropertyFiles } from "../r2/delete-object-action";


// Types
export type PropertyWithAgent = typeof property.$inferSelect & {
  agent?: Pick<typeof user.$inferSelect, "id" | "name" | "email" | "image"> | null;
  owner?: Pick<typeof user.$inferSelect, "id" | "name" | "email" | "image"> | null;
  isFavorited?: boolean;
};

export type PropertyFilters = {
  search?: string;
  propertyType?: string;
  listingType?: "sale" | "rent";
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  city?: string;
  agentId?: string;
  ownerId?: string;
  isFeatured?: boolean;
};

export type PropertySortBy = "createdAt" | "updatedAt" | "price" | "title";
export type SortOrder = "asc" | "desc";

// ====================================================
// CREATE PROPERTY
// ====================================================

export async function createProperty(data: PropertyFormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    // Create the property
    const [newProperty] = await db
      .insert(property)
      .values({
        ...data,
        slug: `${slug}-${Date.now()}`, // Add timestamp to ensure uniqueness
        agentId: session.user.id,
        ownerId: data.ownerId || session.user.id,
        locationGeom: data.latitude && data.longitude 
          ? sql`ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326)`
          : undefined,
      })
      .returning();

    revalidatePath("/dashboard/properties");
    revalidatePath("/properties");
    
    return { 
      success: true, 
      property: newProperty,
      message: "Property created successfully" 
    };
  } catch (error) {
    console.error("Error creating property:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to create property" 
    };
  }
}

// ====================================================
// UPDATE PROPERTY
// ====================================================

export async function updateProperty(propertyId: string, data: Partial<PropertyFormData>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Check if user owns the property or is admin
    const existingProperty = await db
      .select()
      .from(property)
      .where(eq(property.id, propertyId))
      .limit(1);

    if (!existingProperty.length) {
      throw new Error("Property not found");
    }

    const prop = existingProperty[0];
    if (prop.agentId !== session.user.id && prop.ownerId !== session.user.id) {
      // TODO: Add admin role check here
      throw new Error("You don't have permission to update this property");
    }

    // Update slug if title changed
    const updates: any = { ...data, updatedAt: new Date() };
    if (data.title && data.title !== prop.title) {
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      updates.slug = `${slug}-${Date.now()}`;
    }

    // Update location geometry if coordinates changed
    if (data.latitude && data.longitude) {
      updates.locationGeom = sql`ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326)`;
    }

    const [updatedProperty] = await db
      .update(property)
      .set(updates)
      .where(eq(property.id, propertyId))
      .returning();

    revalidatePath("/dashboard/properties");
    revalidatePath("/properties");
    revalidatePath(`/properties/${prop.slug}`);
    
    return { 
      success: true, 
      property: updatedProperty,
      message: "Property updated successfully" 
    };
  } catch (error) {
    console.error("Error updating property:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to update property" 
    };
  }
}

// ====================================================
// DELETE PROPERTY
// ====================================================

export async function deleteProperty(propertyId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Check if user owns the property or is admin
    const existingProperty = await db
      .select()
      .from(property)
      .where(eq(property.id, propertyId))
      .limit(1);

    if (!existingProperty.length) {
      throw new Error("Property not found");
    }

    const prop = existingProperty[0];
    if (prop.agentId !== session.user.id && prop.ownerId !== session.user.id) {
      // TODO: Add admin role check here
      throw new Error("You don't have permission to delete this property");
    }

    // Delete associated files from R2 (if title exists)
    if (prop.title) {
      const propertyTitle = prop.title.replace(/\s+/g, '-').toLowerCase();
      await deleteAllPropertyFiles(propertyTitle);
    }

    // Delete the property (cascades to favorites)
    await db.delete(property).where(eq(property.id, propertyId));

    revalidatePath("/dashboard/properties");
    revalidatePath("/properties");
    
    return { 
      success: true, 
      message: "Property and associated files deleted successfully" 
    };
  } catch (error) {
    console.error("Error deleting property:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to delete property" 
    };
  }
}

// ====================================================
// GET PROPERTIES (with filtering, sorting, pagination)
// ====================================================

export async function getProperties({
  filters = {},
  sortBy = "createdAt",
  sortOrder = "desc",
  page = 1,
  limit = 20,
  userId,
}: {
  filters?: PropertyFilters;
  sortBy?: PropertySortBy;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
  userId?: string; // For checking favorites
} = {}) {
  try {
    const offset = (page - 1) * limit;
    
    // Build WHERE conditions
    const conditions = [];
    
    if (filters.search) {
      conditions.push(
        sql`(${property.title} ILIKE ${`%${filters.search}%`} OR ${property.description} ILIKE ${`%${filters.search}%`} OR ${property.location} ILIKE ${`%${filters.search}%`})`
      );
    }
    
    if (filters.propertyType) {
      conditions.push(eq(property.propertyType, filters.propertyType as any));
    }
    
    if (filters.listingType) {
      conditions.push(eq(property.listingType, filters.listingType));
    }
    
    if (filters.status) {
      conditions.push(eq(property.status, filters.status as any));
    }
    
    if (filters.minPrice) {
      conditions.push(sql`COALESCE(${property.salePrice}, ${property.rentalPrice}, ${property.price}) >= ${filters.minPrice}`);
    }
    
    if (filters.maxPrice) {
      conditions.push(sql`COALESCE(${property.salePrice}, ${property.rentalPrice}, ${property.price}) <= ${filters.maxPrice}`);
    }
    
    if (filters.beds) {
      conditions.push(eq(property.beds, filters.beds));
    }
    
    if (filters.baths) {
      conditions.push(eq(property.baths, filters.baths));
    }
    
    if (filters.city) {
      conditions.push(ilike(property.city, `%${filters.city}%`));
    }
    
    if (filters.agentId) {
      conditions.push(eq(property.agentId, filters.agentId));
    }
    
    if (filters.ownerId) {
      conditions.push(eq(property.ownerId, filters.ownerId));
    }
    
    if (filters.isFeatured !== undefined) {
      conditions.push(eq(property.isFeatured, filters.isFeatured));
    }

    const whereClause = conditions.length > 0 ? sql.join(conditions, sql` AND `) : undefined;
    
    // Build ORDER BY
    const orderBy = sortOrder === "desc" 
      ? desc(property[sortBy]) 
      : asc(property[sortBy]);

    // Get properties with agent/owner info and favorite status
    const baseQuery = db
      .select({
        property: property,
        agent: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
        isFavorited: userId ? sql<boolean>`EXISTS(
          SELECT 1 FROM ${favorite} 
          WHERE ${favorite.propertyId} = ${property.id} 
          AND ${favorite.userId} = ${userId}
        )` : sql<boolean>`false`,
      })
      .from(property)
      .leftJoin(user, eq(property.agentId, user.id));

    // Execute query with conditions
    const properties = whereClause 
      ? await baseQuery.where(whereClause).orderBy(orderBy).limit(limit).offset(offset)
      : await baseQuery.orderBy(orderBy).limit(limit).offset(offset);

    // Get total count for pagination
    const totalCountQuery = whereClause
      ? await db.select({ count: count() }).from(property).where(whereClause)
      : await db.select({ count: count() }).from(property);
    
    const totalCount = totalCountQuery[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      properties: properties.map(p => ({
        ...p.property,
        agent: p.agent,
        isFavorited: p.isFavorited,
      })) as PropertyWithAgent[],
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to fetch properties",
      properties: [],
      pagination: { page: 1, limit, totalCount: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false },
    };
  }
}

// ====================================================
// GET SINGLE PROPERTY
// ====================================================

export async function getProperty(identifier: string, userId?: string) {
  try {
    // Determine if identifier is ID or slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    const condition = isUUID ? eq(property.id, identifier) : eq(property.slug, identifier);

    const result = await db
      .select({
        property: property,
        agent: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
        isFavorited: userId ? sql<boolean>`EXISTS(
          SELECT 1 FROM ${favorite} 
          WHERE ${favorite.propertyId} = ${property.id} 
          AND ${favorite.userId} = ${userId}
        )` : sql<boolean>`false`,
      })
      .from(property)
      .leftJoin(user, eq(property.agentId, user.id))
      .where(condition)
      .limit(1);

    if (!result.length) {
      return { success: false, message: "Property not found" };
    }

    const propertyData = result[0];

    return {
      success: true,
      property: {
        ...propertyData.property,
        agent: propertyData.agent,
        isFavorited: propertyData.isFavorited,
      } as PropertyWithAgent,
    };
  } catch (error) {
    console.error("Error fetching property:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to fetch property" 
    };
  }
}

// ====================================================
// FAVORITE ACTIONS
// ====================================================

export async function toggleFavorite(propertyId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      throw new Error("You must be logged in to favorite properties");
    }

    const userId = session.user.id;

    // Check if already favorited
    const existing = await db
      .select()
      .from(favorite)
      .where(and(eq(favorite.userId, userId), eq(favorite.propertyId, propertyId)))
      .limit(1);

    if (existing.length > 0) {
      // Remove favorite
      await db
        .delete(favorite)
        .where(and(eq(favorite.userId, userId), eq(favorite.propertyId, propertyId)));
      
      revalidatePath("/dashboard/favorites");
      return { success: true, isFavorited: false, message: "Removed from favorites" };
    } else {
      // Add favorite
      await db.insert(favorite).values({
        userId,
        propertyId,
      });
      
      revalidatePath("/dashboard/favorites");
      return { success: true, isFavorited: true, message: "Added to favorites" };
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to update favorite" 
    };
  }
}

export async function getFavoriteProperties(userId?: string, page = 1, limit = 20) {
  try {
    if (!userId) {
      const session = await auth.api.getSession({
        headers: await headers()
      });
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }
      userId = session.user.id;
    }

    const offset = (page - 1) * limit;

    const favorites = await db
      .select({
        property: property,
        agent: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
        favoritedAt: favorite.createdAt,
      })
      .from(favorite)
      .innerJoin(property, eq(favorite.propertyId, property.id))
      .leftJoin(user, eq(property.agentId, user.id))
      .where(eq(favorite.userId, userId))
      .orderBy(desc(favorite.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const totalCountQuery = await db
      .select({ count: count() })
      .from(favorite)
      .where(eq(favorite.userId, userId));
    
    const totalCount = totalCountQuery[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      properties: favorites.map(f => ({
        ...f.property,
        agent: f.agent,
        isFavorited: true,
        favoritedAt: f.favoritedAt,
      })) as (PropertyWithAgent & { favoritedAt: Date })[],
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching favorite properties:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to fetch favorites",
      properties: [],
      pagination: { page: 1, limit, totalCount: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false },
    };
  }
}

// ====================================================
// UTILITY ACTIONS
// ====================================================

export async function getPropertyStats(agentId?: string) {
  try {
    const conditions = agentId ? [eq(property.agentId, agentId)] : [];

    const stats = await db
      .select({
        totalProperties: count(),
        activeProperties: count(sql`CASE WHEN ${property.status} = 'active' THEN 1 END`),
        soldProperties: count(sql`CASE WHEN ${property.status} = 'sold' THEN 1 END`),
        rentedProperties: count(sql`CASE WHEN ${property.status} = 'rented' THEN 1 END`),
        draftProperties: count(sql`CASE WHEN ${property.status} = 'draft' THEN 1 END`),
        featuredProperties: count(sql`CASE WHEN ${property.isFeatured} = true THEN 1 END`),
      })
      .from(property)
      .where(conditions.length > 0 ? sql.join(conditions, sql` AND `) : undefined);

    return {
      success: true,
      stats: stats[0] || {
        totalProperties: 0,
        activeProperties: 0,
        soldProperties: 0,
        rentedProperties: 0,
        draftProperties: 0,
        featuredProperties: 0,
      },
    };
  } catch (error) {
    console.error("Error fetching property stats:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to fetch stats" 
    };
  }
}
