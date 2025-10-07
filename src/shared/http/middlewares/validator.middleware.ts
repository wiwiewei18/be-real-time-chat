import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { StatusCode } from "../constants/StatusCode";
import CustomError from "../utils/CustomError";

export class Validator {
  static validateBody(schema: ZodType<any, any, any>) {
    return (req: Request, _res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error: any) {
        next(
          new CustomError(
            StatusCode.BAD_REQUEST,
            error.issues?.map((issue: any) => issue.message).join(", ") ||
              "Invalid request body"
          )
        );
      }
    };
  }

  static validateQuery(schema: ZodType<any, any, any>) {
    return (req: Request, _res: Response, next: NextFunction) => {
      try {
        schema.parse(req.query);
        next();
      } catch (error: any) {
        next(
          new CustomError(
            StatusCode.BAD_REQUEST,
            error.issues?.map((issue: any) => issue.message).join(", ") ||
              "Invalid query parameters"
          )
        );
      }
    };
  }

  static validateParams(schema: ZodType<any, any, any>) {
    return (req: Request, _res: Response, next: NextFunction) => {
      try {
        schema.parse(req.params);
        next();
      } catch (error: any) {
        next(
          new CustomError(
            StatusCode.BAD_REQUEST,
            error.issues?.map((issue: any) => issue.message).join(", ") ||
              "Invalid route parameters"
          )
        );
      }
    };
  }
}
