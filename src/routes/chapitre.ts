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
 * /chapitres/matiere/{id}:
 *   get:
 *     summary: Récupère tous les chapitres d'une matière
 *     tags: [Chapitres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la matière dont on veut récupérer les chapitres
 *     responses:
 *       200:
 *         description: Liste des chapitres de la matière récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 chapitres:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nom:
 *                         type: string
 *                       description:
 *                         type: string
 *                       etat:
 *                         type: string
 *                       matiereId:
 *                         type: integer
 *       404:
 *         description: Matière non trouvée ou aucun chapitre associé
 *       500:
 *         description: Erreur serveur
 */
router.get("/matiere/:id", ChapitreController.getChapitresByMatiere);

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
 *   patch:
 *     summary: Met à jour partiellement un chapitre (par exemple son état)
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
 *               etat:
 *                 type: string
 *             required:
 *               - etat
 *     responses:
 *       200:
 *         description: Chapitre mis à jour partiellement
 *       404:
 *         description: Chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.patch("/:id", ChapitreController.updateChapitreEtat);

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
