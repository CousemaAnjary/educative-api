import { Worker } from "@temporalio/worker";
import {
  authentifierUtilisateur,
  envoyerReponsesPourCorrection,
  notifierUtilisateur,
  recupererContenusEducatifs,
  recupererExercices,
  recupererResultats,
  sauvegarderContenus,
  sauvegarderResultats,
  verifierDoublonsContenus,
} from "./activities/educationActivitiesImpl";

async function run() {
  const worker = await Worker.create({
    taskQueue: "education-queue",
    workflowsPath: require.resolve("./workflows/index"),
    activities: {
      authentifierUtilisateur,
      recupererContenusEducatifs,
      verifierDoublonsContenus,
      sauvegarderContenus,
      notifierUtilisateur,
      recupererExercices,
      envoyerReponsesPourCorrection,
      recupererResultats,
      sauvegarderResultats,
    },
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
