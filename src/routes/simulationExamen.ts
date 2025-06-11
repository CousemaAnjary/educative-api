import { Router } from "express"
const router = Router()

// Importation du contrôleur
const SimulationExamenController = require("../controllers/SimulationExamenController")

/**
 * @swagger
 * tags:
 *   - name: Simulations d'examen
 *     description: Gestion des simulations d'examen
 */

/**
 * @swagger
 * /simulations:
 *   get:
 *     summary: Récupère toutes les simulations d'examen
 *     tags: [Simulations d'examen]
 *     responses:
 *       200:
 *         description: Liste des simulations récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", SimulationExamenController.getAllSimulationsExamen)

/**
 * @swagger
 * /simulations:
 *   post:
 *     summary: Crée une nouvelle simulation d'examen
 *     tags: [Simulations d'examen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               etat:
 *                 type: string
 *               duree:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date-time
 *               date_limite:
 *                 type: string
 *                 format: date-time
 *               matiereId:
 *                 type: integer
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
 *             required:
 *               - nom
 *               - etat
 *               - duree
 *               - date
 *               - date_limite
 *               - matiereId
 *               - questions
 *     responses:
 *       201:
 *         description: Simulation créée avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/", SimulationExamenController.createSimulationExamen)

/**
 * @swagger
 * /simulations/{id}:
 *   get:
 *     summary: Récupère une simulation d'examen par ID
 *     tags: [Simulations d'examen]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Simulation trouvée
 *       404:
 *         description: Simulation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", SimulationExamenController.getSimulationExamenById)

/**
 * @swagger
 * /simulations/{id}:
 *   put:
 *     summary: Met à jour une simulation d'examen
 *     tags: [Simulations d'examen]
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
 *             $ref: '#/components/schemas/Simulation'
 *     responses:
 *       200:
 *         description: Simulation mise à jour
 *       404:
 *         description: Simulation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", SimulationExamenController.updateSimulationExamen)

/**
 * @swagger
 * /simulations/{id}:
 *   delete:
 *     summary: Supprime une simulation d'examen
 *     tags: [Simulations d'examen]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Simulation supprimée
 *       404:
 *         description: Simulation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", SimulationExamenController.deleteSimulationExamen)

export const simulationExamenRouter = router
