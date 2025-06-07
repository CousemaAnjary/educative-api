import express from "express";
import { healthRouter } from "./health";
import { authRouter } from "./auth";
import { matiereRouter } from "./matiere";
import { chapitreRouter } from "./chapitre";

const router = express.Router();

// Routes de santé
router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/matieres", matiereRouter);
router.use("/chapitres", chapitreRouter); 

export default router;
