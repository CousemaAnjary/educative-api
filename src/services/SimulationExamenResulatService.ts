import { eq } from "drizzle-orm";
import { z } from "zod";
import db from "../db/drizzle";
import { simulations_examen, simulations_examen_resultats } from "../db/schema";
import { simulationExamenResultatSchema } from "../schema/simulationExamenResultat";


export const SimulationExamenResultatService = {
  async createSimulationResultat(userId: string, data: z.infer<typeof simulationExamenResultatSchema>) {
    const { simulationId, reponses, date_de_soumission } = data;

    // 1. Vérifie s'il y a déjà une soumission
    const existingResult = await db.query.simulations_examen_resultats.findFirst({
      where: (simulations_examen_resultats, { and, eq }) =>
        and(
          eq(simulations_examen_resultats.userId, userId),
          eq(simulations_examen_resultats.simulationId, simulationId)
        ),
    });

    if (existingResult) {
      throw new Error("Un résultat pour cette simulation existe déjà pour cet utilisateur.");
    }

    // 2. Récupère les questions de la simulation
    const simulation = await db.query.simulations_examen.findFirst({
      where: eq(simulations_examen.id, simulationId),
    });

    if (!simulation) {
      throw new Error("Simulation introuvable.");
    }

    const questions: {
      enoncer: string;
      options: { label: string; value: string; correct: boolean }[];
    }[] = typeof simulation.questions === "string"
      ? JSON.parse(simulation.questions)
      : simulation.questions;

    // 3. Calcul du score
    let bonnesReponses = 0;
    for (let i = 0; i < questions.length; i++) {
      const bonneOption = questions[i].options.find(opt => opt.correct);
      const reponseUtilisateur = reponses[i]?.selected;

      if (bonneOption?.label === reponseUtilisateur) {
        bonnesReponses++;
      }
    }

    const score = Math.round((bonnesReponses / questions.length) * 100);

    // 4. Insertion du résultat
    const [resultat] = await db.insert(simulations_examen_resultats).values({
      userId,
      simulationId,
      score,
      reponses: JSON.stringify(reponses),
      date_de_soumission,
    }).returning();

    return resultat;
  },

  async getAllSimulationResultats() {
    const results = await db.query.simulations_examen_resultats.findMany({
      with: {
        simulation: true,
      },
    });

    return results;
  },

  async getSimulationResultatById(resultId: string) {
    const result = await db.query.simulations_examen_resultats.findFirst({
      where: eq(simulations_examen_resultats.id, Number(resultId)),
      with: {
        simulation: true,
      },
    });

    if (!result) {
      throw new Error("Résultat de simulation introuvable.");
    }

    return result;
  },
};
