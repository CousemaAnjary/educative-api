import { z } from "zod"


export const exerciceResultatSchema = z.object({
  userId: z.string().uuid({ message: "ID utilisateur invalide" }),
  exerciceId: z.number().int({ message: "ID exercice invalide" }),
  score: z.number().int().min(0, { message: "Le score doit être un entier positif" }),
  reponses: z.array(
    z.object({
      selected: z.string(),     // exemple : "A"
      correct: z.boolean(),     // exemple : true ou false
    })
  ),
  date_de_soumission: z.date(),
})
