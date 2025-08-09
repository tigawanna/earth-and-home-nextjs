CREATE TYPE "public"."cooling_type" AS ENUM('none', 'central', 'wall_unit', 'evaporative', 'geothermal');--> statement-breakpoint
CREATE TYPE "public"."heating_type" AS ENUM('none', 'electric', 'gas', 'oil', 'heat_pump', 'solar', 'geothermal');--> statement-breakpoint
CREATE TYPE "public"."listing_type" AS ENUM('sale', 'rent');--> statement-breakpoint
CREATE TYPE "public"."parking_type" AS ENUM('garage', 'carport', 'street', 'covered', 'assigned', 'none');--> statement-breakpoint
CREATE TYPE "public"."property_status" AS ENUM('draft', 'active', 'pending', 'sold', 'rented', 'off_market');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('house', 'apartment', 'condo', 'townhouse', 'duplex', 'studio', 'villa', 'land', 'commercial', 'industrial', 'farm');--> statement-breakpoint
CREATE TYPE "public"."zoning" AS ENUM('residential', 'commercial', 'agricultural', 'industrial', 'mixed_use', 'recreational', 'other');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"slug" text,
	"listing_type" "listing_type" DEFAULT 'sale' NOT NULL,
	"property_type" "property_type" NOT NULL,
	"status" "property_status" DEFAULT 'active' NOT NULL,
	"location" text NOT NULL,
	"street_address" text,
	"city" text,
	"state" text,
	"postal_code" text,
	"country" text,
	"latitude" double precision,
	"longitude" double precision,
	"location_geom" geometry(point),
	"dimensions" text,
	"building_size_sqft" integer,
	"lot_size_sqft" integer,
	"lot_size_acres" numeric(10, 2),
	"year_built" integer,
	"floors" integer,
	"beds" integer,
	"baths" integer,
	"parking_spaces" integer,
	"parking_type" "parking_type",
	"heating" "heating_type",
	"cooling" "cooling_type",
	"zoning" "zoning",
	"currency" text DEFAULT 'USD',
	"price" integer,
	"sale_price" integer,
	"rental_price" integer,
	"security_deposit" integer,
	"hoa_fee" integer,
	"annual_taxes" integer,
	"available_from" timestamp,
	"image_url" text,
	"images" jsonb DEFAULT '[]'::jsonb,
	"video_url" text,
	"virtual_tour_url" text,
	"amenities" jsonb DEFAULT '[]'::jsonb,
	"features" jsonb DEFAULT '[]'::jsonb,
	"utilities" jsonb DEFAULT '{}'::jsonb,
	"agent_id" text,
	"owner_id" text,
	"is_featured" boolean NOT NULL,
	"is_new" boolean NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "property_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_agent_id_user_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "property_location_geom_gix" ON "property" USING gist ("location_geom");