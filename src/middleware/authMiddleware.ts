import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string 

interface AuthPayload {
  id: string;
  email: string;
  roleId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

  // Vérifier la présence du header Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ success: false, message: "Token manquant ou malformé" });
    
  // Extraire le token du header Authorization
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

    req.user = decoded
    next()

  } catch (error) {
    return res.status(401).json({ success: false, message: "Token invalide" });
  }
}
