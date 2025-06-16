import { eq } from "drizzle-orm";
import db from "../db/drizzle";
import { exercices } from "../db/schema";
import { exerciceSchema } from "../schema/exerciceSchema";
import { z } from "zod";


export const exerciceService = {
  async getAllExercices() {
    const exercices = await db.query.exercices.findMany({
      with: {
        lecon: true,
      },
    });
    return exercices;
  },

  async createExercice(data: z.infer<typeof exerciceSchema>) {
    const { nom, etat, questions, leconId } = data;

    // Vérifie si un exercice avec le même nom et même leçon existe déjà
    const existing = await db.query.exercices.findFirst({
      where: (exercices, { and, eq }) =>
        and(eq(exercices.nom, nom), eq(exercices.leconId, leconId)),
    });

    if (existing) {
      throw new Error("Un exercice avec ce nom existe déjà pour cette leçon.");
    }

    // Insertion du nouvel exercice
    await db.insert(exercices).values({
      nom,
      etat,
      questions: JSON.stringify(questions),
      leconId,
    });
  },

   async getExercicesByMatiere(matiereId: string) {
    // 1. Récupérer tous les chapitres de la metiere
    const chapitres = await db.query.chapitres.findMany({
      where: (chapitres, { eq }) => eq(chapitres.matiereId, Number(matiereId)),
    });
    
    if (!chapitres || chapitres.length === 0) {
      return [];
    }
    
    const chapitreIds = chapitres.map(chapitre => chapitre.id);
    
    // 2. Récupérer toutes les leçons des chapitres
    const lecons = await db.query.lecons.findMany({
      where: (lecons, { inArray }) => inArray(lecons.chapitreId, chapitreIds),
    });
    
    if (!lecons || lecons.length === 0) {
      return [];
    }
    
    const leconIds = lecons.map(lecon => lecon.id);
    
    // 3. Récupérer tous les exercices des leçons
    const exercicesList = await db.query.exercices.findMany({
      where: (exercices, { inArray }) => inArray(exercices.leconId, leconIds),
    });
    
    return exercicesList;
  },

  async getExerciceById(id: string) {
    const exercice = await db.query.exercices.findFirst({
      where: (exercices, { eq }) => eq(exercices.id, Number(id)),
      with: {
        lecon: true,
      },
    });

    if (!exercice) {
      throw new Error("Exercice non trouvé");
    }

    return exercice;
  },

  async updateExercice(id: string, data: z.infer<typeof exerciceSchema>) {
    const { nom, etat, questions, leconId } = data;

    // Vérification si l'exercice existe
    const existingExercice = await db.query.exercices.findFirst({
      where: (exercices, { eq }) => eq(exercices.id, Number(id)),
    });
    
    if (!existingExercice) throw new Error("Exercice non trouvé");

    // Mise à jour de l'exercice
    await db.update(exercices).set({
      nom,
      etat,
      questions: JSON.stringify(questions),
      leconId,
    }).where(eq(exercices.id, Number(id)));
  },

  async deleteExercice(id: string) {
    // Vérification si l'exercice existe
    const existingExercice = await db.query.exercices.findFirst({
      where: (exercices, { eq }) => eq(exercices.id, Number(id)),
    });
    
    if (!existingExercice) throw new Error("Exercice non trouvé");

    // Suppression de l'exercice
    await db.delete(exercices).where(eq(exercices.id, Number(id)));
  },
}