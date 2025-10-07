import { Request, Response } from "express";
import { BaseController } from "../../../../shared/http/controllers/base.controller";
import { AsyncErrorHandler } from "../../../../shared/http/utils/AsyncErrorHandler";

export class HealthController extends BaseController {
  constructor() {
    super();
  }

  public getHealthStatus = AsyncErrorHandler(
    async (_req: Request, res: Response) => {
      this.ok(res, "Health status fetched successfully");
    }
  );
}
