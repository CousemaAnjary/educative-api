import express, { Request, Response } from "express";

const router = express.Router();

/**
 * Ce endpoint répond à une requête GET sur la route /health
 * Il renvoie un objet JSON qui contient 3 propriétés :
 * - status : une chaîne de caractères qui indique que le serveur est en bon état
 * - timestamp : une date au format ISO qui correspond au moment où la réponse a été générée
 * - environment : une chaîne de caractères qui indique l'environnement dans lequel le serveur est lancé (par exemple, "development" ou "production")
 */
router.get("/", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});


export const healthRouter = router;

