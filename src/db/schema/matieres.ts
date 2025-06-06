import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const matieres = pgTable("matieres", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  niveau: text("niveau").notNull(),
  description: text("description"),
  etat: text("etat"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});




// ----------------------------------------------------------------------
// utilisateurs → roles, exercices_resultats, simulations_examen_resultats
// --