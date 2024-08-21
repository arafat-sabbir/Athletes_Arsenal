import { z } from "zod";

export const LoginFormValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password Must Be 6 Characters Long" }),
});

export const RegisterFormValidation = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password Must Be 6 Characters Long" }),
});

export const AddProductValidation = z.object({
  email: z.string().email(),
  photo: z.any(),
});
