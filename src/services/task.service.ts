
import { prisma } from "../persistence/prisma-client.js";
import { TaskStatus } from "../generated/prisma/client.js";

const statusMap = {
  pendiente: TaskStatus.PENDIENTE,
  "en curso": TaskStatus.EN_CURSO,
  completada: TaskStatus.COMPLETADA,
  cancelada: TaskStatus.CANCELADA,
} as const;

const reverseStatusMap = {
  [TaskStatus.PENDIENTE]: "pendiente",
  [TaskStatus.EN_CURSO]: "en curso",
  [TaskStatus.COMPLETADA]: "completada",
  [TaskStatus.CANCELADA]: "cancelada",
} as const;

function formatTask<T extends { estado: TaskStatus }>(task: T) {
  return {
    ...task,
    estado: reverseStatusMap[task.estado],
  };
}

export async function getTasks(userId: number) {
  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return tasks.map(formatTask);
}

export async function getTaskById(userId: number, taskId: number) {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });

  return task ? formatTask(task) : null;
}

export async function createTask(
    userId: number,
    data: {
    titulo: string;
    descripcion?: string | null | undefined;
    fecha_vencimiento?: string | null | undefined;
    estado?:
        | "pendiente"
        | "en curso"
        | "completada"
        | "cancelada"
        | undefined;
    }
) {
  const task = await prisma.task.create({
    data: {
      titulo: data.titulo,
      descripcion: data.descripcion ?? null,
      fecha_vencimiento: data.fecha_vencimiento
        ? new Date(data.fecha_vencimiento)
        : null,
      estado: data.estado ? statusMap[data.estado] : TaskStatus.PENDIENTE,
      usuario: { connect: { id: userId } },
    },
  });

  return formatTask(task);
}

export async function updateTask(
  userId: number,
  taskId: number,
  data: {
  titulo?: string | undefined;
  descripcion?: string | null | undefined;
  fecha_vencimiento?: string | null | undefined;
  estado?:
    | "pendiente"
    | "en curso"
    | "completada"
    | "cancelada"
    | undefined;
}
) {
  const existingTask = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });

  if (!existingTask) {
    return null;
  }

  const updated = await prisma.task.updateMany({
    where: { id: taskId, userId },
    data: {
      ...(data.titulo !== undefined && { titulo: data.titulo }),
      ...(data.descripcion !== undefined && {
        descripcion: data.descripcion,
      }),
      ...(data.fecha_vencimiento !== undefined && {
        fecha_vencimiento: data.fecha_vencimiento
          ? new Date(data.fecha_vencimiento)
          : null,
      }),
      ...(data.estado !== undefined && {
        estado: statusMap[data.estado],
      }),
    },
  });

  if (updated.count === 0) {
    return null;
  }

  return getTaskById(userId, taskId);
}

export async function deleteTask(userId: number, taskId: number) {
  const result = await prisma.task.deleteMany({
    where: { id: taskId, userId },
  });

  return result.count > 0;
}
