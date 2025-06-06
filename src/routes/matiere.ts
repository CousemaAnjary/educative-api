import { Router } from "express"
const router = Router()

// Importation des contrôleurs
const MatiereController = require("../controllers/MatiereController")


router.get("/", MatiereController.getAllMatiere)

export const matiereRouter = router
