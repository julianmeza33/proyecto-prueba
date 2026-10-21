
import type { Request, Response } from "express";
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

function getUserId(req: Request): number {
  if (!req.user) {
    throw new Error("USER_NOT_AUTHENTICATED");
  }

  return req.user.id;
}

export async function listTasks(req: Request, res: Response) {
  try {
    const tasks = await getTasks(getUserId(req));
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al consultar las tareas" });
  }
}

export async function showTask(req: Request, res: Response) {
  const parsedId = taskIdSchema.safeParse(req.params.id);

  if (!parsedId.success) {
    return res.status(400).json({ error: "ID de tarea inválido" });
  }

  try {
    const task = await getTaskById(getUserId(req), parsedId.data);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al consultar la tarea" });
  }
}

export async function createTaskHandler(req: Request, res: Response) {
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
    console.error(error);
    return res.status(500).json({ error: "Error al crear la tarea" });
  }
}

export async function updateTaskHandler(req: Request, res: Response) {
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
      parsedBody.data
    );

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar la tarea" });
  }
}

export async function deleteTaskHandler(req: Request, res: Response) {
  const parsedId = taskIdSchema.safeParse(req.params.id);

  if (!parsedId.success) {
    return res.status(400).json({ error: "ID de tarea inválido" });
  }

  try {
    const deleted = await deleteTask(getUserId(req), parsedId.data);

    if (!deleted) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al eliminar la tarea" });
  }
}
