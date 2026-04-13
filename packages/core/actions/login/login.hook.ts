import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { login } from "./login.request";
import type { LoginPayload, LoginResponse } from "./login.types";

export function useLogin(
  mutationProps?: UseMutationOptions<LoginResponse, Error, LoginPayload>,
) {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
    ...mutationProps,
  });
}
