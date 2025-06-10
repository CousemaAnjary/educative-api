import { z } from "zod"

export const exerciceSchema = z.object({
  nom: z.string().min(1, { message: "Le nom de l'exercice est requis" }),
  etat: z.enum(["Brouillon", "published", "archived"]).default("Brouillon"),
  questions: z.array(
    z.object({
      enoncer: z.string().min(1, { message: "L'énoncé est requis" }),
      options: z.array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
          correct: z.boolean(),
        })
      ).min(2, { message: "Au moins deux options sont requises" }),
    })
  ),
  leconId: z.number({
    required_error: "L'identifiant de la leçon est requis",
    invalid_type_error: "Le champ 'leconId' doit être un nombre",
  }),
});
