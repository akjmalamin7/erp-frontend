import { ReactNode } from "react";

export type TableSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "full";

export interface Column<T> {
  header: string | ReactNode;
  accessor?: keyof T;
  width?: string | number;
  className?: string;
  headerClassName?: string;
  render?: (value: any, row: T, index: number) => ReactNode;
  colSpan?: (row: T, index: number) => number;
  rowSpan?: (row: T, index: number) => number;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
  size?: TableSize;
}

const Table = <T extends { _id?: string | number; id?: string | number }>({
  columns,
  data,
  className = "",
  onRowClick,
  size = "md",
}: TableProps<T>) => {
  const sizeClasses: Record<TableSize, string> = {
    xs: "min-w-[400px]",
    sm: "min-w-[600px]",
    md: "min-w-[800px]",
    lg: "min-w-[1024px]",
    xl: "min-w-[1280px]",
    xxl: "min-w-[1536px]",
    full: "min-w-full",
  };

  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
        <table className={`table-shell ${sizeClasses[size]}`}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`${col.headerClassName || ""} whitespace-nowrap`}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row._id || row.id || rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={
                    onRowClick ? "cursor-pointer hover:bg-slate-50" : ""
                  }
                >
                  {columns.map((col, colIndex) => {
                    const cellValue = col.accessor
                      ? row[col.accessor]
                      : undefined;
                    const cSpan = col.colSpan
                      ? col.colSpan(row, rowIndex)
                      : undefined;
                    const rSpan = col.rowSpan
                      ? col.rowSpan(row, rowIndex)
                      : undefined;

                    return (
                      <td
                        key={colIndex}
                        className={`${col.className || ""} whitespace-nowrap`}
                        colSpan={cSpan}
                        rowSpan={rSpan}
                      >
                        {col.render
                          ? col.render(cellValue, row, rowIndex)
                          : ((cellValue as ReactNode) ?? "—")}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-slate-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
