import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";

interface Person {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

const persons: Person[] = [];

const router = Router();

/**
 * @swagger
 * /auth/persons:
 *   get:
 *     summary: Récupère la liste des personnes
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Liste des personnes
 */
router.get("/persons", (req: Request, res: Response) => {
  res.json(persons);
});

/**
 * @swagger
 * /auth/persons:
 *   post:
 *     summary: Crée une nouvelle personne
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - fullName
 *               - email
 *               - role
 *     responses:
 *       201:
 *         description: Personne créée avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/persons", (req: Request, res: Response) => {
  const person: Person = {
    id: uuid(),
    ...req.body,
  };
  persons.push(person);
  res.status(201).json(person);
});

/**
 * @swagger
 * /auth/persons/{id}:
 *   get:
 *     summary: Récupère une personne par son ID
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Personne trouvée
 *       404:
 *         description: Personne non trouvée
 */
router.get("/persons/:id", (req: Request, res: Response) => {
  const person = persons.find((p) => p.id === req.params.id);
  if (!person) {
    res.status(404).send("Personne non trouvée");
  } else {
    res.json(person);
  }
});

/**
 * @swagger
 * /auth/persons/{id}:
 *   put:
 *     summary: Met à jour une personne par son ID
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Personne mise à jour avec succès
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Personne non trouvée
 */
router.put("/persons/:id", (req: Request, res: Response) => {
  const person = persons.find((p) => p.id === req.params.id);
  if (!person) {
    res.status(404).send("Personne non trouvée");
  } else {
    Object.assign(person, req.body);
    res.json(person);
  }
});

/**
 * @swagger
 * /auth/persons/{id}:
 *   delete:
 *     summary: Supprime une personne par son ID
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Personne supprimée avec succès
 *       404:
 *         description: Personne non trouvée
 */
router.delete("/persons/:id", (req: Request, res: Response) => {
  const index = persons.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    res.status(404).send("Personne non trouvée");
  } else {
    persons.splice(index, 1);
    res.json({ message: "Personne supprimée avec succès" });
  }
});

export const authRouter = router;
