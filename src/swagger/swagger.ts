import tags from "./tags";
import paths from "./paths";

const apiDocumentation = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Voice Nest",
    description:
      "NOTE: You can switch between local and production sever by left side Severs dropdowns options.",
    termsOfService: "https://github.com/Aayush-Rathore",
    contact: {
      name: "Aayush Rathore",
      email: "aayu.r.2003@gmail.com",
      url: "https://www.linkedin.com/in/aayush-rathore-1a2ab0253/",
    },
  },
  servers: [
    {
      url: "https://knowledge-nest.onrender.com/", // replace it with deployed server url
      description: "Production Server",
    },
    {
      url: "http://localhost:8000/",
      description: "Local Server",
    },
  ],
  tags: tags,
  paths: paths,

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
export { apiDocumentation };
