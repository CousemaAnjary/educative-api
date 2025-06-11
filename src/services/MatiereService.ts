import { eq } from "drizzle-orm";
import { z } from "zod";
import db from "../db/drizzle";
import { matieres, users } from "../db/schema";
import { matiereSchema } from "../schema/matiereSchema";

export const MatiereService = {
  async getAllMatieres() {
    return await db.query.matieres.findMany();
  },

  async createMatiere(data: z.infer<typeof matiereSchema>) {
    const { nom, niveau, description, etat } = data;

    const existing = await db.query.matieres.findFirst({
      where: eq(matieres.nom, nom),
    });
    if (existing) throw new Error("La matière existe déjà.");

    await db.insert(matieres).values({ nom, niveau, description, etat });
  },

  async getMatiereById(id: string) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new Error("ID de matière invalide.");
    }

    const matiere = await db.query.matieres.findFirst({
      where: eq(matieres.id, parsedId),
    });

    if (!matiere) throw new Error("Matière introuvable.");
    return matiere;
  },

  async getMatieresByUserId(userId: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) throw new Error("Utilisateur introuvable.");

    const matieresList = await db.query.matieres.findMany({
      where: eq(matieres.niveau, user.niveau),
    });

    return matieresList;
  },

  async updateMatiere(id: string, data: z.infer<typeof matiereSchema>) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new Error("ID de matière invalide.");
    }

    const existing = await db.query.matieres.findFirst({
      where: eq(matieres.id, parsedId),
    });

    if (!existing) throw new Error("Matière introuvable.");

    await db.update(matieres).set({
      nom: data.nom,
      niveau: data.niveau,
      description: data.description,
      etat: data.etat,
    }).where(eq(matieres.id, parsedId));
  },

  async deleteMatiere(id: string) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new Error("ID de matière invalide.");
    }

    const existing = await db.query.matieres.findFirst({
      where: eq(matieres.id, parsedId),
    });

    if (!existing) throw new Error("Matière introuvable.");

    await db.delete(matieres).where(eq(matieres.id, parsedId));
  }
};
