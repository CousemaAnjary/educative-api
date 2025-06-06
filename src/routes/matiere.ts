import { Router } from "express"
const router = Router()

// Importation des contrôleurs
const MatiereController = require("../controllers/MatiereController")


router.get("/", MatiereController.getAllMatiere)
router.post("/", MatiereController.createMatiere)
router.get("/:id", MatiereController.getMatiereById)
router.put("/:id", MatiereController.updateMatiere)


export const matiereRouter = router
