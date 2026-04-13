import { Box, Progress, Table } from "@mantine/core";
import { useDataTableContext } from "../datatable.provider";

export function DataTableContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useDataTableContext();

  return (
    <Box>
      <Progress
        value={100}
        animated={isLoading}
        opacity={isLoading ? 1 : 0}
        size="xs"
        radius={0}
        style={{ transition: "opacity 150ms ease" }}
      />
      <Table.ScrollContainer minWidth={600}>
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          {children}
        </Table>
      </Table.ScrollContainer>
    </Box>
  );
}
