import { Router } from "express";
import { HealthController } from "../controllers/health.controller";

export class HealthRouter {
  public router: Router;

  constructor(private healthController: HealthController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.healthController.getHealthStatus);
  }
}
