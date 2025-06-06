import { integer, json, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { matieres } from "./matieres";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { simulations_examen_resultats } from "./simulations_examen_resultats";


export const simulations_examen = pgTable("simulations_examen", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  etat: text("etat"),
  duree: integer("duree"),
  date: timestamp("date"),
  date_limite: timestamp("date_limite"),
  questions: json("questions"),
  matiereId: integer("matiere_id").references(() => matieres.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});


// ----------------------------------------------------------------------
// Relations entre les tables
// ----------------------------------------------------------------------

export const simulationsExamenRelations = relations(simulations_examen, ({ one , many }) => ({
  // ---- Simulations Examen <-> Matieres
  matiere: one(matieres, {
    fields: [simulations_examen.matiereId],
    references: [matieres.id],
  }),

  // ---- Simulations Examen <-> simulations_examen_resultats
  simulations_examen_resultats: many(simulations_examen_resultats)
 

}))