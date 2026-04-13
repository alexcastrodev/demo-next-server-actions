import { API_BASE_URL } from "../constants";

import { HttpClient } from "./http-client";

export const api = new HttpClient(API_BASE_URL);
