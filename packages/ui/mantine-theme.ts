import { createTheme } from "@mantine/core";

export const mantineTheme = createTheme({
  primaryColor: "teal",
  defaultRadius: "md",
  fontFamily:
    'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: {
    fontFamily:
      'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: "700",
  },
  colors: {
    teal: [
      "#e6fcf5",
      "#c3fae8",
      "#96f2d7",
      "#63e6be",
      "#38d9a9",
      "#20c997",
      "#12b886",
      "#0ca678",
      "#099268",
      "#087f5b",
    ],
    gray: [
      "#f8fafc",
      "#f1f5f9",
      "#e2e8f0",
      "#cbd5e1",
      "#94a3b8",
      "#64748b",
      "#475569",
      "#334155",
      "#1e293b",
      "#0f172a",
    ],
  },
  shadows: {
    xs: "0 1px 2px rgba(15, 23, 42, 0.06)",
    sm: "0 10px 30px rgba(15, 23, 42, 0.06)",
    md: "0 18px 50px rgba(15, 23, 42, 0.10)",
    lg: "0 24px 70px rgba(15, 23, 42, 0.14)",
    xl: "0 30px 90px rgba(15, 23, 42, 0.18)",
  },
  components: {
    Paper: {
      defaultProps: {
        radius: "lg",
        shadow: "sm",
        withBorder: true,
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        shadow: "sm",
        withBorder: true,
      },
    },
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: "xl",
        variant: "light",
      },
    },
    NavLink: {
      styles: {
        root: {
          borderRadius: "calc(0.875rem * var(--mantine-scale))",
          fontWeight: 600,
        },
      },
    },
    AppShell: {
      styles: {
        main: {
          backgroundColor: "transparent",
        },
      },
    },
  },
});
