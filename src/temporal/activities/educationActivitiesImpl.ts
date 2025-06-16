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

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:3000/api";
const EDUCATION_SERVICE_URL =
  process.env.EDUCATION_SERVICE_URL || "http://localhost:3000/api";
const TEST_SERVICE_URL =
  process.env.TEST_SERVICE_URL || "http://localhost:3000/api";

// Fonction utilitaire pour log d'erreurs
function logAxiosError(context: string, error: any, url: string, data?: any) {
  console.error(`❌ [${context}] Échec pour ${url}`);
  if (data) {
    console.error("📤 Données envoyées:", data);
  }
  if (error.response) {
    console.error("📥 Réponse du serveur:", error.response.data);
    console.error("🔢 Code HTTP:", error.response.status);
  } else if (error.request) {
    console.error("❗ Aucune réponse reçue. Requête envoyée:", error.request);
  } else {
    console.error("⚠️ Erreur inconnue:", error.message);
  }
}

export async function authentifierUtilisateur(credentials: {
  email: string;
  password: string;
}): Promise<AuthenticatedUser> {
  const { email, password } = credentials;
  const url = `${USER_SERVICE_URL}/auth/login`;
  const data = { email, password };
  try {
    console.log(`🔐 Tentative d'authentification via ${url}`);
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("✅ Authentification réussie.");
    return response.data;
  } catch (error: any) {
    logAxiosError("authentifierUtilisateur", error, url, data);
    throw new Error(`Échec de l'authentification : ${error.message}`);
  }
}

export async function recupererContenusEducatifs(
  token: string
): Promise<EducationalContent[]> {
  const url = `${EDUCATION_SERVICE_URL}/matieres/niveau`; // <-- juste ici le bon endpoint
  try {
    console.log(`📚 Récupération des matières par niveau via ${url}`);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ en-tête seulement
      },
    });
    return response.data;
  } catch (error: any) {
    logAxiosError("recupererContenusEducatifs", error, url);
    throw new Error(`Échec de récupération des matières : ${error.message}`);
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
  const url = `${EDUCATION_SERVICE_URL}/matieres/batch`;
  try {
    console.log(`💾 Sauvegarde de ${contenus.length} contenus éducatifs`);
    await axios.post(url, contenus);
  } catch (error: any) {
    logAxiosError("sauvegarderContenus", error, url, contenus);
    throw new Error(`Échec de sauvegarde des contenus : ${error.message}`);
  }
}

export async function notifierUtilisateur(
  userId: string,
  notification: Notification
): Promise<void> {
  const url = `${USER_SERVICE_URL}/notifications/${userId}`;
  try {
    console.log(`🔔 Notification de l'utilisateur ${userId}`);
    await axios.post(url, notification);
  } catch (error: any) {
    logAxiosError("notifierUtilisateur", error, url, notification);
    throw new Error(`Échec de notification : ${error.message}`);
  }
}

export async function recupererExercices(userId: string): Promise<Exercise[]> {
  const url = `${TEST_SERVICE_URL}/exercises?userId=${userId}`;
  try {
    console.log(`📖 Récupération des exercices pour l'utilisateur ${userId}`);
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    logAxiosError("recupererExercices", error, url);
    throw new Error(`Échec de récupération des exercices : ${error.message}`);
  }
}

export async function envoyerReponsesPourCorrection(
  responseData: UserResponse
): Promise<Correction> {
  const url = `${TEST_SERVICE_URL}/exercises/correct`;
  try {
    console.log("📩 Envoi des réponses pour correction");
    const response = await axios.post(url, responseData);
    return response.data;
  } catch (error: any) {
    logAxiosError("envoyerReponsesPourCorrection", error, url, responseData);
    throw new Error(`Échec de correction : ${error.message}`);
  }
}

export async function recupererResultats(
  userId: string
): Promise<ExerciseResult[]> {
  const url = `${TEST_SERVICE_URL}/results?userId=${userId}`;
  try {
    console.log(`📊 Récupération des résultats pour l'utilisateur ${userId}`);
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    logAxiosError("recupererResultats", error, url);
    throw new Error(`Échec de récupération des résultats : ${error.message}`);
  }
}

export async function sauvegarderResultats(
  resultats: ExerciseResult[]
): Promise<void> {
  const url = `${TEST_SERVICE_URL}/results/batch`;
  try {
    console.log(`💾 Sauvegarde de ${resultats.length} résultats d'examen`);
    await axios.post(url, resultats);
  } catch (error: any) {
    logAxiosError("sauvegarderResultats", error, url, resultats);
    throw new Error(`Échec de sauvegarde des résultats : ${error.message}`);
  }
}
