import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { chapitres } from "./chapitres";

export const lecons = pgTable("lecons", {
  id: serial("id").primaryKey(),
  titre: text("titre").notNull(),
  etat: text("etat"),
  contenu: text("contenu"),
  chapitre_id: integer("chapitre_id").references(() => chapitres.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});