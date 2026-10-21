
import {z} from "zod";

export const registerSchema = z.object({
    nombre: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(250),
    password: z.string().min(8).max(72),
});

export const loginSchema = z.object({
    email: z.string().trim().email().max(250),
    password: z.string().min(1).max(72),
});