import { Request, Response } from "express";
import { BaseController } from "../../../../shared/http/controllers/base.controller";
import { AsyncErrorHandler } from "../../../../shared/http/utils/AsyncErrorHandler";
import { AuthService } from "../services/auth.service";
import { SignUpInput } from "../validations/signUp.validation";
import { SignInInput } from "../validations/signIn.validation";

export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  public signUp = AsyncErrorHandler(async (req: Request, res: Response) => {
    const signUpInput: SignUpInput = req.body;

    await this.authService.signUp(signUpInput);

    this.created(res, "User signed up successfully");
  });

  public signIn = AsyncErrorHandler(async (req: Request, res: Response) => {
    const signInInput: SignInInput = req.body;

    const signInOutput = await this.authService.signIn(signInInput);

    this.ok(res, "User signed in successfully", signInOutput);
  });
}
