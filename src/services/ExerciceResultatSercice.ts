import { eq } from "drizzle-orm";
import { z } from "zod";
import db from "../db/drizzle";
import { exercices, exercices_resultats } from "../db/schema";
import { exerciceResultatSchema } from "../schema/exerciceResultatSchema";

export const ExerciceResulatSercice = {
  async createExerciceResultat(userId: string, data: z.infer<typeof exerciceResultatSchema>) {

    const { exerciceId, reponses, date_de_soumission } = data;

    // 1. Vérifie s'il y a déjà une soumission
    const existingResult = await db.query.exercices_resultats.findFirst({
      where: (exercices_resultats, { and, eq }) =>
        and(
          eq(exercices_resultats.userId, userId),
          eq(exercices_resultats.exerciceId, exerciceId)
        ),
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

    // 3. Parse les questions
    const questions: { enoncer: string; options: { label: string; value: string; correct: boolean }[] }[] = 
    
  typeof exercice.questions === "string"
      ? JSON.parse(exercice.questions)
      : exercice.questions;

    // 4. Calcule le nombre de bonnes réponses
    let bonnesReponses = 0;

    for (let i = 0; i < questions.length; i++) {
      const bonneOption = questions[i].options.find(opt => opt.correct);
      const reponseUtilisateur = reponses[i]?.selected;

      if (bonneOption?.label === reponseUtilisateur) {
        bonnesReponses++;
      }
    }

    const score = Math.round((bonnesReponses / questions.length) * 100);

    // 5. Insère le résultat
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
