import { z } from "zod"

export const simulationExamenResultatSchema = z.object({
  simulationId: z.number().int({ message: "ID examen invalide" }),
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