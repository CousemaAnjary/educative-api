// src/temporal/activities/educationActivities.ts
import axios from "axios";
import type {
  AuthenticatedUser,
  Correction,
  EducationalContent,
  Exercise,
  ExerciseResult,
  Notification,
  UserResponse,
} from "../types";

// Configuration des services
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:3000";
const EDUCATION_SERVICE_URL =
  process.env.EDUCATION_SERVICE_URL || "http://localhost:3000";
const TEST_SERVICE_URL =
  process.env.TEST_SERVICE_URL || "http://localhost:3000";

// Implémentation des activités
export async function authentifierUtilisateur(
  email: string,
  password: string
): Promise<AuthenticatedUser> {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Échec de l'authentification : ${error?.message || "Erreur inconnue"}`
    );
  }
}

export async function recupererContenusEducatifs(
  userId: string
): Promise<EducationalContent[]> {
  try {
    const response = await axios.get(
      `${EDUCATION_SERVICE_URL}/contents?userId=${userId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Échec de récupération des contenus : ${
        error?.message || "Erreur inconnue"
      }`
    );
  }
}

export async function verifierDoublonsContenus(
  contenus: EducationalContent[]
): Promise<EducationalContent[]> {
  const uniqueContenus = new Map<string, EducationalContent>();

  for (const contenu of contenus) {
    if (!uniqueContenus.has(contenu.id)) {
      uniqueContenus.set(contenu.id, contenu);
    }
  }

  return Array.from(uniqueContenus.values());
}

export async function sauvegarderContenus(
  contenus: EducationalContent[]
): Promise<void> {
  try {
    await axios.post(`${EDUCATION_SERVICE_URL}/contents/batch`, contenus);
  } catch (error: any) {
    throw new Error(
      `Échec de sauvegarde des contenus : ${
        error?.message || "Erreur inconnue"
      }`
    );
  }
}

export async function notifierUtilisateur(
  userId: string,
  notification: Notification
): Promise<void> {
  try {
    await axios.post(
      `${USER_SERVICE_URL}/notifications/${userId}`,
      notification
    );
  } catch (error: any) {
    throw new Error(
      `Échec de notification : ${error?.message || "Erreur inconnue"}`
    );
  }
}

export async function recupererExercices(userId: string): Promise<Exercise[]> {
  try {
    const response = await axios.get(
      `${TEST_SERVICE_URL}/exercises?userId=${userId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Échec de récupération des exercices : ${
        error?.message || "Erreur inconnue"
      }`
    );
  }
}

export async function envoyerReponsesPourCorrection(
  responseData: UserResponse
): Promise<Correction> {
  try {
    const response = await axios.post(
      `${TEST_SERVICE_URL}/exercises/correct`,
      responseData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Échec de correction : ${error?.message || "Erreur inconnue"}`
    );
  }
}

export async function recupererResultats(
  userId: string
): Promise<ExerciseResult[]> {
  try {
    const response = await axios.get(
      `${TEST_SERVICE_URL}/results?userId=${userId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Échec de récupération des résultats : ${
        error?.message || "Erreur inconnue"
      }`
    );
  }
}

export async function sauvegarderResultats(
  resultats: ExerciseResult[]
): Promise<void> {
  try {
    await axios.post(`${TEST_SERVICE_URL}/results/batch`, resultats);
  } catch (error: any) {
    throw new Error(
      `Échec de sauvegarde des résultats : ${
        error?.message || "Erreur inconnue"
      }`
    );
  }
}
