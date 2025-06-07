import { z } from "zod"

export const matiereSchema = z.object({
  nom: z.string().min(1, { message: "Name is required" }),
  niveau: z.string().min(1, { message: "Niveau is required" }),
  description: z.string().optional(),
  etat: z.enum(["actif", "inactif"]).default("inactif"),
})