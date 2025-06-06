import { Router } from "express"
const router = Router()

// Importation des contrôleurs
const ChapitreController = require("../controllers/ChapitreController")

router.get("/", ChapitreController.getAllChapitre);
router.post("/", ChapitreController.createChapitre);
// router.get("/:id", ChapitreController.getChapitreById);
// router.put("/:id", ChapitreController.updateChapitre);
// router.delete("/:id", ChapitreController.deleteChapitre);

export const chapitreRouter = router
