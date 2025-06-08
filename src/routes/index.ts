import express from "express";
import { healthRouter } from "./health";
import { authRouter } from "./auth";
import { matiereRouter } from "./matiere";
import { chapitreRouter } from "./chapitre";
import { leconRouter } from "./lecon";

const router = express.Router();

// Routes de santé
router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/matieres", matiereRouter);
router.use("/chapitres", chapitreRouter); 
router.use("/lecons", leconRouter)

export default router;
