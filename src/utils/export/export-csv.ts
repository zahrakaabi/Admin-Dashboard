/* -------------------------------------------------------------------------- */
/*                              EXPORT CSV TYPES                              */
/* -------------------------------------------------------------------------- */
type CsvValue = string | number | boolean | null | undefined;

export type CsvColumn<T> = {
  key?: keyof T;
  get?: (item: T) => CsvValue;
  label: string;
};

type ExportCsvOptions<T> = {
  filename: string;
  data: T[];
  columns: CsvColumn<T>[];
};


/* -------------------------------------------------------------------------- */
/*                              ESCAPE CSV VALUE                              */
/* -------------------------------------------------------------------------- */
function escapeCsvValue(value: CsvValue) {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

/* -------------------------------- RENDERING ------------------------------- */
  return stringValue;
};


/* -------------------------------------------------------------------------- */
/*                                EXPORT TO CSV                               */
/* -------------------------------------------------------------------------- */
export function exportToCsv<T>({
  filename,
  data,
  columns,
}: ExportCsvOptions<T>) {
  const headers = columns.map((column) => column.label);

  const rows = data.map((item) =>
    columns.map((column) => {
      const value = column.get
        ? column.get(item)
        : (item[column.key as keyof T] as CsvValue);
      return escapeCsvValue(value);
    })
  );

  const csv = [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${filename}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};