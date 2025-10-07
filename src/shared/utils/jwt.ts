import jwt, { JwtPayload } from "jsonwebtoken";

export class JWT {
  private static get SECRET(): string {
    return process.env.JWT_SECRET as string;
  }

  private static get EXPIRES_IN(): number {
    return Number(process.env.JWT_EXPIRES_IN);
  }

  static sign(payload: object): string {
    return jwt.sign(payload, this.SECRET, {
      expiresIn: this.EXPIRES_IN,
    });
  }

  static verify(token: string): string | JwtPayload {
    return jwt.verify(token, this.SECRET);
  }
}
