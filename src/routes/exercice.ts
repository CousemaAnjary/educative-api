import { Router } from "express";
const router = Router();

// Importation des contrôleurs
const ExerciceController = require("../controllers/ExerciceController")

router.get("/", ExerciceController.getAllExercices);
router.post("/", ExerciceController.createExercice);
router.get("/:id", ExerciceController.getExerciceById);
router.put("/:id", ExerciceController.updateExercice);
router.delete("/:id", ExerciceController.deleteExercice);


export const exerciceRouter = router;
