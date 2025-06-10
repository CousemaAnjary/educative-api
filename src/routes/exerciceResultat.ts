import { Router } from "express";
const router = Router();

// Importation des contrôleurs
const ExerciceResultatController = require("../controllers/ExerciceResultatController");

/**
 * @swagger
 * tags:
 *   - name: Résultats Exercices
 *     description: Gestion des résultats des exercices
 */

/**
 * @swagger
 * /exercices-resultats:
 *   get:
 *     summary: Récupère tous les résultats d'exercices
 *     tags: [Résultats Exercices]
 *     responses:
 *       200:
 *         description: Liste des résultats récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", ExerciceResultatController.getAllExerciceResultats);

/**
 * @swagger
 * /exercices-resultats:
 *   post:
 *     summary: Soumet un résultat pour un exercice
 *     tags: [Résultats Exercices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exerciceId
 *               - reponses
 *               - date_de_soumission
 *             properties:
 *               exerciceId:
 *                 type: integer
 *                 example: 8
 *               reponses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - selected
 *                   properties:
 *                     selected:
 *                       type: string
 *                       example: "A"
 *               date_de_soumission:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-06T12:30:00Z"
 *     responses:
 *       201:
 *         description: Résultat soumis avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       409:
 *         description: Résultat déjà existant pour cet utilisateur et cet exercice
 *       500:
 *         description: Erreur serveur
 */
router.post("/", ExerciceResultatController.createExerciceResultat);

/**
 * @swagger
 * /exercices-resultats/{id}:
 *   get:
 *     summary: Récupère un résultat d'exercice par ID
 *     tags: [Résultats Exercices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Résultat trouvé
 *       404:
 *         description: Résultat non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", ExerciceResultatController.getExerciceResultatById);

export const exerciceResultatRouter = router;
