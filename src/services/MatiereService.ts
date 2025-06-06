import { eq } from "drizzle-orm"
import { z } from "zod"
import db from "../db/drizzle"
import { matieres } from "../db/schema"
import { matiereSchema } from "../schema/matiereSchema"

export const MatiereService = {
  async getAllMatieres() {
    // Récupération de toutes les matières
    const matieresList = await db.query.matieres.findMany()
    return matieresList
  },

  async createMatiere(data: z.infer<typeof matiereSchema>) {
    // Destructuration des données validées
    const { nom, niveau, description, etat } = data

    // Vérification si la matière existe déjà
    const existingMatiere = await db.query.matieres.findFirst({
      where: eq(matieres.nom, nom),
    })
    if (existingMatiere) throw new Error("Matière already exists")

    // Insertion de la matière
    await db.insert(matieres).values({
      nom,
      niveau,
      description,
      etat,
    })
  },

  async getMatiereById(id: string) {
    // Recherche de la matière par ID
    const matiere = await db.query.matieres.findFirst({
      where: eq(matieres.id, Number(id)),
    })
    if (!matiere) throw new Error("Matière not found")

    return matiere
  },

  async updateMatiere(id: string, data: z.infer<typeof matiereSchema>) {

    // Destructuration des données validées
    const { nom, niveau, description, etat } = data

    // Vérification si la matière existe
    const existingMatiere = await db.query.matieres.findFirst({ where: eq(matieres.id, Number(id))})
    if (!existingMatiere) throw new Error("Matière not found")

    // Mise à jour de la matière
    await db.update(matieres).set({
        nom,
        niveau,
        description,
        etat,
      }).where(eq(matieres.id, Number(id)))
  },
}
