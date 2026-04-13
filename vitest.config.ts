import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "packages/**/_tests/**/*.spec.{ts,tsx}",
      "packages/**/*.spec.{ts,tsx}",
      "app/**/*.spec.{ts,tsx}",
    ],
  },
});
