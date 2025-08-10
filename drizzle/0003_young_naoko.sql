CREATE INDEX "kenya_wards_geometry_gix" ON "kenya_wards" USING gist ("geometry");--> statement-breakpoint
ALTER TABLE "kenya_wards" ADD CONSTRAINT "kenya_wards_geom_srid_4326" CHECK (ST_SRID("kenya_wards"."geometry") = 4326);--> statement-breakpoint
ALTER TABLE "kenya_wards" ADD CONSTRAINT "kenya_wards_geom_type_multipolygon" CHECK (GeometryType("kenya_wards"."geometry") = 'MULTIPOLYGON');