import { Router } from "express";
const router = Router();

// Importation des contrôleurs
const ExerciceController = require("../controllers/ExerciceController");

/**
 * @swagger
 * tags:
 *   - name: Exercices
 *     description: Gestion des exercices
 */

/**
 * @swagger
 * /exercices:
 *   get:
 *     summary: Récupère tous les exercices
 *     tags: [Exercices]
 *     responses:
 *       200:
 *         description: Liste des exercices récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", ExerciceController.getAllExercices);

/**
 * @swagger
 * /exercices:
 *   post:
 *     summary: Crée un nouvel exercice
 *     tags: [Exercices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - questions
 *               - etat
 *               - leconId
 *             properties:
 *               nom:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     enoncer:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           value:
 *                             type: string
 *                           correct:
 *                             type: boolean
 *               etat:
 *                 type: string
 *               leconId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Exercice créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/", ExerciceController.createExercice);

/**
 * @swagger
 * /exercices/{id}:
 *   get:
 *     summary: Récupère un exercice par ID
 *     tags: [Exercices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exercice trouvé
 *       404:
 *         description: Exercice non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", ExerciceController.getExerciceById);

/**
 * @swagger
 * /exercices/matiere/{id}:
 *   get:
 *     summary: Récupère tous les exercices d'une matière
 *     tags: [Exercices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la matière dont on veut récupérer les exercices
 *     responses:
 *       200:
 *         description: Liste des exercices de la matière récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 exercices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nom:
 *                         type: string
 *                       questions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             enoncer:
 *                               type: string
 *                               description: L'énoncé de la question
 *                             options:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   label:
 *                                     type: string
 *                                     description: Texte de l'option affiché à l'utilisateur
 *                                   value:
 *                                     type: string
 *                                     description: Valeur associée à l'option
 *                                   correct:
 *                                     type: boolean
 *                                     description: Indique si cette option est la réponse correcte
 *                       etat:
 *                         type: string
 *                         enum: [brouillon, published, archived]
 *                       leconId:
 *                         type: integer
 *       404:
 *         description: Matière non trouvée ou aucun exercice associé
 *       500:
 *         description: Erreur serveur
 */
router.get("/matiere/:id", ExerciceController.getExercicesByMatiere);

/**
 * @swagger
 * /exercices/{id}:
 *   put:
 *     summary: Met à jour un exercice
 *     tags: [Exercices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               questions:
 *                 type: array
 *               etat:
 *                 type: string
 *               leconId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Exercice mis à jour
 *       404:
 *         description: Exercice non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", ExerciceController.updateExercice);

/**
 * @swagger
 * /exercices/{id}:
 *   delete:
 *     summary: Supprime un exercice
 *     tags: [Exercices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exercice supprimé
 *       404:
 *         description: Exercice non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", ExerciceController.deleteExercice);

export const exerciceRouter = router;
