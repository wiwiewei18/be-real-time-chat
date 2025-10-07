import { ResponseStatus } from "../constants/ResponseStatus";

export type ResponseStatusType =
  (typeof ResponseStatus)[keyof typeof ResponseStatus];

export default class CustomError extends Error {
  public statusCode: number;
  public status: ResponseStatusType;
  public isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.status =
      statusCode >= 400 && statusCode < 500
        ? ResponseStatus.FAIL
        : ResponseStatus.ERROR;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }
}
