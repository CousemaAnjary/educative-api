import db from "../db/drizzle";
import { Request, Response } from "express";
import { exerciceSchema } from "../schema/exerciceSchema";
import { exerciceService } from "../services/ExerciceService";


module.exports = {

  async getAllExercices(req: Request, res: Response) {
    // Logique pour récupérer tous les exercices
    try {
      // Exemple de récupération des exercices depuis une base de données
      const exercices = await db.query.exercices.findMany({
        with: {
          lecon: true, // Inclure les leçons associées
        },
      });
      res.status(200).json(exercices);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des exercices" });
    }
  },
  
  async createExercice(req: Request, res: Response) {
    // Validation des données d'entrée (Zod)
        const validatedData = exerciceSchema.safeParse(req.body)
        if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 

    try {
           await exerciceService.createExercice(validatedData.data)
           return res.status(201).json({ success: true, message: "Exercice créée avec succès" });
   
         } catch (error) {
           if (error instanceof Error) {
             return res.status(400).json({ success: false, message: error.message });
           }
           // En cas d'erreur inattendue,
           return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
         }
      
  },

  async getExercicesByMatiere(req: Request, res: Response) {
    const matiereId = req.params.id;

    try {
      const exercice = await exerciceService.getExercicesByMatiere(matiereId);
      if (!exercice) return res.status(404).json({ success: false, message: "Exercice non trouvé" });

      return res.status(200).json({ success: true, exercice });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async getExerciceById(req: Request, res: Response) {
    const exerciseId = req.params.id;

    try {
      const exercice = await exerciceService.getExerciceById(exerciseId);
      if (!exercice) return res.status(404).json({ success: false, message: "Exercice non trouvé" });

      return res.status(200).json({ success: true, exercice });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async updateExercice(req: Request, res: Response) {
    // Validation des données d'entrée (Zod)
    const validatedData = exerciceSchema.safeParse(req.body);
    if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() });

    const exerciseId = req.params.id;

    try {
      await exerciceService.updateExercice(exerciseId, validatedData.data);
      return res.status(200).json({ success: true, message: "Exercice mis à jour avec succès" });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async deleteExercice(req: Request, res: Response) {
    const exerciseId = req.params.id;

    try {
      await exerciceService.deleteExercice(exerciseId);
      return res.status(200).json({ success: true, message: "Exercice supprimé avec succès" });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  }

}