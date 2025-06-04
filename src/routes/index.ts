import express from "express";
import { healthRouter } from "./health";
import { authRouter } from "./auth";

const router = express.Router();

// Routes de santé
router.use("/health", healthRouter);
router.use("/auth", authRouter);

export default router;
