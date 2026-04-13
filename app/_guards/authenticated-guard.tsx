import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export async function AuthenticatedGuard({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (!token) {
    redirect("/login");
  }

  return children;
}
