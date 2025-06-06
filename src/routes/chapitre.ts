import { Router } from "express";
const router = Router();

// Importation des contrôleurs
const ChapitreController = require("../controllers/ChapitreController");

/**
 * @swagger
 * tags:
 *   - name: Chapitres
 *     description: Gestion des chapitres
 */

/**
 * @swagger
 * /chapitres:
 *   get:
 *     summary: Récupère tous les chapitres
 *     tags: [Chapitres]
 *     responses:
 *       200:
 *         description: Liste des chapitres récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", ChapitreController.getAllChapitre);

/**
 * @swagger
 * /chapitres:
 *   post:
 *     summary: Crée un nouveau chapitre
 *     tags: [Chapitres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *               etat:
 *                 type: string
 *               matiereId:
 *                 type: integer
 *             required:
 *               - nom
 *               - etat
 *               - matiereId
 *     responses:
 *       201:
 *         description: Chapitre créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/", ChapitreController.createChapitre);

/**
 * @swagger
 * /chapitres/{id}:
 *   get:
 *     summary: Récupère un chapitre par ID
 *     tags: [Chapitres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chapitre trouvé
 *       404:
 *         description: Chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", ChapitreController.getChapitreById);

/**
 * @swagger
 * /chapitres/{id}:
 *   put:
 *     summary: Met à jour un chapitre
 *     tags: [Chapitres]
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
 *               description:
 *                 type: string
 *               etat:
 *                 type: string
 *               matiereId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Chapitre mis à jour
 *       404:
 *         description: Chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", ChapitreController.updateChapitre);

/**
 * @swagger
 * /chapitres/{id}:
 *   delete:
 *     summary: Supprime un chapitre
 *     tags: [Chapitres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chapitre supprimé
 *       404:
 *         description: Chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", ChapitreController.deleteChapitre);

export const chapitreRouter = router;
