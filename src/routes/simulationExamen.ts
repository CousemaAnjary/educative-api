import { Router } from "express"
const router = Router()


const SimulationExamenController = require("../controllers/SimulationExamenController");

router.get("/", SimulationExamenController.getAllSimulationsExamen);
router.post("/", SimulationExamenController.createSimulationExamen);
router.get("/:id", SimulationExamenController.getSimulationExamenById);
router.put("/:id", SimulationExamenController.updateSimulationExamen);
router.delete("/:id", SimulationExamenController.deleteSimulationExamen);


export const simulationExamenRouter = router
