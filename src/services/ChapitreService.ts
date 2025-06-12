import { eq } from "drizzle-orm"
import { z } from "zod"
import db from "../db/drizzle"
import { chapitres } from "../db/schema"
import { chapitreSchema, etatSchema } from "../schema/chapitreSchema"

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
    const { nom, description, matiereId, etat } = data

    // Vérifie si un chapitre avec le même nom et même matière existe déjà
    const existing = await db.query.chapitres.findFirst({
      where: (chapitres, { and, eq }) =>
        and(eq(chapitres.nom, nom), eq(chapitres.matiereId, matiereId)),
    })

    if (existing) {
      throw new Error("Un chapitre avec ce nom existe déjà pour cette matière.")
    }

    // Insertion du nouveau chapitre
    await db.insert(chapitres).values({
      nom,
      description,
      matiereId,
      etat,
    })
  },

  async getChapitresByMatiere(id: string) {
    const results = await db.query.chapitres.findMany({
      where: (chapitres, { eq }) => eq(chapitres.matiereId, Number(id)),
    })

    if (!results) return [];

    return results;
  },

  async getChapitreById(id: string) {
    const chapitre = await db.query.chapitres.findFirst({
      where: (chapitres, { eq }) => eq(chapitres.id, Number(id)),
      with: {
        matiere: true,
        lecons: true,
      },
    })

    if (!chapitre) {
      throw new Error("Chapitre non trouvé")
    }

    return chapitre
  },

  async updateChapitre(id: string, data: z.infer<typeof chapitreSchema>) {
    // Destructuration des données validées
    const { nom, description, matiereId, etat } = data

    // Vérification si le chapitre existe
    const existingChapitre = await db.query.chapitres.findFirst({
      where: (chapitres, { eq }) => eq(chapitres.id, Number(id)),
    })
    if (!existingChapitre) throw new Error("Chapitre non trouvé")

    // Vérifie si un chapitre avec le même nom et même matière existe déjà
    const existing = await db.query.chapitres.findFirst({
      where: (chapitres, { and, eq }) =>
        and(eq(chapitres.nom, nom), eq(chapitres.matiereId, matiereId)),
    })
    if (existing && existing.id !== Number(id))
      throw new Error("Un chapitre avec ce nom existe déjà pour cette matière.")

    // Mise à jour du chapitre
    const updatedChapitre = await db
      .update(chapitres)
      .set({
        nom,
        description,
        matiereId,
        etat,
      })
      .where(eq(chapitres.id, Number(id)))
  },

  async updateChapitreEtat(id: string, data: z.infer<typeof etatSchema>) {
    // Destructuration des données validées
    const { etat } = data

    // Vérification si le chapitre existe
    const existingChapitre = await db.query.chapitres.findFirst({
      where: (chapitres, { eq }) => eq(chapitres.id, Number(id)),
    })
    if (!existingChapitre) throw new Error("Chapitre non trouvé")

    // Mise à jour de l'état du chapitre
    await db
      .update(chapitres)
      .set({ etat })
      .where(eq(chapitres.id, Number(id)))  
  },

  async deleteChapitre(id: string) {
    // Vérification si le chapitre existe
    const existingChapitre = await db.query.chapitres.findFirst({
      where: (chapitres, { eq }) => eq(chapitres.id, Number(id)),
    })
    if (!existingChapitre) throw new Error("Chapitre non trouvé")

    // Suppression du chapitre
    await db.delete(chapitres).where(eq(chapitres.id, Number(id)))
  },
}
