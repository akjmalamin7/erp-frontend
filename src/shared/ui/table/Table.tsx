import { ReactNode } from "react";

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
}

const Table = <T extends { _id?: string | number; id?: string | number }>({
  columns,
  data,
  className = "",
  onRowClick,
}: TableProps<T>) => {
  return (
    <div className={`card overflow-x-auto ${className}`}>
      <table className="table-shell w-full">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={col.headerClassName || ""}
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
                className={onRowClick ? "cursor-pointer hover:bg-slate-50" : ""}
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
                      className={col.className || ""}
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
  );
};

export default Table;
