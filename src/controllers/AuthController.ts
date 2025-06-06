import { Request, Response } from "express"
import { loginSchema, registerSchema } from "../schema/authSchema"
import { AuthService } from "../services/AuthService"

module.exports = {
  async register(req: Request, res: Response) {

    // Validation des données d'entrée (Zod)
    const validatedData = registerSchema.safeParse(req.body)
    if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 

    try {
      await AuthService.register(validatedData.data);
      return res.status(201).json({ success: true, message: "User registered successfully" });
      
    } catch (error) {
      res.status(500).json({ message: "Internal server error", success: false })
    }
  },

  async login(req: Request, res: Response) {

     // Validation des données d'entrée (Zod)
     const validatedData = loginSchema.safeParse(req.body)
     if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() })

    try {
        const { token } = await AuthService.login(validatedData.data);
      return res.status(200).json({success: true, message: "Login successful", token })

    } catch (error) {
      res.status(500).json({ message: "Internal server error", success: false })
    }
  },
}
