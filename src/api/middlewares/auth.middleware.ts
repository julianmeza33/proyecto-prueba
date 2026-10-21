
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email?: string;
            };
        }
    }
}

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
    ) {

    const authHeader = req.headers.authorization;
    const [scheme, token] = authHeader?.split(" ") ?? [];

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
            error: "token de autenticación no proporcionado o inválido"
        });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
            console.error("JWT_SECRET no está definido o es demasiado corto");


            return res.status(500).json({
                error: "error interno del servidor"
            });
        }

    try {
        const decoded = jwt.verify(token, secret);
        

        if (typeof decoded === "string" || typeof decoded.sub !== "string") {
            return res.status(401).json({
                error: "token invalido"
            });
        }

        const id = Number(decoded.sub);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(401).json({
                error: "token invalido" 
            });
        }

        req.user = {
            id,
            ...(typeof decoded.email === "string" 
                ? { email: decoded.email } 
                : {}),
        };
        next();
    } catch{
        return res.status(401).json({
            error: "token invalido"
        });
    }
}
