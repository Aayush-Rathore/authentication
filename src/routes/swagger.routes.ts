import { Router } from "express";
import { apiDocumentation } from "../swagger/swagger";
import swaggerUi from "swagger-ui-express";

class SwaggerRouter {
  public router: Router;

  constructor(router: Router) {
    this.router = router;
    this.routes();
  }

  routes() {
    this.router.use(
      "/api-doc",
      swaggerUi.serve,
      swaggerUi.setup(apiDocumentation)
    );
  }
}

const router = Router();

new SwaggerRouter(router);
export default router;
