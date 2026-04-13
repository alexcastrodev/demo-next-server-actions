import { createContext } from "react";
import type { DataTableContextValue } from "./datatable.types";

export const DataTableContext = createContext<DataTableContextValue | null>(
  null,
);
