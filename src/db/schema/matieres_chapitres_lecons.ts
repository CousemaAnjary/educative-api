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

export const chapitres = pgTable("chapitres", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  etat: text("etat"),
  description: text("description"),
  matiere_id: integer("matiere_id").references(() => matieres.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const lecons = pgTable("lecons", {
  id: serial("id").primaryKey(),
  titre: text("titre").notNull(),
  etat: text("etat"),
  contenu: text("contenu"),
  chapitre_id: integer("chapitre_id").references(() => chapitres.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});