import db from "../db/drizzle";
import { matiereSchema } from "../schema/matiereSchema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { matieres } from "../db/schema";


export const MatiereService = {
  async getAllMatieres()  {

    // Récupération de toutes les matières
    const matieresList = await db.query.matieres.findMany();
    return matieresList;
   },

  async createMatiere(data: z.infer<typeof matiereSchema>) {
    // Destructuration des données validées
    const { nom, niveau, description, etat } = data;

    // Vérification si la matière existe déjà
    const existingMatiere = await db.query.matieres.findFirst({ where: eq(matieres.nom, nom) });
    if (existingMatiere) throw new Error("Matière already exists");

    // Insertion de la matière
    await db.insert(matieres).values({
      nom,
      niveau,
      description,
      etat,
    });
  },

  async getMatiereById(id: string) {
    // Recherche de la matière par ID
    const matiere = await db.query.matieres.findFirst({ where: eq(matieres.id, Number(id)) });
    if (!matiere) throw new Error("Matière not found")
      
    return matiere
  }

 }