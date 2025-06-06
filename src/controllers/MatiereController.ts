import { Request, Response } from "express"
import { matiereSchema } from "../schema/matiereSchema"
import { MatiereService } from "../services/MatiereService"


module.exports = {
  async getAllMatiere(req: Request, res: Response) {
    try {
      const matieres = await MatiereService.getAllMatieres()
      return res.status(200).json({ success: true, data: matieres })

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message })
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." })
    }
  },

  async createMatiere(req: Request, res: Response) {
    // Validation des données d'entrée (Zod)
    const validatedData = matiereSchema.safeParse(req.body)
    if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 

    try {
      await MatiereService.createMatiere(validatedData.data)
      return res.status(201).json({ success: true, message: "Matière créée avec succès" });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      // En cas d'erreur inattendue,
      return res.status(500).json({ success: false, message: "Une erreur inconnue est survenue." });
    }
  }


}