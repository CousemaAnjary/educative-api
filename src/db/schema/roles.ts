import { users } from "./users"
import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core"


export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
})

// ----------------------------------------------------------------------
// Relations entre les tables
// ----------------------------------------------------------------------

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}))