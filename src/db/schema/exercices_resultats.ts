import { pgTable, serial, text, timestamp, integer, json, uuid } from "drizzle-orm/pg-core";
import { lecons } from "./matieres_chapitres_lecons";
import { users } from "./users";


export const exercices = pgTable("exercices", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  etat: text("etat"),
  questions: json("questions"),
  lecon_id: integer("lecon_id").references(() => lecons.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const exercices_resultats = pgTable("exercices_resultats", {
  id: serial("id").primaryKey(),
  utilisateur_id: uuid("utilisateur_id").references(() => users.id),
  exercice_id: integer("exercice_id").references(() => exercices.id),
  score: integer("score"),
  reponses: json("reponses"),
  date_de_soumission: timestamp("date_de_soumission"),
});