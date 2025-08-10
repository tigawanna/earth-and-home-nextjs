ALTER TABLE "kenya_wards" DROP CONSTRAINT "kenya_wards_geom_srid_4326";--> statement-breakpoint
ALTER TABLE "kenya_wards" DROP CONSTRAINT "kenya_wards_geom_type_multipolygon";--> statement-breakpoint
ALTER TABLE "kenya_wards" ALTER COLUMN "geometry" SET DATA TYPE geometry(MultiPolygon, 4326);--> statement-breakpoint
ALTER TABLE "property" ALTER COLUMN "location_geom" SET DATA TYPE geometry(Point, 4326);