import { Request, Response } from "express"
import { exerciceResultatSchema } from "../schema/exerciceResultatSchema"
import { ExerciceResulatSercice } from "../services/ExerciceResultatSercice"

module.exports = {
  async getAllExerciceResultats(req: Request, res: Response) {
    try {
      // Appel au service pour récupérer tous les résultats d'exercices
      const results = await ExerciceResulatSercice.getAllExerciceResultats();
      return res.status(200).json({ success: true, results });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async createExerciceResultat(req: Request, res: Response) {
  // Validation des données d'entrée (Zod)
    const validatedData = exerciceResultatSchema.safeParse(req.body)
    if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 
    
    try {
      const userId = req.user?.id; // Assurez-vous que l'utilisateur est authentifié et que son ID est disponible
      if (!userId) {
        return res.status(400).json({ success: false, message: "L'ID utilisateur est requis." });
      }

      // Appel au service pour créer le résultat de l'exercice
      const result = await ExerciceResulatSercice.createExerciceResultat(userId, validatedData.data);
      return res.status(200).json({ success: true, message: "Résultat de l'exercice créé avec succès", result });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }

  },

  async getExerciceResultatById(req: Request, res: Response) {
    const resultId = req.params.id;

    try {
      // Appel au service pour récupérer le résultat de l'exercice par ID
      const result = await ExerciceResulatSercice.getExerciceResultatById(resultId);
      if (!result) return res.status(404).json({ success: false, message: "Résultat d'exercice non trouvé" });

      return res.status(200).json({ success: true, result });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async updateExerciceResultat(req: Request, res: Response) {},

  async deleteExerciceResultat(req: Request, res: Response) {},
}
