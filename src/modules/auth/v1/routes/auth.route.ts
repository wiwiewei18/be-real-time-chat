import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { Validator } from "../../../../shared/http/middlewares/validator.middleware";
import { signUpBodySchema } from "../validations/signUp.validation";
import { signInBodySchema } from "../validations/signIn.validation";

export class AuthRouter {
  public router: Router;

  constructor(private authController: AuthController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route("/sign-up")
      .post(
        Validator.validateBody(signUpBodySchema),
        this.authController.signUp
      );

    this.router
      .route("/sign-in")
      .post(
        Validator.validateBody(signInBodySchema),
        this.authController.signIn
      );
  }
}
