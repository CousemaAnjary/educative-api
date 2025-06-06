import { Request, Response } from "express"
import { chapitreSchema } from "../schema/chapitreSchema"
import { ChapitreService } from "../services/ChapitreService"

module.exports = {
  async getAllChapitre(req: Request, res: Response) {
    try {
      const chapitres = await ChapitreService.getAllChapitre()
      return res.status(200).json({ success: true, chapitres: chapitres })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message })
      }
      // En cas d'erreur inattendue,
      return res
        .status(500)
        .json({ success: false, message: "Une erreur inconnue est survenue." })
    }
  },

  async createChapitre(req: Request, res: Response) {
    // Validation des données d'entrée (Zod)
        const validatedData = chapitreSchema.safeParse(req.body)
        if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 
    
    try {
      await ChapitreService.createChapitre(validatedData.data)
      return res.status(201).json({ success: true, message: "Chapitre créé avec succès" })
      
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async getChapitreById(req: Request, res: Response) {
    const chapitreId = req.params.id

    try {
      const chapitre = await ChapitreService.getChapitreById(chapitreId);
      if (!chapitre) return res.status(404).json({ success: false, message: "Chapitre non trouvé" })

      return res.status(200).json({ success: true, chapitre });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  },

  async updateChapitre(req: Request, res: Response) {
    // Validation des données d'entrée (Zod)
        const validatedData = chapitreSchema.safeParse(req.body)
        if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 
    
      
    try {
      const chapitreId = req.params.id;

       await ChapitreService.getChapitreById(chapitreId);
      return res.status(200).json({ success: true, message: "Chapitre mis à jour avec succès" });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  }
}
