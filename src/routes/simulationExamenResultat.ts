import { Router } from "express"
const router = Router()

// Importation du contrôleur
const SimulationExamenResultatController = require("../controllers/SimulationExamenResultatController")

router.get("/", SimulationExamenResultatController.getAllSimulationsExamenResultat)
router.post("/", SimulationExamenResultatController.createSimulationExamenResultat)
router.get("/:id", SimulationExamenResultatController.getSimulationExamenResultatById)



export const simulationExamenResultatRouter = router
