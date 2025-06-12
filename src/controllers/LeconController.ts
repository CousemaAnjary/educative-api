import { Request, Response } from "express";
import { leconSchema } from "../schema/leconSchema";
import { LeconService } from "../services/LeconService";


module.exports = {

  async getAllLecons(req: Request, res: Response) {
    try {
      const lecons = await LeconService.getAllLecons();
      return res.status(200).json({ success: true, lecons: lecons });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async createLecon(req: Request, res: Response) {
  // Validation des données d'entrée (Zod)
    const validatedData = leconSchema.safeParse(req.body)
    if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 

      try {
        await LeconService.createLecon(validatedData.data)
        return res.status(201).json({ success: true, message: "Leçon créée avec succès" });

      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ success: false, message: error.message });
        }
        // En cas d'erreur inattendue,
        return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
      }

  },

  async getLeconById(req: Request, res: Response) {
    const leconId = req.params.id 

    try {
      const lecon = await LeconService.getLeconById(leconId);
      if (!lecon) return res.status(404).json({ success: false, message: "Leçon non trouvée" })
        
      return res.status(200).json({ success: true, lecon });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async getLeconsByChapitreId(req: Request, res: Response) {
    const chapitreId = req.params.chapitreId;
  
    try {
      const lecons = await LeconService.getLeconsByChapitreId(chapitreId);
  
      if (!lecons || lecons.length === 0) {
        return res.status(404).json({ success: false, message: "Aucune leçon trouvée pour ce chapitre" });
      }
  
      return res.status(200).json({ success: true, lecons });
  
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },
  

  async updateLecon(req: Request, res: Response) {
    // Validation des données d'entrée (Zod)
    const validatedData = leconSchema.safeParse(req.body)
    if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 

    const leconId = req.params.id 

    try {
      await LeconService.updateLecon(leconId, validatedData.data);
      return res.status(200).json({ success: true, message: "Leçon mise à jour avec succès" });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async deleteLecon(req: Request, res: Response) {
    const leconId = req.params.id 

    try {
      await LeconService.deleteLecon(leconId);
      return res.status(200).json({ success: true, message: "Leçon supprimée avec succès" });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },
} 