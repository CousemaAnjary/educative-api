import { eq } from "drizzle-orm";
import db from "../db/drizzle";
import { simulationExamenSchema } from "../schema/simulationExamen";
import { z } from "zod";
import { simulations_examen } from "../db/schema";


export const SimulationExamenService = {

  async getAllSimulations() {
    // Récupération de toutes les simulations d'examen
    const simulationsList = await db.query.simulations_examen.findMany();
    return simulationsList;
  },

  async createSimulation(data: z.infer<typeof simulationExamenSchema>) {
    // Destructuration des données validées
    const { nom, etat, duree, date, date_limite, questions, matiereId } = data;

    // Vérification si la simulation existe déjà
    const existingSimulation = await db.query.simulations_examen.findFirst({
      where: eq(simulations_examen.nom, nom),
    });
    if (existingSimulation) throw new Error("Simulation already exists");

    // Insertion de la simulation
    await db.insert(simulations_examen).values({
      nom,
      etat,
      duree,
      date,
      date_limite,
      questions,
      matiereId,
    });
  },

  async getSimulationById(id: string) {
    // Recherche de la simulation par ID
    const simulation = await db.query.simulations_examen.findFirst({
      where: eq(simulations_examen.id, Number(id)),
    });
    if (!simulation) throw new Error("Simulation not found");

    return simulation;
  },

  async updateSimulation(id: string, data: z.infer<typeof simulationExamenSchema>) {
    // Destructuration des données validées
    const { nom, etat, duree, date, date_limite, questions, matiereId } = data;

    // Vérification si la simulation existe
    const existingSimulation = await db.query.simulations_examen.findFirst({
      where: eq(simulations_examen.id, Number(id)),
    });
    if (!existingSimulation) throw new Error("Simulation not found");

    // Mise à jour de la simulation
    await db.update(simulations_examen).set({
      nom,
      etat,
      duree,
      date,
      date_limite,
      questions,
      matiereId,
    }).where(eq(simulations_examen.id, Number(id)));
  },

  async deleteSimulation(id: string) {
    // Vérification si la simulation existe
    const existingSimulation = await db.query.simulations_examen.findFirst({
      where: eq(simulations_examen.id, Number(id)),
    });
    if (!existingSimulation) throw new Error("Simulation not found");

    // Suppression de la simulation
    await db.delete(simulations_examen).where(eq(simulations_examen.id, Number(id)));
  },
}