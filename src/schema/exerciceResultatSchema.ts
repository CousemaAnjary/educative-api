import { z } from "zod"


export const exerciceResultatSchema = z.object({
  exerciceId: z.number().int({ message: "ID exercice invalide" }),
  reponses: z.array(
    z.object({
      selected: z.string(),
    })
  ),
  date_de_soumission: z.union([
    z.date(),
    z.string().transform((val) => new Date(val))
  ])
})
