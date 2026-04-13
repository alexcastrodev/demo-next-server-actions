import { cookies } from "next/headers";
import { createGraphqlClient } from "./graphql-client";

export async function getServerGraphqlClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  return createGraphqlClient(token);
}
