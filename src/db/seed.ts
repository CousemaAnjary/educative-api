import db from "./drizzle";
import { roles } from "./schema/roles";


async function seed() {
  await db.insert(roles).values([
    { name: "admin" },
    { name: "enseignant" },
    { name: "eleve" },
  ]).onConflictDoNothing(); // évite l'erreur si déjà inséré

  console.log("Rôles insérés avec succès !");
}

seed().catch((e) => {
  console.error("Erreur lors du seed :", e);
});
