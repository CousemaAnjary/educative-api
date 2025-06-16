import { ActivityOptions, proxyActivities } from "@temporalio/workflow";

const activityOptions: ActivityOptions = {
  startToCloseTimeout: "1 minute",
};

const {
  authentifierUtilisateur,
  recupererContenusEducatifs,
  verifierDoublonsContenus,
  sauvegarderContenus,
  notifierUtilisateur,
  recupererExercices,
  envoyerReponsesPourCorrection,
  recupererResultats,
  sauvegarderResultats,
} = proxyActivities(activityOptions);

export {
  authentifierUtilisateur,
  envoyerReponsesPourCorrection,
  notifierUtilisateur,
  recupererContenusEducatifs,
  recupererExercices,
  recupererResultats,
  sauvegarderContenus,
  sauvegarderResultats,
  verifierDoublonsContenus,
};
