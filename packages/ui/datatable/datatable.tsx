import { DataTableProvider } from "./datatable.provider";
import type { DataTableProps } from "./datatable.types";

import { DataTableContent } from "./_partials/datatable-content";
import { DataTableHeader } from "./_partials/datatable-header";
import { DataTableBody } from "./_partials/datatable-body";
import { DataTableFooter } from "./_partials/datatable-footer";

export function DataTable<TData>(
  props: DataTableProps<TData> & { children: React.ReactNode },
) {
  return <DataTableProvider {...props} />;
}

DataTable.Content = DataTableContent;
DataTable.Header = DataTableHeader;
DataTable.Body = DataTableBody;
DataTable.Footer = DataTableFooter;
