import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "../login-form";

vi.mock("core/actions/login/login.action", () => ({
  loginAction: vi.fn(),
}));

describe("LoginForm", () => {
  it("renders email input, password input and submit button", () => {
    render(<LoginForm />, {
      wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
    });

    expect(screen.getByPlaceholderText("seu@email.com")).toBeDefined();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeDefined();
  });
});
