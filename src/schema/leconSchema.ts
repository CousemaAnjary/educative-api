import { z } from "zod"

export const leconSchema = z.object({
  "titre": z.string().min(1, { message: "Le titre est requis" }),
  "contenu": z.string().min(1, { message: "Le contenu est requis" }),
  "etat": z.enum(["Brouillon", "published", "archived"]).default("Brouillon"),  
  "chapitreId": z.number({
    required_error: "L'ID du chapitre est requis",
    invalid_type_error: "L'ID du chapitre doit être un nombre",
  }),
})