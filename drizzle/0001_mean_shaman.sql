CREATE TABLE "kenya_wards" (
	"id" serial PRIMARY KEY NOT NULL,
	"ward_code" varchar(10) NOT NULL,
	"ward" text NOT NULL,
	"county" text NOT NULL,
	"county_code" integer NOT NULL,
	"sub_county" text,
	"constituency" text NOT NULL,
	"constituency_code" integer NOT NULL,
	"row_num" integer,
	"ward_county" text,
	"geometry" geometry(point) NOT NULL
);
