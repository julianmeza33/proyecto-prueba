import { describe, expect, it } from "vitest";
import { registerSchema, loginSchema } from "../src/api/schemas/auth.schema.js";
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from "../src/api/schemas/task.schema.js";

describe("Validaciones de autenticación", () => {
  it("acepta un registro válido", () => {
    const result = registerSchema.safeParse({
      nombre: "Usuario Prueba",
      email: "usuario@example.com",
      password: "ClaveSegura2026!",
    });

    expect(result.success).toBe(true);
  });

  it("rechaza un correo inválido", () => {
    const result = registerSchema.safeParse({
      nombre: "Usuario Prueba",
      email: "correo-invalido",
      password: "ClaveSegura2026!",
    });

    expect(result.success).toBe(false);
  });

  it("rechaza una contraseña demasiado corta en el registro", () => {
    const result = registerSchema.safeParse({
      nombre: "Usuario Prueba",
      email: "usuario@example.com",
      password: "123",
    });

    expect(result.success).toBe(false);
  });

  it("acepta credenciales con formato válido", () => {
    const result = loginSchema.safeParse({
      email: "usuario@example.com",
      password: "ClaveSegura2026!",
    });

    expect(result.success).toBe(true);
  });
});

describe("Validaciones de tareas", () => {
  it("acepta una tarea con título válido", () => {
    const result = createTaskSchema.safeParse({
      titulo: "Completar prueba técnica",
      descripcion: "Preparar entrega",
      estado: "pendiente",
    });

    expect(result.success).toBe(true);
  });

  it("rechaza una tarea sin título", () => {
    const result = createTaskSchema.safeParse({
      titulo: "   ",
    });

    expect(result.success).toBe(false);
  });

  it("rechaza un estado no permitido", () => {
    const result = createTaskSchema.safeParse({
      titulo: "Tarea de prueba",
      estado: "invalido",
    });

    expect(result.success).toBe(false);
  });

  it("acepta una actualización parcial", () => {
    const result = updateTaskSchema.safeParse({
      estado: "completada",
    });

    expect(result.success).toBe(true);
  });

  it("rechaza una actualización vacía", () => {
    const result = updateTaskSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it("acepta un ID positivo", () => {
    expect(taskIdSchema.safeParse("1").success).toBe(true);
  });

  it("rechaza un ID inválido", () => {
    expect(taskIdSchema.safeParse("abc").success).toBe(false);
  });
});
