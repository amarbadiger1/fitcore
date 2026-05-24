import { z } from "zod";

// ✅ Register schema
export const registerSchema = z.object({
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.email(),
    password: z.string().min(6)
});

// Update User Profile Schema
export const updateProfileSchema = z.object({
    profilePic: z.string().optional(),
    gender: z.enum(["male", "female"]),

    age: z.coerce.number().min(10).max(100),
    weight: z.coerce.number().min(20).max(300),
    height: z.coerce.number().min(100).max(250),

    goal: z.enum(["weight_loss", "muscle_gain", "maintain"]),
    activityLevel: z.enum(["low", "medium", "high"])
}).partial();

// ✅ Login schema
export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});