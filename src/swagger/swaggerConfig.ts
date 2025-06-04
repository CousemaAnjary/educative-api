import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Educative API Documentation",
      version: "1.0.0",
      description: "Documentation de l'API Educative",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Serveur de développement",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
