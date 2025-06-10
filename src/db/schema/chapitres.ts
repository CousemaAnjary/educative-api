import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"
import { matieres } from "./matieres"
import { relations } from "drizzle-orm"
import { lecons } from "./lecons"

export const chapitres = pgTable("chapitres", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  etat: text("etat"),
  description: text("description"),
  matiereId: integer("matiere_id").references(() => matieres.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

// ----------------------------------------------------------------------
// Relations entre les tables
// ----------------------------------------------------------------------


export const chapitresRelations = relations(chapitres, ({ one , many}) => ({

  // ---- Chapitres <-> Matieres
  matiere: one(matieres, {
    fields: [chapitres.matiereId],
    references: [matieres.id],
  }),

  // ---- Chapitres <-> Lecons
  lecons: many(lecons),

}))