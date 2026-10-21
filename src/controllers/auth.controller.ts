
import type { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "../api/schemas/auth.schema.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { AppError, AuthenticationError } from "../api/errors/app-error.js";

/**
 * Registra un usuario nuevo.
 */
export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validation = registerSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      details: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  try {
    const user = await registerUser(
      validation.data.nombre,
      validation.data.email,
      validation.data.password,
    );

    return res.status(201).json({ user });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return next(
        new AppError("El correo electrónico ya está registrado", 409),
      );
    }

    return next(error);
  }
}

/**
 * Autentica al usuario y genera un token JWT.
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      details: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  try {
    const { token, user } = await loginUser(
      validation.data.email,
      validation.data.password,
    );

    return res.status(200).json({ token, user });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      return next(
        new AuthenticationError(
          "Correo electrónico o contraseña inválidos",
        ),
      );
    }

    return next(error);
  }
}
