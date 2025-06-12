import { Router } from "express";
const router = Router();

// Importation des contrôleurs
const LeconController = require("../controllers/LeconController");

/**
 * @swagger
 * tags:
 *   - name: Leçons
 *     description: Gestion des leçons par chapitre
 */

/**
 * @swagger
 * /lecons:
 *   get:
 *     summary: Récupère toutes les leçons
 *     tags: [Leçons]
 *     responses:
 *       200:
 *         description: Liste des leçons récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", LeconController.getAllLecons);

/**
 * @swagger
 * /lecons:
 *   post:
 *     summary: Crée une nouvelle leçon
 *     tags: [Leçons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               etat:
 *                 type: string
 *                 example: "actif"
 *               contenu:
 *                 type: string
 *               chapitreId:
 *                 type: integer
 *             required:
 *               - titre
 *               - etat
 *               - contenu
 *               - chapitreId
 *     responses:
 *       201:
 *         description: Leçon créée avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/", LeconController.createLecon);

/**
 * @swagger
 * /lecons/leconChapitre/{chapitreId}:
 *   get:
 *     summary: Récupère toutes les leçons d'un chapitre spécifique
 *     tags: [Leçons]
 *     parameters:
 *       - in: path
 *         name: chapitreId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du chapitre
 *     responses:
 *       200:
 *         description: Liste des leçons récupérée avec succès
 *       404:
 *         description: Aucune leçon trouvée pour ce chapitre
 *       500:
 *         description: Erreur serveur
 */
router.get("/leconChapitre/:chapitreId", LeconController.getLeconsByChapitreId);

/**
 * @swagger
 * /lecons/{id}:
 *   get:
 *     summary: Récupère une leçon par ID
 *     tags: [Leçons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Leçon trouvée
 *       404:
 *         description: Leçon non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", LeconController.getLeconById);

/**
 * @swagger
 * /lecons/{id}:
 *   put:
 *     summary: Met à jour une leçon existante
 *     tags: [Leçons]
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
 *               titre:
 *                 type: string
 *               etat:
 *                 type: string
 *               contenu:
 *                 type: string
 *               chapitreId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Leçon mise à jour avec succès
 *       404:
 *         description: Leçon non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", LeconController.updateLecon);

/**
 * @swagger
 * /lecons/{id}:
 *   delete:
 *     summary: Supprime une leçon par ID
 *     tags: [Leçons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Leçon supprimée
 *       404:
 *         description: Leçon non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", LeconController.deleteLecon);

export const leconRouter = router;
