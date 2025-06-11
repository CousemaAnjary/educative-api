import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

interface AuthPayload {
  id: string
  email: string
  role: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Vérifier la présence du header Authorization
  const authHeader = req.headers.authorization
  // 1. Vérifie la présence et le format du token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ success: false, message: "Token manquant ou malformé" })
    return
  }

  // Extraire le token du header Authorization
  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload

    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ success: false, message: "Token invalide" })
  }
}
