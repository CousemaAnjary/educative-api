// src/temporal/client.ts
import { Connection, WorkflowClient } from "@temporalio/client";
import { gererExercicesWorkflow } from "./workflows/gererExercicesWorkflow";
import { synchroniserContenusWorkflow } from "./workflows/synchroniserContenusWorkflow";

// Configuration par défaut
const DEFAULT_CONFIG = {
  address: "localhost:7233",
  namespace: "default",
};

// Initialisation de la connexion unique
let connection: Connection;
let workflowClient: WorkflowClient;

async function initializeConnection(): Promise<WorkflowClient> {
  if (!connection) {
    connection = await Connection.connect({
      address: DEFAULT_CONFIG.address,
    });
    workflowClient = new WorkflowClient({
      connection,
      namespace: DEFAULT_CONFIG.namespace,
    });
  }
  return workflowClient;
}

// Fonction pour démarrer un workflow de synchronisation
export async function startSynchronisationWorkflow(
  email: string
): Promise<any> {
  const client = await initializeConnection();
  try {
    const handle = await client.start(synchroniserContenusWorkflow, {
      taskQueue: "education-queue",
      args: [email],
      workflowId: `sync-contenus-${Date.now()}`,
    });
    return handle;
  } catch (error) {
    console.error(
      "Erreur lors du démarrage du workflow de synchronisation:",
      error
    );
    throw error;
  }
}

// Fonction pour démarrer un workflow de gestion des exercices
export async function startExercisesWorkflow(email: string): Promise<any> {
  const client = await initializeConnection();
  try {
    const handle = await client.start(gererExercicesWorkflow, {
      taskQueue: "education-queue",
      args: [email],
      workflowId: `gerer-exercices-${Date.now()}`,
    });
    return handle;
  } catch (error) {
    console.error("Erreur lors du démarrage du workflow d'exercices:", error);
    throw error;
  }
}

// Export du client pour une utilisation directe
export { workflowClient };

// Programme principal : démarrer en ligne de commande
async function main() {
  try {
    const args = process.argv.slice(2);
    if (args.length < 2) {
      console.error("Usage: npm run client <workflow> <email>");
      process.exit(1);
    }

    const [workflowName, email] = args;

    switch (workflowName) {
      case "synchronise": {
        const syncHandle = await startSynchronisationWorkflow(email);
        console.log(
          `Started synchronisation workflow: ${syncHandle.workflowId}`
        );
        break;
      }
      case "exercises": {
        const exercisesHandle = await startExercisesWorkflow(email);
        console.log(
          `Started exercises workflow: ${exercisesHandle.workflowId}`
        );
        break;
      }
      default:
        console.error(
          "Unknown workflow type. Use 'synchronise' or 'exercises'"
        );
        process.exit(1);
    }
  } catch (error) {
    console.error("Erreur dans le programme principal:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}
