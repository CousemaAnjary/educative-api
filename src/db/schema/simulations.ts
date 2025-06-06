import { pgTable, serial, text, timestamp, integer, json, uuid } from "drizzle-orm/pg-core";
import { matieres } from "./matieres_chapitres_lecons";
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

export const simulations_examen_resultats = pgTable("simulations_examen_resultats", {
  id: serial("id").primaryKey(),
  utilisateur_id: uuid("utilisateur_id").references(() => users.id),
  simulation_id: integer("simulation_id").references(() => simulations_examen.id),
  score: integer("score"),
  reponses: json("reponses"),
  date_de_soumission: timestamp("date_de_soumission"),
});