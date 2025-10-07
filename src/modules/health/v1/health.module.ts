import { HealthController } from "./controllers/health.controller";
import { HealthRouter } from "./routes/health.route";

export class HealthModule {
  static buildRouter() {
    const healthController = new HealthController();
    const healthRouter = new HealthRouter(healthController);

    return healthRouter.router;
  }
}
