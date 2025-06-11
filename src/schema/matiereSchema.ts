import { z } from "zod"

export const matiereSchema = z.object({
  nom: z.string().min(1, { message: "Name is required" }),
  niveau: z.enum(["Sixième", "Cinquième", "Quatrième", "Troisième"]),
  description: z.string().optional(),
  etat: z.enum(["brouillon", "published", "archived"]).default("brouillon"),  
})