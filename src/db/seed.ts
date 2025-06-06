import { eq } from "drizzle-orm";
import db from "./drizzle";
import bcrypt from "bcrypt";
import { roles } from "./schema/roles";
import { users } from "./schema/users";
import { matieres } from "./schema/matieres";
import { chapitres } from "./schema/chapitres";
import { lecons } from "./schema/lecons";
import { exercices } from "./schema/exercices";
import { exercices_resultats } from "./schema/exercices_resultats";

async function seed() {
  // ---------------------- ROLES ----------------------
  await db.insert(roles).values([
    { name: "admin" },
    { name: "enseignant" },
    { name: "eleve" },
  ]).onConflictDoNothing();
  console.log("✅ Rôles insérés");

  // ---------------------- UTILISATEUR TEST ----------------------

  const hashedPassword = await bcrypt.hash("123456789", 10);

  const testUser = {
    name: "Test Élève",
    email: "eleve@test.com",
    password:hashedPassword,
    roleId: 3, // ⚠️ attention à l'id réel de 'eleve'
    image: null,
  };

  const [user] = await db.insert(users)
    .values(testUser)
    .onConflictDoNothing()
    .returning();

  const currentUser = user ?? await db.query.users.findFirst({
    where: eq(users.email, testUser.email),
  });

  if (user) {
    console.log("✅ Utilisateur élève inséré");
  } else {
    console.log("⚠️ Utilisateur élève déjà présent");
  }

  // ---------------------- MATIÈRE ----------------------
  const matiereData = {
    nom: "Mathématiques",
    niveau: "Terminale",
    description: "Cours complet de mathématiques",
    etat: "actif",
  };

  const [matiere] = await db.insert(matieres)
    .values(matiereData)
    .onConflictDoNothing()
    .returning();

  const currentMatiere = matiere ?? await db.query.matieres.findFirst({
    where: eq(matieres.nom, matiereData.nom),
  });

  console.log(`📘 Matière : ${currentMatiere?.nom}`);

  // ---------------------- CHAPITRE ----------------------
  const chapitreData = {
    nom: `Introduction à ${currentMatiere.nom}`,
    etat: "actif",
    description: `Chapitre introductif de la matière ${currentMatiere.nom}`,
    matiereId: currentMatiere.id,
  };

  const [chapitre] = await db.insert(chapitres)
    .values(chapitreData)
    .onConflictDoNothing()
    .returning();

  const currentChapitre = chapitre ?? await db.query.chapitres.findFirst({
    where: eq(chapitres.nom, chapitreData.nom),
  });

  // ---------------------- LECON ----------------------
  const leconData = {
    titre: `Première leçon de ${currentMatiere.nom}`,
    etat: "actif",
    contenu: `Contenu de la première leçon en ${currentMatiere.nom}`,
    chapitreId: currentChapitre.id,
  };

  const [lecon] = await db.insert(lecons)
    .values(leconData)
    .onConflictDoNothing()
    .returning();

  const currentLecon = lecon ?? await db.query.lecons.findFirst({
    where: eq(lecons.titre, leconData.titre),
  });

  // ---------------------- EXERCICE (QCM) ----------------------
  const exerciceData = {
    nom: `QCM - Résolution d'équation`,
    etat: "actif",
    questions: JSON.stringify([
      {
        question: "Résous l'équation : 2x + 5 = 13",
        options: [
          { label: "A", value: "x = 4", correct: true },
          { label: "B", value: "x = 6", correct: false },
          { label: "C", value: "x = 8", correct: false },
          { label: "D", value: "x = 2", correct: false },
        ]
      }
    ]),
    leconId: currentLecon.id,
  };

  const [exercice] = await db.insert(exercices)
    .values(exerciceData)
    .onConflictDoNothing()
    .returning();

  const currentExercice = exercice ?? await db.query.exercices.findFirst({
    where: eq(exercices.nom, exerciceData.nom),
  });

  // ---------------------- EXERCICES_RÉSULTATS ----------------------
  await db.insert(exercices_resultats).values({
    userId: currentUser.id,
    exerciceId: currentExercice.id,
    score: 10,
    reponses: JSON.stringify([
      { selected: "A", correct: true }
    ]),
    date_de_soumission: new Date(),
  });

  console.log(`✅ Résultat QCM enregistré pour '${currentUser.name}'`);
}

seed().catch((e) => {
  console.error("❌ Erreur lors du seed :", e);
});
