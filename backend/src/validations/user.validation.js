import { z } from "zod";

// ✅ Register schema
export const registerSchema = z.object({
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.email(),
    password: z.string().min(6)
});

// ✅ Login schema
export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});