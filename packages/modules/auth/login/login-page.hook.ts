"use client";

import { useForm } from "@mantine/form";
import { schemaResolver } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "core/i18n";
import { useLogin } from "core/actions/login/login.hook";
import { useUserState } from "core/states/use-user-state";
import { loginPageSchema, type LoginPageFormValues } from "./login-page.schema";

export function useLoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const setToken = useUserState((state) => state.setToken);

  const [error, setError] = useState("");

  const form = useForm<LoginPageFormValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "admin@example.com",
      password: "password123",
    },
    validate: schemaResolver(loginPageSchema, { sync: true }),
    validateInputOnBlur: true,
  });

  const mutation = useLogin({
    onSuccess: ({ token }) => {
      setToken(token);
      router.push("/dashboard");
    },
    onError: (mutationError) => {
      setError(mutationError.message || t("auth.serverError"));
    },
  });

  async function handleSubmit(values: LoginPageFormValues) {
    setError("");

    try {
      await mutation.mutateAsync(values);
    } catch {}
  }

  return {
    error,
    form,
    handleSubmit: form.onSubmit(handleSubmit),
    isLoading: mutation.isPending,
    t,
  };
}
