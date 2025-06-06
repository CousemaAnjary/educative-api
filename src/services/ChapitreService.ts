import { chapitreSchema } from "../schema/chapitreSchema"
import db from "../db/drizzle"
import { z } from "zod"
import { chapitres } from "../db/schema"

export const ChapitreService = {
  async getAllChapitre() {
    const chapitres = await db.query.chapitres.findMany({
      with: {
        matiere: true,
        lecons: true,
      },
    })
    return chapitres
  },

  async createChapitre(data: z.infer<typeof chapitreSchema>) {
    const { nom, description, matiereId, etat } = data;

    // Vérifie si un chapitre avec le même nom et même matière existe déjà
    const existing = await db.query.chapitres.findFirst({
      where: (chapitres, { and, eq }) =>
        and(eq(chapitres.nom, nom), eq(chapitres.matiereId, matiereId)),
    });

    if (existing) {
      throw new Error("Un chapitre avec ce nom existe déjà pour cette matière.");
    }

    // Insertion du nouveau chapitre
    await db.insert(chapitres).values({
      nom,
      description,
      matiereId,
      etat
    })
  },
}
