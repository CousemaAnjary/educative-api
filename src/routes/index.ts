import express from "express"
import { authMiddleware } from "../middleware/authMiddleware"
import { authRouter } from "./auth"
import { chapitreRouter } from "./chapitre"
import { exerciceRouter } from "./exercice"
import { exerciceResultatRouter } from "./exerciceResultat"
import { healthRouter } from "./health"
import { leconRouter } from "./lecon"
import { matiereRouter } from "./matiere"
import { simulationExamenRouter } from "./simulationExamen"
import { simulationExamenResultatRouter } from "./simulationExamenResultat"

const router = express.Router()

// Routes de santé
router.use("/health", healthRouter)
router.use("/auth", authRouter)
router.use("/matieres", authMiddleware, matiereRouter)
router.use("/chapitres", chapitreRouter)
router.use("/lecons", leconRouter)
router.use("/exercices", exerciceRouter)
router.use("/exercices-resultats", authMiddleware, exerciceResultatRouter)
router.use("/simulations-examens", simulationExamenRouter)
router.use("/simulations-examens-resultats", authMiddleware, simulationExamenResultatRouter)

export default router
