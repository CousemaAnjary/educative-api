import db from "../db/drizzle";
import { lecons } from "../db/schema";
import { eq } from "drizzle-orm";
import { leconSchema } from "../schema/leconSchema";
import { z } from "zod";

export const LeconService = {
  // Méthode pour créer une leçon
  async createLecon(data: z.infer<typeof leconSchema>) {
    // Destructuration des données validées
    const { titre, contenu, chapitreId, etat } = data;

    // Vérification si la leçon existe déjà
    const existingLecon = await db.query.lecons.findFirst({
      where: eq(lecons.titre, titre),
    });
    if (existingLecon) throw new Error("Leçon already exists");

    // Insertion de la leçon
    await db.insert(lecons).values({
      titre,
      contenu,
      chapitreId,
      etat,
    });

  },

  // Méthode pour récupérer toutes les leçons
  async getAllLecons() {
    // Récupération de toutes les leçons
    const leconsList = await db.query.lecons.findMany();
    return leconsList;
  },

  // Méthode pour récupérer une leçon par son ID
  async getLeconById(id: string) {
    // Recherche de la leçon par ID
    const lecon = await db.query.lecons.findFirst({
      where: eq(lecons.id, Number(id)),
    });
    if (!lecon) throw new Error("Leçon not found");

    return lecon;

  },

  async getLeconsByChapitreId(chapitreId: string) {
    const leconsList = await db.query.lecons.findMany({
      where: eq(lecons.chapitreId, Number(chapitreId)),
  })
  
    return leconsList;
  },

  // Méthode pour mettre à jour une leçon
  async updateLecon(id: string, data: z.infer<typeof leconSchema>) {

    // Destructuration des données validées
    const { titre, contenu, chapitreId, etat } = data;

    // Vérification si la leçon existe
    const existingLecon = await db.query.lecons.findFirst({ where: eq(lecons.id, Number(id)) });
    if (!existingLecon) throw new Error("Leçon not found");

    // Mise à jour de la leçon
    await db.update(lecons).set({
      titre,
      contenu,
      chapitreId,
      etat,
    }).where(eq(lecons.id, Number(id)));
  },

  // Méthode pour supprimer une leçon
  async deleteLecon(id: string) {
    // Vérification si la leçon existe
    const existingLecon = await db.query.lecons.findFirst({ where: eq(lecons.id, Number(id)) });
    if (!existingLecon) throw new Error("Leçon not found");

    // Suppression de la leçon
    await db.delete(lecons).where(eq(lecons.id, Number(id)));
  },
}
