"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login } from "./login.request";
import { loginPageSchema } from "@/packages/modules/auth/login/login-page.schema";

export interface LoginActionState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
}

export async function loginAction(
  _prevState: LoginActionState | undefined,
  formData: FormData,
): Promise<LoginActionState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginPageSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as LoginActionState["errors"],
    };
  }

  try {
    const { token } = await login(parsed.data);

    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }

  redirect("/dashboard");
}
