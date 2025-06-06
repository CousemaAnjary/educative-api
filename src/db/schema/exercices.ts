import {
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { lecons } from "./lecons"


export const exercices = pgTable("exercices", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  etat: text("etat"),
  questions: json("questions"),
  lecon_id: integer("lecon_id").references(() => lecons.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})
