import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import { specs } from "./swagger/swaggerConfig";

// Configuration

const PORT = process.env.PORT || 3000;

// Initialisation
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/", routes);

// Gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const server = app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});

export default server;
