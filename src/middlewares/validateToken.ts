import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { IPayload } from "../interface/Payload";

class ValidateToken {
  public async userVerify(req: Request, res: Response, next: NextFunction) {
    const token = req.header("auth-token");

    if (!token) return res.status(401).json("Access Denied");

    /* Si es correcto el token me devuelve la data de su interior */
    const payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET || "tokentest"
    ) as IPayload;
    req.userId = payload._id;

    return next();
  }
}

export const validateToken = new ValidateToken();
