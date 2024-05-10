export const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "PalMed Application API",
        version: "0.1.0",
        description:
          "This is a complete PalMed API application created with Express",
      },
      servers: [
        // {
        //   url: "https://api.palmMed.com",
        //   description: "Production Server",
        // },
        {
          url: "http://localhost:6200",
          description: "Local Development Server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    apis: ["./**/*.ts"],
  };
  