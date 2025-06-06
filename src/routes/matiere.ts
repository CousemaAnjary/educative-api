import { Router } from "express"
const router = Router()

// Importation des contrôleurs
const MatiereController = require("../controllers/MatiereController")


router.get("/", MatiereController.getAllMatiere)
router.post("/", MatiereController.createMatiere)


export const matiereRouter = router
