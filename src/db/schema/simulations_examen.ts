import { integer, json, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { matieres } from "./matieres";
import { users } from "./users";


export const simulations_examen = pgTable("simulations_examen", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  etat: text("etat"),
  duree: integer("duree"),
  date: timestamp("date"),
  date_limite: timestamp("date_limite"),
  questions: json("questions"),
  matiere_id: integer("matiere_id").references(() => matieres.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});



// ----------------------------------------------------------------------
// utilisateurs → roles, exercices_resultats, simulations_examen_resultats
// --