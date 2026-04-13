import { cookies } from "next/headers";
import { API_BASE_URL } from "../constants";
import { HttpClient } from "./http-client";

export async function getServerApi() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  return new HttpClient(API_BASE_URL, token);
}
