import express from "express"
import { authRouter } from "./auth"
import { chapitreRouter } from "./chapitre"
import { exerciceRouter } from "./exercice"
import { healthRouter } from "./health"
import { leconRouter } from "./lecon"
import { matiereRouter } from "./matiere"

const router = express.Router()

// Routes de santé
router.use("/health", healthRouter)
router.use("/auth", authRouter)
router.use("/matieres", matiereRouter)
router.use("/chapitres", chapitreRouter)
router.use("/lecons", leconRouter)
router.use("/exercices", exerciceRouter)

export default router
