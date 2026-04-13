import { api } from "../../api";
import type {
  LoginErrorResponse,
  LoginPayload,
  LoginResponse,
} from "./login.types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    return await api.post<LoginResponse>("/auth/login", payload);
  } catch (error) {
    if (error instanceof Response) {
      const data = (await error
        .json()
        .catch(() => null)) as LoginErrorResponse | null;
      throw new Error(data?.error ?? "Request failed");
    }

    throw error;
  }
}
