
import {date, object, z} from "zod";

const taskStatusSchema = z.enum([
  "pendiente",
  "en curso",
  "completada",
  "cancelada",
]);

export const createTaskSchema = z.object({
    titulo: z.string().trim().min(1, "El título es obligatorio").max(150),
    descripcion: z.string().trim().max(2000).nullable().optional(),
    fecha_vencimiento: z
        .string()
        .datetime({ offset: true})
        .nullable()
        .optional(),
    estado: taskStatusSchema.optional(),
});

export const updateTaskSchema = createTaskSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

export const taskIdSchema = z.coerce
  .number()
  .int()
  .positive()



