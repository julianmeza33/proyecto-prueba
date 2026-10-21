import type { Request, Response } from "express";
import {ZodError} from "zod";
import { registerSchema, loginSchema } from "../api/schemas/auth.schema.js";
import { loginUser, registerUser } from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            error: "datos inválidos",
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
            validation.data.password
        );
        return res.status(201).json({ user });
    } catch (error) {
        if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({ error: "El correo electrónico ya está registrado" });
        }
        if (error instanceof ZodError) {
        return res.status(400).json({ error: "datos inválidos" });
        }
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function login(req: Request, res: Response) {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            error: "datos inválidos",
            details: validation.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    try {
        const { token, user } = await loginUser(
            validation.data.email,
            validation.data.password
        );
        return res.status(200).json({ token, user });
    } catch (error) {
        if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({ error: "correo electrónico o contraseña inválidos" });
        }

        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}