import { db } from "@/lib/drizzle/client";
import { SUB_COUNTY_MAPPINGS } from "./sub_county";
import { WARDS_GEOJSON } from "./wards_geojson";
import { kenyaWards } from "@/lib/drizzle/schema";

const getSubCounty = (ward: string): string | null => {
  const subCounty = SUB_COUNTY_MAPPINGS.find((item) => {
    const subCounties = Object.values(item.sub_counties).flat();
    const found = subCounties.some((subCountyWard) =>
      subCountyWard.toLowerCase().includes(ward.toLowerCase())
    );

    return found;
  });

  if (subCounty) {
    return subCounty.county_name;
  }
  return null;
};

const wards = WARDS_GEOJSON.features.map((feature) => {
  return {
    id: feature.properties.id,
    ward: feature.properties.ward,
    wardCode: feature.properties.wardcode,
    county: feature.properties.county,
    countyCode: feature.properties.countycode,
    subCounty: SUB_COUNTY_MAPPINGS,
    constituency: feature.properties.const,
    constituencyCode: feature.properties.constcode,
    coodinates: feature.geometry.coordinates,
  };
});

async function insertWards() {
  const wardsWithSubCounties = wards.map((ward) => {
    const subCounty = getSubCounty(ward.ward);
    const { coodinates, ...excWard } = ward;

    // Create the GeoJSON structure for MultiPolygon
    const geometry = {
      type: "MultiPolygon",
      coordinates: coodinates, // Maintain the [][][][] structure
    };

    return {
      ...excWard,
      id: parseInt(ward.id, 10),
      countyCode: ward.countyCode ? ward.countyCode : -1,
      constituencyCode: ward.constituencyCode ? ward.constituencyCode : -1,
      subCounty: subCounty || "Unknown",
      // Store the geometry as GeoJSON text - will convert to PostGIS geometry in insert
      geometry: JSON.stringify(geometry),
    };
  });

  await db.insert(kenyaWards).values(wardsWithSubCounties);
}

// Add advanced column types and enums
// import { pgEnum, jsonb, numeric, doublePrecision } from "drizzle-orm/pg-core";
// // PostGIS geometry + index
// import { index } from "drizzle-orm/pg-core";
// // Custom PostGIS types (workaround for Drizzle geometry bug)
// import { multiPolygon, point } from "./postgis-types";

// export const kenyaWards = pgTable(
//   'kenya_wards',
//   {
//     id: serial('id').primaryKey(),
//     wardCode: varchar('ward_code', { length: 10 }).notNull(),
//     ward: text('ward').notNull(),
//     county: text('county').notNull(),
//     countyCode: integer('county_code').notNull(),
//     subCounty: text('sub_county'),
//     constituency: text('constituency').notNull(),
//     constituencyCode: integer('constituency_code').notNull(),
//     geometry: multiPolygon('geometry').notNull(),
//   },
//   (t) => [
//     index('kenya_wards_geometry_gix').using('gist', t.geometry),
//   ]
// );

/**
 * Custom PostGIS Geometry Types for Drizzle ORM
 *
 * Workaround for Drizzle's geometry type generation bug:
 * https://github.com/drizzle-team/drizzle-orm/issues/3040
 *
 * The built-in geometry() function incorrectly generates "geometry(point)"
 * regardless of the specified type and ignores SRID configuration.
 */

// import { customType } from "drizzle-orm/pg-core";

// // MultiPolygon type for complex boundaries (e.g., Kenya wards with islands)
// export const multiPolygon = customType<{
//   data: string; // GeoJSON string or raw coordinates
// }>({
//   dataType() {
//     return "geometry(MultiPolygon, 4326)";
//   },
// });

// // Polygon type for simple boundaries
// export const polygon = customType<{
//   data: string; // GeoJSON string or raw coordinates
// }>({
//   dataType() {
//     return "geometry(Polygon, 4326)";
//   },
// });

// // Point type with correct SRID
// export const point = customType<{
//   data: { x: number; y: number } | string; // Point object or GeoJSON string
// }>({
//   dataType() {
//     return "geometry(Point, 4326)";
//   },
// });

// // Helper types for GeoJSON structures
// export type GeoJSONPolygon = {
//   type: "Polygon";
//   coordinates: number[][][];
// };

// export type GeoJSONMultiPolygon = {
//   type: "MultiPolygon";
//   coordinates: number[][][][];
// };

// export type GeoJSONPoint = {
//   type: "Point";
//   coordinates: [number, number];
// };

// // Helper functions to create GeoJSON objects
// export function createPolygon(coordinates: number[][][]): GeoJSONPolygon {
//   return {
//     type: "Polygon",
//     coordinates,
//   };
// }

// export function createMultiPolygon(
//   coordinates: number[][][][],
// ): GeoJSONMultiPolygon {
//   return {
//     type: "MultiPolygon",
//     coordinates,
//   };
// }

// export function createPoint(coordinates: [number, number]): GeoJSONPoint {
//   return {
//     type: "Point",
//     coordinates,
//   };
// }
