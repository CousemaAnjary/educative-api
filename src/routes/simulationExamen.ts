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
 * /simulations-examens:
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
 * /simulations-examens/matiere/{id}:
 *   get:
 *     summary: Récupère toutes les simulations d'examen d'une matière
 *     tags: [Simulations d'examen]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la matière dont on veut récupérer les simulations d'examen
 *     responses:
 *       200:
 *         description: Liste des simulations d'examen de la matière récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 simulation:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nom:
 *                         type: string
 *                       etat:
 *                         type: string
 *                         enum: [brouillon, published, archived]
 *                       duree:
 *                         type: integer
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       date_limite:
 *                         type: string
 *                         format: date-time
 *                       questions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             enoncer:
 *                               type: string
 *                             options:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   label:
 *                                     type: string
 *                                   value:
 *                                     type: string
 *                                   correct:
 *                                     type: boolean
 *                       matiereId:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: Matière non trouvée ou aucune simulation associée
 *       500:
 *         description: Erreur serveur
 */
router.get("/matiere/:id", SimulationExamenController.getSimulationsExamenByMatiere);

/**
 * @swagger
 * /simulations-examens/{id}:
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
 * /simulations-examens/{id}:
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
