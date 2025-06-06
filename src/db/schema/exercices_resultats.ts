import { integer, json, pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core";
import { exercices } from "./exercices";
import { users } from "./users";


export const exercices_resultats = pgTable("exercices_resultats", {
  id: serial("id").primaryKey(),
  utilisateur_id: uuid("utilisateur_id").references(() => users.id),
  exercice_id: integer("exercice_id").references(() => exercices.id),
  score: integer("score"),
  reponses: json("reponses"),
  date_de_soumission: timestamp("date_de_soumission"),
});

// ----------------------------------------------------------------------
// utilisateurs → roles, exercices_resultats, simulations_examen_resultats
// --