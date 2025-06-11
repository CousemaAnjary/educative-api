// src/temporal/workflows/gererExercicesWorkflow.ts
import { proxyActivities } from "@temporalio/workflow";
import type { AuthenticatedUser, Exercise, ExerciseResult } from "../types";
import type * as activities from "../activities/educationActivities";

// Crée un proxy pour les activités
const {
  authentifierUtilisateur,
  envoyerReponsesPourCorrection,
  notifierUtilisateur,
  recupererExercices,
  recupererResultats,
  sauvegarderResultats,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute", // par exemple
});

// Définis le workflow comme une fonction
export async function gererExercicesWorkflow(
  userEmail: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Authentification de l'utilisateur
    const user: AuthenticatedUser = await authentifierUtilisateur(userEmail);

    // 2. Récupération des exercices
    const exercices: Exercise[] = await recupererExercices(user.id);

    // 3. Pour chaque exercice
    for (const exercice of exercices) {
      // Récupérer les réponses de l'utilisateur
      const resultats: ExerciseResult[] = await recupererResultats(
        user.id,
        exercice.id
      );

      // Envoyer les réponses pour correction
      await envoyerReponsesPourCorrection(resultats);

      // Sauvegarder les résultats
      await sauvegarderResultats(resultats);
    }

    // 4. Notifier l'utilisateur
    await notifierUtilisateur(user.id);

    return { success: true };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur inconnue est survenue";
    console.error("Erreur dans le workflow:", error);
    return { success: false, error: errorMessage };
  }
}
