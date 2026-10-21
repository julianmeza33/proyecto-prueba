
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";

/**
 * Gestiona los errores de la API desde un único punto.
 */
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.message,
    });
    return;
  }

  console.error("Error inesperado:", error);

  res.status(500).json({
    error: "Error interno del servidor",
  });
}
