import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"
import { matieres } from "./matieres"

export const chapitres = pgTable("chapitres", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  etat: text("etat"),
  description: text("description"),
  matiere_id: integer("matiere_id").references(() => matieres.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})
