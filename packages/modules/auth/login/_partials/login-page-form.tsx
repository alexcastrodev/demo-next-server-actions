"use client";

import { useActionState } from "react";
import {
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import type { LoginActionState } from "core/actions/login/login.action";

interface LoginPageFormProps {
  action: (
    prevState: LoginActionState | undefined,
    formData: FormData,
  ) => Promise<LoginActionState>;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submitLabel: string;
}

export function LoginPageForm({
  action,
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  submitLabel,
}: LoginPageFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <Paper withBorder shadow="sm" p="xl" radius="md">
      <form action={formAction}>
        <Stack>
          <TextInput
            label={emailLabel}
            placeholder={emailPlaceholder}
            type="email"
            name="email"
            defaultValue="admin@example.com"
            error={state?.errors?.email?.[0]}
          />
          <PasswordInput
            label={passwordLabel}
            placeholder={passwordPlaceholder}
            name="password"
            defaultValue="password123"
            error={state?.errors?.password?.[0]}
          />
          {state?.message ? (
            <Text c="red" size="sm">
              {state.message}
            </Text>
          ) : null}
          <Button type="submit" fullWidth loading={isPending} mt="xs">
            {submitLabel}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
