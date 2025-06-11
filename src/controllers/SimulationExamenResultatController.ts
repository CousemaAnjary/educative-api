import { Request, Response } from "express";
import { SimulationExamenResultatService } from "../services/SimulationExamenResulatService";
import { simulationExamenResultatSchema } from "../schema/simulationExamenResultat";


module.exports = {
  async getAllSimulationsExamenResultat(req: Request, res: Response) {
    try {
      // Récupération de toutes les résultats de simulations d'examen
      const simulationsList = await SimulationExamenResultatService.getAllSimulationResultats();
      return res.status(200).json({ success: true, simulations: simulationsList });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async createSimulationExamenResultat(req: Request, res: Response) {
    // Validation des données d'entrée (Zod)
    const validatedData = simulationExamenResultatSchema.safeParse(req.body);
    if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 

    try {
      const userId = req.user?.id; // Assurez-vous que l'utilisateur est authentifié et que son ID est disponible
      if (!userId) {
        return res.status(400).json({ success: false, message: "L'ID utilisateur est requis." });
      }

      await SimulationExamenResultatService.createSimulationResultat(userId, validatedData.data);
      return res.status(201).json({ success: true, message: "Simulation created successfully" });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async getSimulationExamenResultatById(req: Request, res: Response) {
    const simulationId = req.params.id;

    try {
      const simulation = await SimulationExamenResultatService.getSimulationResultatById(simulationId);
      if (!simulation) return res.status(404).json({ success: false, message: "Simulation not found" });

      return res.status(200).json({ success: true, simulation });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },
    // Validation des
}