import { z } from "zod"

export const chapitreSchema = z.object({
  nom: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  etat: z.enum(["Brouillon", "published", "archived"]).default("Brouillon"),
  matiereId: z.number({
    required_error: "L'ID de la matière est requis",
    invalid_type_error: "L'ID de la matière doit être un nombre",
  }),
})

export const etatSchema = z.object({
  etat: z.enum(["Brouillon", "published", "archived"]).default("Brouillon"),
})