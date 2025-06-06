import { relations } from "drizzle-orm";
import { chapitres } from "./chapitres"
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core"
import { exercices } from "./exercices";


export const lecons = pgTable("lecons", {
  id: serial("id").primaryKey(),
  titre: text("titre").notNull(),
  etat: text("etat"),
  contenu: text("contenu"),
  chapitreId: integer("chapitre_id").references(() => chapitres.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});


// ----------------------------------------------------------------------
// Relations entre les tables
// ----------------------------------------------------------------------

export const leconsRelations = relations(lecons, ({ one , many }) => ({

  // ---- Lecons <-> Exercices
  exercices: many(exercices),

  // ---- Lecons <-> Chapitres
  chapitre: one(chapitres, {
    fields: [lecons.chapitreId],
    references: [chapitres.id],
  }),
   
}))