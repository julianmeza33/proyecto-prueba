
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../persistence/prisma-client.js";

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.trim() === "") {
        throw new Error("JWT_SECRET is not defined");
    }
    return secret;
}

export async function registerUser(
    nombre: string,
    email: string,
    password: string
) {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            nombre,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            nombre: true,
            email: true,
        },
    });
    return user;
}


export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // No generar un token si el usuario no existe.
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Comparar la contraseña recibida con el hash almacenado.
  const passwordIsValid = await bcrypt.compare(
    password,
    user.password,
  );

  if (!passwordIsValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { sub: String(user.id), email: user.email },
    getJwtSecret(),
    { expiresIn: "2h" },
  );

  return {
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
    },
  };
}
