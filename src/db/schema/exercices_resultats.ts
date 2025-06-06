import { users } from "./users"
import { exercices } from "./exercices"
import { relations } from "drizzle-orm"
import { integer, json, pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core"



export const exercices_resultats = pgTable("exercices_resultats", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  exerciceId: integer("exercice_id").references(() => exercices.id),
  score: integer("score"),
  reponses: json("reponses"),
  date_de_soumission: timestamp("date_de_soumission"),
})

// ----------------------------------------------------------------------
// Relations entre les tables
// ----------------------------------------------------------------------

export const exercices_resultatsRelations = relations(exercices_resultats, ({ one }) => ({

  // ---- Exercices Resultats <-> Utilisateurs
   user: one(users, {
    fields: [exercices_resultats.userId],
    references: [users.id],
  }),

  // ---- Exercices Resultats <-> Exercices
  exercice: one(exercices, {
    fields: [exercices_resultats.exerciceId],
    references: [exercices.id],
  }),
}))