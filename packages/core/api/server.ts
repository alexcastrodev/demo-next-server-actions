import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "../constants";
import { HttpClient } from "./http-client";

export async function getServerApi() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  return new HttpClient(API_BASE_URL, token, (error) => {
    if (error instanceof Response && error.status === 401) {
      redirect("/login");
    }
  });
}
