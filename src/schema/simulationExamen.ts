import { z } from "zod";

export const simulationExamenSchema = z.object({
  nom: z.string().min(1, { message: "Le nom est requis" }),
  etat: z.enum(["brouillon", "published", "archived"]).default("brouillon"),  
  duree: z.number().int().min(1, { message: "La durée doit être un entier positif" }),
  date: z.union([
    z.date(),
    z.string().transform((val) => new Date(val))
  ]),
  date_limite: z.union([
    z.date(),
    z.string().transform((val) => new Date(val))
  ]),
  questions: z.array(
    z.object({
      enoncer: z.string(),
      options: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
          correct: z.boolean()
        })
      )
    })
  ),
  matiereId: z.number().int({ message: "ID de la matière requis" })
});
