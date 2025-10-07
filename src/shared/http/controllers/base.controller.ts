import { Response } from "express";
import { StatusCode } from "../constants/StatusCode";
import { ResponseStatus } from "../constants/ResponseStatus";

export class BaseController {
  ok(
    res: Response,
    message: string = "Ok",
    data: Record<string, any> = {}
  ): void {
    res.status(StatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message,
      data,
    });
  }

  created(
    res: Response,
    message: string = "Created",
    data: Record<string, any> = {}
  ): void {
    res.status(StatusCode.CREATED).json({
      status: ResponseStatus.SUCCESS,
      message,
      data,
    });
  }

  forbidden(res: Response, message: string = "Forbidden"): void {
    res.status(StatusCode.FORBIDDEN).json({
      status: ResponseStatus.FAIL,
      message,
    });
  }

  notFound(res: Response, message: string = "Not found"): void {
    res.status(StatusCode.NOT_FOUND).json({
      status: ResponseStatus.FAIL,
      message,
    });
  }
}
