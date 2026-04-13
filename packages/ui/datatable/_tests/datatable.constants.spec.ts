import { describe, expect, it } from "vitest";
import { PAGE_SIZE_OPTIONS } from "../datatable.constants";

describe("PAGE_SIZE_OPTIONS", () => {
  it("contains expected page size values", () => {
    expect(PAGE_SIZE_OPTIONS).toEqual(["10", "25", "50", "100"]);
  });

  it("all values are numeric strings", () => {
    PAGE_SIZE_OPTIONS.forEach((opt) => {
      expect(Number(opt)).toBeGreaterThan(0);
    });
  });

  it("values are in ascending order", () => {
    const nums = PAGE_SIZE_OPTIONS.map(Number);
    expect(nums).toEqual([...nums].sort((a, b) => a - b));
  });
});
