import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config"

// Quiero extender o modificar el comportamiento de un módulo ya existente.
declare module "express" {
  interface Request {
    email?: string;
  }
}

const secret = process.env.SECRET;


export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Bearer token not found" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    
    if (!secret) {
      throw new Error("JWT_SECRET must be provided ");
    }
    const payload = jwt.verify(token,secret) as jwt.JwtPayload;
    req.email = payload.email;
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Token invalid signature" });
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token expired" });
      return;
    }

    res.status(500).json("Token Error");
    return;
  }
};