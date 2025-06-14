import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Renax API",
      version: "1.0.0",
      description: "API for Renax operations",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development",
      },
    ],
    basePath: "/api",
  },
  apis: ["./src/modules/*/routes.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  const swaggerOptions = {
    explorer: true,
  };

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerOptions)
  );
  console.log("Swagger UI is running on http://localhost:5000/api-docs");
};
