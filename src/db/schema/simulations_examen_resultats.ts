import { users } from "./users"
import { relations } from "drizzle-orm"
import { simulations_examen } from "./simulations_examen"
import { integer, json, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core"


export const simulations_examen_resultats = pgTable( "simulations_examen_resultats",  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id").references(() => users.id),
    simulationId: integer("simulation_id").references( () => simulations_examen.id),
    score: integer("score"),
    reponses: json("reponses"),
    date_de_soumission: timestamp("date_de_soumission"),
  }
)


// ----------------------------------------------------------------------
// Relations entre les tables
// ----------------------------------------------------------------------

export const simulations_examen_resultatsRelations = relations(simulations_examen_resultats, ({ one }) => ({
  // ---- Résultats de Simulation Examen <-> Utilisateurs
  user: one(users, {
    fields: [simulations_examen_resultats.userId],
    references: [users.id],
  }),

  // ---- Résultats de Simulation Examen <-> Simulations Examen
  simulation: one(simulations_examen, {
    fields: [simulations_examen_resultats.simulationId],
    references: [simulations_examen.id],
  }),
}))