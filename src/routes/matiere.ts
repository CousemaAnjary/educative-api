import { Router } from "express";
const router = Router();

// Impodes cortation ntrôleurs
const MatiereController = require("../controllers/MatiereController");

/**
 * @swagger
 * tags:
 *   - name: Matières
 *     description: Gestion des matières scolaires
 */

/**
 * @swagger
 * /matieres:
 *   get:
 *     summary: Récupère la liste de toutes les matières
 *     tags: [Matières]
 *     responses:
 *       200:
 *         description: Liste des matières
 */
router.get("/", MatiereController.getAllMatiere);

/**
 * @swagger
 * /matieres:
 *   post:
 *     summary: Crée une nouvelle matière
 *     tags: [Matières]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               niveau:
 *                 type: string
 *               description:
 *                 type: string
 *               etat:
 *                 type: string
 *                 enum: [actif, inactif]
 *             required:
 *               - nom
 *               - niveau
 *               - etat
 *     responses:
 *       201:
 *         description: Matière créée avec succès
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Matière déjà existante
 *       500:
 *         description: Erreur serveur
 */
router.post("/", MatiereController.createMatiere);

/**
 * @swagger
 * /matieres/{id}:
 *   get:
 *     summary: Récupère une matière par son ID
 *     tags: [Matières]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Matière trouvée
 *       404:
 *         description: Matière non trouvée
 */
router.get("/:id", MatiereController.getMatiereById);

/**
 * @swagger
 * /matieres/{id}:
 *   put:
 *     summary: Met à jour une matière existante
 *     tags: [Matières]
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
 *               niveau:
 *                 type: string
 *               description:
 *                 type: string
 *               etat:
 *                 type: string
 *                 enum: [actif, inactif]
 *     responses:
 *       200:
 *         description: Matière mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Matière non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", MatiereController.updateMatiere);

/**
 * @swagger
 * /matieres/{id}:
 *   delete:
 *     summary: Supprime une matière par ID
 *     tags: [Matières]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Matière supprimée
 *       404:
 *         description: Matière non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", MatiereController.deleteMatiere);

export const matiereRouter = router;
