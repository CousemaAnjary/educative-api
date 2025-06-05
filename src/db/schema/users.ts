import { boolean, integer, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core"

/**
 * Table 'roles' : contient la liste des rôles possibles.
 * Exemple de rôles : 'eleve', 'enseignant', 'admin', etc.
 */

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
})


export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  roleId: integer("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  password: text("password").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
