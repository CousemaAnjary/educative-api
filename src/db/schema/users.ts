import { roles } from "./roles"
import { relations } from "drizzle-orm"
import { exercices_resultats } from "./exercices_resultats"
import { simulations_examen_resultats } from "./simulations_examen_resultats"
import { boolean, integer, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core"


export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  roleId: integer("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  password: text("password").notNull(),
  image: text("image"),
  niveau: text("niveau").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})


// ----------------------------------------------------------------------
// Relations entre les tables
// ----------------------------------------------------------------------

export const usersRelations = relations(users, ({ one, many }) => ({

  // ---- Utilisateurs <-> Roles
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),

  // ---- Utilisateurs <-> Exercices Resultats
  exercices_resultats: many(exercices_resultats),

  // ---- Utilisateurs <-> Simulations Examen Resultats
  simulations_examen_resultats: many(simulations_examen_resultats),

  

}))

