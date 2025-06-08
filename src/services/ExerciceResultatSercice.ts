import db from "../db/drizzle";
import { exerciceResultatSchema } from "../schema/exerciceResultatSchema";
import { z } from "zod";
import { exercices, exercices_resultats } from "../db/schema";
import { eq } from "drizzle-orm";

export const ExerciceResulatSercice = {
  async createExerciceResultat(data: z.infer<typeof exerciceResultatSchema>) {

    const { userId, exerciceId, reponses, date_de_soumission } = data;

    // 1. Vérifie s'il y a déjà une soumission
    const existingResult = await db.query.exercices_resultats.findFirst({
      where: (exercices_resultats, { and, eq }) =>
        and(eq(exercices_resultats.userId, userId), eq(exercices_resultats.exerciceId, exerciceId)),
    });

    if (existingResult) {
      throw new Error("Un résultat pour cet exercice existe déjà pour cet utilisateur.");
    }

    // 2. Récupère les questions de l'exercice
    const exercice = await db.query.exercices.findFirst({
      where: eq(exercices.id, exerciceId),
    });

    if (!exercice) {
      throw new Error("Exercice introuvable.");
    }

    const questions: { options: { label: string; correct: boolean }[] }[] = typeof exercice.questions === "string"
      ? JSON.parse(exercice.questions)
      : exercice.questions;

    // 3. Calcule le nombre de bonnes réponses
    let bonnesReponses = 0;

    for (let i = 0; i < questions.length; i++) {
      const bonneOption = questions[i].options.find((opt: { label: string; correct: boolean }) => opt.correct);
      const reponseUtilisateur = reponses[i]?.selected;

      if (bonneOption?.label === reponseUtilisateur) {
        bonnesReponses++;
      }
    }

    const score = Math.round((bonnesReponses / questions.length) * 100);

    // 4. Insère le résultat
    const [resultat] = await db.insert(exercices_resultats).values({
      userId,
      exerciceId,
      score,
      reponses: JSON.stringify(reponses),
      date_de_soumission,
    }).returning();

    return resultat;
  }
};
