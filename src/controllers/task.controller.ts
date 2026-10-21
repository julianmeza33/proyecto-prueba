
import type { Request, Response, NextFunction } from "express";
import {
  createTaskSchema,
  taskIdSchema,
  updateTaskSchema,
} from "../api/schemas/task.schema.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../services/task.service.js";
import {
  AuthenticationError,
  NotFoundError,
} from "../api/errors/app-error.js";

/**
 * Obtiene el ID del usuario autenticado.
 */
function getUserId(req: Request): number {
  if (!req.user) {
    throw new AuthenticationError("Debes iniciar sesión");
  }

  return req.user.id;
}

/**
 * Lista las tareas del usuario autenticado.
 */
export async function listTasks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tasks = await getTasks(getUserId(req));
    return res.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
}

/**
 * Consulta una tarea del usuario autenticado.
 */
export async function showTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedId = taskIdSchema.safeParse(req.params.id);

  if (!parsedId.success) {
    return res.status(400).json({ error: "ID de tarea inválido" });
  }

  try {
    const task = await getTaskById(getUserId(req), parsedId.data);

    if (!task) {
      throw new NotFoundError("Tarea no encontrada");
    }

    return res.status(200).json(task);
  } catch (error) {
    return next(error);
  }
}

/**
 * Crea una tarea para el usuario autenticado.
 */
export async function createTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsed = createTaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Datos de tarea inválidos",
      details: parsed.error.issues,
    });
  }

  try {
    const task = await createTask(getUserId(req), parsed.data);
    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
}

/**
 * Actualiza una tarea del usuario autenticado.
 */
export async function updateTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedId = taskIdSchema.safeParse(req.params.id);
  const parsedBody = updateTaskSchema.safeParse(req.body);

  if (!parsedId.success) {
    return res.status(400).json({ error: "ID de tarea inválido" });
  }

  if (!parsedBody.success) {
    return res.status(400).json({
      error: "Datos de actualización inválidos",
      details: parsedBody.error.issues,
    });
  }

  try {
    const task = await updateTask(
      getUserId(req),
      parsedId.data,
      parsedBody.data,
    );

    if (!task) {
      throw new NotFoundError("Tarea no encontrada");
    }

    return res.status(200).json(task);
  } catch (error) {
    return next(error);
  }
}

/**
 * Elimina una tarea del usuario autenticado.
 */
export async function deleteTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedId = taskIdSchema.safeParse(req.params.id);

  if (!parsedId.success) {
    return res.status(400).json({ error: "ID de tarea inválido" });
  }

  try {
    const deleted = await deleteTask(getUserId(req), parsedId.data);

    if (!deleted) {
      throw new NotFoundError("Tarea no encontrada");
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
