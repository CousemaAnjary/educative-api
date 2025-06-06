import { lecons } from "./lecons"
import { relations } from "drizzle-orm"
import { integer, text, json, pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core"
import { exercices_resultats } from "./exercices_resultats"


export const exercices = pgTable("exercices", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  etat: text("etat"),
  questions: json("questions"),
  leconId: integer("lecon_id").references(() => lecons.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})


// ----------------------------------------------------------------------
// Relations entre les tables
// ----------------------------------------------------------------------


export const exercicesRelations = relations(exercices, ({ one , many}) => ({
  // ---- Exercices <-> Lecons
  lecon: one(lecons, {
    fields: [exercices.leconId],
    references: [lecons.id],
  }),

  // ---- Exercices <-> Exercices Resultats
   resultats: many(exercices_resultats) 

}))