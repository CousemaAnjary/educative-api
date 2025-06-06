import { integer, json, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users";
import { simulations_examen } from "./simulations_examen";

export const simulations_examen_resultats = pgTable(
  "simulations_examen_resultats",
  {
    id: serial("id").primaryKey(),
    utilisateur_id: uuid("utilisateur_id").references(() => users.id),
    simulation_id: integer("simulation_id").references(
      () => simulations_examen.id
    ),
    score: integer("score"),
    reponses: json("reponses"),
    date_de_soumission: timestamp("date_de_soumission"),
  }
)
