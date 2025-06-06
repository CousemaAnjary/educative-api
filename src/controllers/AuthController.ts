import db from "../db/drizzle"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { roles, users } from "../db/schema"
import { Request, Response } from "express"
import { registerSchema } from "../schema/authSchema"


module.exports = {
  async register(req: Request, res: Response) {
    try {
      // Validation des données d'entrée (Zod)
      const validatedData = registerSchema.safeParse(req.body)
      if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 

      // Destructuration des données validées
      const { name, email, password, image } = validatedData.data

       // Vérification si l'utilisateur existe déjà
       const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) })
       if (existingUser) return res.status(400).json({ success: false, message: "User already exists" })

        // Recherche du rôle "eleve"
      const role = await db.query.roles.findFirst({ where: eq(roles.name, "eleve")})
      if (!role) return res.status(500).json({ success: false, message: "Role 'eleve' not found in database" })
       
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10)
       
      // Insertion de l'utilisateur
      await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
        image,
        roleId: role.id,
      })

      return res.status(201).json({ success: true, message: "User registered successfully" });
      

    } catch (error) {
      res.status(500).json({ message: "Internal server error", success: false })
    }
  },

  async login(req: Request, res: Response) {},
}
