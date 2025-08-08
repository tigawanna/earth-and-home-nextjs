import {
  pgTable,
  check,
  integer,
  varchar,
  serial,
  text,
  real,
  timestamp,
  unique,
  boolean,
  foreignKey,
  uuid,
  doublePrecision,
  numeric,
  jsonb,
  pgView,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const coolingType = pgEnum("cooling_type", [
  "none",
  "central",
  "wall_unit",
  "evaporative",
  "geothermal",
]);
export const heatingType = pgEnum("heating_type", [
  "none",
  "electric",
  "gas",
  "oil",
  "heat_pump",
  "solar",
  "geothermal",
]);
export const listingType = pgEnum("listing_type", ["sale", "rent"]);
export const parkingType = pgEnum("parking_type", [
  "garage",
  "carport",
  "street",
  "covered",
  "assigned",
  "none",
]);
export const propertyStatus = pgEnum("property_status", [
  "draft",
  "active",
  "pending",
  "sold",
  "rented",
  "off_market",
]);
export const propertyType = pgEnum("property_type", [
  "house",
  "apartment",
  "condo",
  "townhouse",
  "duplex",
  "studio",
  "villa",
  "land",
  "commercial",
  "industrial",
  "farm",
]);
export const zoning = pgEnum("zoning", [
  "residential",
  "commercial",
  "agricultural",
  "industrial",
  "mixed_use",
  "recreational",
  "other",
]);

export const spatialRefSys = pgTable(
  "spatial_ref_sys",
  {
    srid: integer().notNull(),
    authName: varchar("auth_name", { length: 256 }),
    authSrid: integer("auth_srid"),
    srtext: varchar({ length: 2048 }),
    proj4Text: varchar({ length: 2048 }),
  },
  (table) => [check("spatial_ref_sys_srid_check", sql`(srid > 0) AND (srid <= 998999)`)]
);

export const playingWithNeon = pgTable("playing_with_neon", {
  id: serial().primaryKey().notNull(),
  name: text().notNull(),
  value: real(),
});

export const verification = pgTable("verification", {
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const user = pgTable(
  "user",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean("email_verified").notNull(),
    image: text(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
  },
  (table) => [unique("user_email_unique").on(table.email)]
);

export const account = pgTable(
  "account",
  {
    id: text().primaryKey().notNull(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: "string" }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: "string" }),
    scope: text(),
    password: text(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "account_user_id_user_id_fk",
    }).onDelete("cascade"),
  ]
);

export const session = pgTable(
  "session",
  {
    id: text().primaryKey().notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    token: text().notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "session_user_id_user_id_fk",
    }).onDelete("cascade"),
    unique("session_token_unique").on(table.token),
  ]
);

export const property = pgTable(
  "property",
  {
    id: uuid()
      .default(sql`uuid_generate_v7()`)
      .primaryKey()
      .notNull(),
    title: text().notNull(),
    description: text(),
    slug: text(),
    listingType: listingType("listing_type").default("sale").notNull(),
    propertyType: propertyType("property_type").notNull(),
    status: propertyStatus().default("active").notNull(),
    location: text().notNull(),
    streetAddress: text("street_address"),
    city: text(),
    state: text(),
    postalCode: text("postal_code"),
    country: text(),
    latitude: doublePrecision(),
    longitude: doublePrecision(),
    dimensions: text(),
    buildingSizeSqft: integer("building_size_sqft"),
    lotSizeSqft: integer("lot_size_sqft"),
    lotSizeAcres: numeric("lot_size_acres", { precision: 10, scale: 2 }),
    yearBuilt: integer("year_built"),
    floors: integer(),
    beds: integer(),
    baths: integer(),
    parkingSpaces: integer("parking_spaces"),
    parkingType: parkingType("parking_type"),
    heating: heatingType(),
    cooling: coolingType(),
    zoning: zoning(),
    currency: text().default("USD"),
    price: integer(),
    salePrice: integer("sale_price"),
    rentalPrice: integer("rental_price"),
    securityDeposit: integer("security_deposit"),
    hoaFee: integer("hoa_fee"),
    annualTaxes: integer("annual_taxes"),
    availableFrom: timestamp("available_from", { mode: "string" }),
    imageUrl: text("image_url"),
    images: jsonb().default([]),
    videoUrl: text("video_url"),
    virtualTourUrl: text("virtual_tour_url"),
    amenities: jsonb().default([]),
    features: jsonb().default([]),
    utilities: jsonb().default({}),
    agentId: text("agent_id"),
    ownerId: text("owner_id"),
    isFeatured: boolean("is_featured").notNull(),
    isNew: boolean("is_new").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
  },
  (table) => [unique("property_slug_unique").on(table.slug)]
);

// export const geographyColumns = pgView("geography_columns", {
// 	fTableCatalog: varchar("f_table_catalog", { length: 256 }),
// 	fTableSchema: text("f_table_schema"),
// 	fTableName: text("f_table_name"),
// 	fGeographyColumn: text("f_geography_column"),
// 	coordDimension: integer("coord_dimension"),
// 	srid: integer(),
// 	type: text(),
// }).as(sql`SELECT current_database() AS f_table_catalog, n.nspname AS f_table_schema, c.relname AS f_table_name, a.attname AS f_geography_column, postgis_typmod_dims(a.atttypmod) AS coord_dimension, postgis_typmod_srid(a.atttypmod) AS srid, postgis_typmod_type(a.atttypmod) AS type FROM pg_class c, pg_attribute a, pg_type t, pg_namespace n WHERE t.typname = 'geography'::name AND a.attisdropped = false AND a.atttypid = t.oid AND a.attrelid = c.oid AND c.relnamespace = n.oid AND (c.relkind = ANY (ARRAY['r'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"])) AND NOT pg_is_other_temp_schema(c.relnamespace) AND has_table_privilege(c.oid, 'SELECT'::text)`);

// export const geometryColumns = pgView("geometry_columns", {
// 	fTableCatalog: varchar("f_table_catalog", { length: 256 }),
// 	fTableSchema: text("f_table_schema"),
// 	fTableName: text("f_table_name"),
// 	fGeometryColumn: text("f_geometry_column"),
// 	coordDimension: integer("coord_dimension"),
// 	srid: integer(),
// 	type: varchar({ length: 30 }),
// }).as(sql`SELECT current_database()::character varying(256) AS f_table_catalog, n.nspname AS f_table_schema, c.relname AS f_table_name, a.attname AS f_geometry_column, COALESCE(postgis_typmod_dims(a.atttypmod), sn.ndims, 2) AS coord_dimension, COALESCE(NULLIF(postgis_typmod_srid(a.atttypmod), 0), sr.srid, 0) AS srid, replace(replace(COALESCE(NULLIF(upper(postgis_typmod_type(a.atttypmod)), 'GEOMETRY'::text), st.type, 'GEOMETRY'::text), 'ZM'::text, ''::text), 'Z'::text, ''::text)::character varying(30) AS type FROM pg_class c JOIN pg_attribute a ON a.attrelid = c.oid AND NOT a.attisdropped JOIN pg_namespace n ON c.relnamespace = n.oid JOIN pg_type t ON a.atttypid = t.oid LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(split_part(s.consrc, ''''::text, 2), ')'::text, ''::text) AS type FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%geometrytype(% = %'::text) st ON st.connamespace = n.oid AND st.conrelid = c.oid AND (a.attnum = ANY (st.conkey)) LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(split_part(s.consrc, ' = '::text, 2), ')'::text, ''::text)::integer AS ndims FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%ndims(% = %'::text) sn ON sn.connamespace = n.oid AND sn.conrelid = c.oid AND (a.attnum = ANY (sn.conkey)) LEFT JOIN ( SELECT s.connamespace, s.conrelid, s.conkey, replace(replace(split_part(s.consrc, ' = '::text, 2), ')'::text, ''::text), '('::text, ''::text)::integer AS srid FROM ( SELECT pg_constraint.connamespace, pg_constraint.conrelid, pg_constraint.conkey, pg_get_constraintdef(pg_constraint.oid) AS consrc FROM pg_constraint) s WHERE s.consrc ~~* '%srid(% = %'::text) sr ON sr.connamespace = n.oid AND sr.conrelid = c.oid AND (a.attnum = ANY (sr.conkey)) WHERE (c.relkind = ANY (ARRAY['r'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"])) AND NOT c.relname = 'raster_columns'::name AND t.typname = 'geometry'::name AND NOT pg_is_other_temp_schema(c.relnamespace) AND has_table_privilege(c.oid, 'SELECT'::text)`);
