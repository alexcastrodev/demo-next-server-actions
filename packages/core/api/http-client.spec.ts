import { beforeEach, describe, expect, it, vi } from "vitest";

import { HttpClient } from "./http-client";

vi.mock("./interceptors/request", () => ({
  applyRequestInterceptor: (headers: Headers, token?: string) => {
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
}));

vi.mock("./interceptors/response", () => ({
  applyResponseInterceptor: vi.fn(),
}));

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

function makeResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  } as Response;
}

describe("HttpClient", () => {
  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient("https://api.example.com");
    mockFetch.mockReset();
  });

  it("GET — calls correct URL", async () => {
    mockFetch.mockResolvedValue(makeResponse({ id: 1 }));

    await client.get("/users");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/users",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("GET — appends query params", async () => {
    mockFetch.mockResolvedValue(makeResponse([]));

    await client.get("/users", { params: { page: 1, active: true } });

    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain("page=1");
    expect(url).toContain("active=true");
  });

  it("POST — sends serialized body", async () => {
    mockFetch.mockResolvedValue(makeResponse({ id: 2 }));

    await client.post("/users", { name: "Alex" });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/users",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "Alex" }),
      }),
    );
  });

  it("PUT — sends serialized body", async () => {
    mockFetch.mockResolvedValue(makeResponse({ id: 2 }));

    await client.put("/users/2", { name: "Alex" });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/users/2",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify({ name: "Alex" }),
      }),
    );
  });

  it("PATCH — sends serialized body", async () => {
    mockFetch.mockResolvedValue(makeResponse({ id: 2 }));

    await client.patch("/users/2", { name: "Alex" });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/users/2",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ name: "Alex" }),
      }),
    );
  });

  it("DELETE — calls correct URL without body", async () => {
    mockFetch.mockResolvedValue(makeResponse(null));

    await client.delete("/users/2");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/users/2",
      expect.objectContaining({ method: "DELETE", body: undefined }),
    );
  });

  it("returns parsed JSON response", async () => {
    mockFetch.mockResolvedValue(makeResponse({ id: 1, name: "Alex" }));

    const result = await client.get<{ id: number; name: string }>("/users/1");

    expect(result).toEqual({ id: 1, name: "Alex" });
  });

  it("sends Authorization header when defaultToken is provided", async () => {
    mockFetch.mockResolvedValue(makeResponse({ id: 1 }));

    const authedClient = new HttpClient(
      "https://api.example.com",
      "my-token",
    );
    await authedClient.get("/users/1");

    const [, init] = mockFetch.mock.calls[0];
    expect((init.headers as Headers).get("Authorization")).toBe(
      "Bearer my-token",
    );
  });

  it("per-request token overrides defaultToken", async () => {
    mockFetch.mockResolvedValue(makeResponse({ id: 1 }));

    const authedClient = new HttpClient(
      "https://api.example.com",
      "default-token",
    );
    await authedClient.get("/users/1", { token: "override-token" });

    const [, init] = mockFetch.mock.calls[0];
    expect((init.headers as Headers).get("Authorization")).toBe(
      "Bearer override-token",
    );
  });
});
