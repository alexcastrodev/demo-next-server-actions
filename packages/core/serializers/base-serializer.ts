import { z } from "zod";

export function createBaseSerializer<TRaw extends object>(raw: TRaw) {
  const value = (key: keyof TRaw) => (raw as TRaw)[key];

  const from = <T>(
    key: keyof TRaw,
    parser: (input: unknown) => T,
  ): T | undefined => {
    try {
      return parser(value(key));
    } catch {
      return undefined;
    }
  };

  const fromSchema = <T>(
    key: keyof TRaw,
    schema: z.ZodType<T>,
  ): T | undefined => {
    const parsed = schema.safeParse(value(key));
    return parsed.success ? parsed.data : undefined;
  };

  return { value, from, fromSchema };
}
