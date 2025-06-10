import { Request, Response } from "express"
import { simulationExamenSchema } from "../schema/simulationExamen"
import { SimulationExamenService } from "../services/SimulationExamenService"

module.exports = {
  async getAllSimulationsExamen(req: Request, res: Response) {
    try {
      // Récupération de toutes les simulations d'examen
      const simulationsList = await SimulationExamenService.getAllSimulations();
      return res.status(200).json({ success: true, simulations: simulationsList });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async createSimulationExamen(req: Request, res: Response) {
    // Validation des données d'entrée (Zod)
            const validatedData = simulationExamenSchema.safeParse(req.body)
            if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 

    try {
      await SimulationExamenService.createSimulation(validatedData.data);
      return res.status(201).json({ success: true, message: "Simulation created successfully" });

    }
    catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async getSimulationExamenById(req: Request, res: Response) {
    const simulationId = req.params.id;

    try {
      const simulation = await SimulationExamenService.getSimulationById(simulationId);
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

  async updateSimulationExamen(req: Request, res: Response) {
    // Validation des données d'entrée (Zod)
    const validatedData = simulationExamenSchema.safeParse(req.body);
    if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() });

    const simulationId = req.params.id;

    try {
      await SimulationExamenService.updateSimulation(simulationId, validatedData.data);
      return res.status(200).json({ success: true, message: "Simulation updated successfully" });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async deleteSimulationExamen(req: Request, res: Response) {
    const simulationId = req.params.id;

    try {
      await SimulationExamenService.deleteSimulation(simulationId);
      return res.status(200).json({ success: true, message: "Simulation deleted successfully" });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },
}
