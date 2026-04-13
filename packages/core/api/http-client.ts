import { applyRequestInterceptor } from "./interceptors/request";
import { applyResponseInterceptor } from "./interceptors/response";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  params?: Record<string, string | number | boolean>;
  body?: unknown;
  token?: string;
}

export class HttpClient {
  constructor(
    private readonly baseURL: string,
    private readonly defaultToken?: string,
  ) {}

  async request<T>(
    method: HttpMethod,
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { params, body, token = this.defaultToken, ...rest } = options;

    let url = `${this.baseURL}${path}`;
    if (params) {
      const search = new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)]),
      );
      url = `${url}?${search.toString()}`;
    }

    const headers = applyRequestInterceptor(
      new Headers(rest.headers as HeadersInit),
      token,
    );

    const response = await fetch(url, {
      ...rest,
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    await applyResponseInterceptor(response);

    return response.json() as Promise<T>;
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>("GET", path, options);
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("POST", path, { ...options, body });
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("PUT", path, { ...options, body });
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("PATCH", path, { ...options, body });
  }

  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>("DELETE", path, options);
  }
}
