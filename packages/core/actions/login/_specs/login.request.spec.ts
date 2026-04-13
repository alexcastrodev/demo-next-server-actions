import { beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "../../../api";
import { login } from "../login.request";
import payloadFixture from "./fixtures/login.payload.json";
import successFixture from "./fixtures/login.success.response.json";
import errorFixture from "./fixtures/login.error.response.json";

vi.mock("../../../api", () => ({
  api: {
    post: vi.fn(),
  },
}));

describe("login request", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the token when the request succeeds", async () => {
    vi.mocked(api.post).mockResolvedValue(successFixture);

    await expect(login(payloadFixture)).resolves.toEqual(successFixture);
    expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: payloadFixture.email,
      password: payloadFixture.password,
    });
  });

  it("throws the api error message when the request fails", async () => {
    const response = new Response(JSON.stringify(errorFixture), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });

    vi.mocked(api.post).mockRejectedValue(response);

    await expect(login(payloadFixture)).rejects.toThrow(errorFixture.error);
  });
});
