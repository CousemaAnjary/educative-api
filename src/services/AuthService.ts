import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken"
import { z } from "zod"
import db from "../db/drizzle"
import { roles, users } from "../db/schema"
import { loginSchema, registerSchema } from "../schema/authSchema"


const JWT_SECRET = process.env.JWT_SECRET as string 

export const AuthService = {
  async register(data: z.infer<typeof registerSchema>) {

    // Destructuration des données validées
    const { name, email, password, image } = data

    // Vérification si l'utilisateur existe déjà
    const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) })
    if (existingUser) throw new Error("User already exists")

    // Recherche du rôle "eleve"
    const role = await db.query.roles.findFirst({ where: eq(roles.name, "eleve")})
    if (!role) throw new Error("Role 'eleve' not found");

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion de l'utilisateur
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      image,
      roleId: role.id,
    })
  },

  async login(data: z.infer<typeof loginSchema>) {

    // Destructuration des données validées
    const { email, password } = data

    // Recherche de l'utilisateur dans la base de données
    const user = await db.query.users.findFirst({ where: eq(users.email, email) })
    if (!user) throw new Error("Invalid credentials")

    // Comparer les mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new Error("Invalid credentials")

    // Générer un token JWT (à implémenter)
    const token = jwt.sign({ id: user.id, email: user.email , role:user.roleId }, JWT_SECRET, { expiresIn: "1h" })

    // Retourner le token
    return {token, user}
  }
}
