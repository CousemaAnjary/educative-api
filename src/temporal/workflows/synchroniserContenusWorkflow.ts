// src/temporal/workflows/synchroniserContenusWorkflow.ts
import { proxyActivities } from "@temporalio/workflow";
import type { AuthenticatedUser, EducationalContent } from "../types";
import type * as activities from "../activities/educationActivities";

// Crée un proxy pour les activités
const {
  authentifierUtilisateur,
  notifierUtilisateur,
  recupererContenusEducatifs,
  sauvegarderContenus,
  verifierDoublonsContenus,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute", // adapte selon tes besoins
});

// Définition du workflow sous forme d'une fonction exportée
export async function synchroniserContenusWorkflow(
  userEmail: string
): Promise<{ success: boolean; message?: string }> {
  try {
    // 1. Authentification de l'utilisateur
    const user: AuthenticatedUser = await authentifierUtilisateur(userEmail);

    // 2. Récupération des contenus éducatifs
    const contenus: EducationalContent[] = await recupererContenusEducatifs(
      user.id
    );

    // 3. Vérification des doublons
    const contenusUniques = await verifierDoublonsContenus(contenus);

    // 4. Sauvegarde des contenus
    await sauvegarderContenus(contenusUniques);

    // 5. Notification de l'utilisateur
    await notifierUtilisateur(user.id, {
      type: "synchronisation-contenus",
      status: "success",
      message: "Synchronisation des contenus terminée avec succès",
    });

    return { success: true, message: "Synchronisation terminée" };
  } catch (error: any) {
    console.error("Erreur lors de la synchronisation des contenus:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue",
    };
  }
}
