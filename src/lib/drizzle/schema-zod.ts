import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { user, property } from "./schema";

export const userSchema = createSelectSchema(user);
export const userInsertSchema = createInsertSchema(user);
export const userUpdateSchema = createUpdateSchema(user);

export const propertySchema = createSelectSchema(property);
export const propertyInsertSchema = createInsertSchema(property);
export const propertyUpdateSchema = createUpdateSchema(property);
