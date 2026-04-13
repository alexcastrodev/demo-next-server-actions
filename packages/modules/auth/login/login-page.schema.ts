import { z } from "zod/v4";

export const loginPageSchema = z.object({
  email: z.email({ error: "Email is invalid" }),
  password: z.string().min(1, { error: "Password is required" }),
});

export type LoginPageFormValues = z.infer<typeof loginPageSchema>;
