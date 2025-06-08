import { Router } from "express";
const router = Router();

// Importation des contrôleurs
const ExerciceResultatController = require("../controllers/ExerciceResultatController");

router.get("/", ExerciceResultatController.getAllExerciceResultats);
router.post("/", ExerciceResultatController.createExerciceResultat);
router.get("/:id", ExerciceResultatController.getExerciceResultatById);


export const exerciceResultatRouter = router;
