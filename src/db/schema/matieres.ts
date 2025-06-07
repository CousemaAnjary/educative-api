import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { chapitres } from "./chapitres";
import { simulations_examen } from "./simulations_examen";

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
// Relations entre les tables
// ----------------------------------------------------------------------

export const matieresRelations = relations(matieres, ({ one, many }) => ({ 
  // ---- Matieres <-> Chapitres
   chapitres: many(chapitres),

  // ---- Matieres <-> simulations_examen
  simulations_examen: many(simulations_examen),

}))