/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lob Components
import { TableCell, TableRow } from "../ui";

/* -------------------------------------------------------------------------- */
/*                         TABLE EMPTY ROWS COMPONENT                         */
/* -------------------------------------------------------------------------- */
type Props = {
  height?: number;
  emptyRows: number;
};

function TableEmptyRows({ height, emptyRows }: Props) {
  if (!emptyRows) {
    return null;
  };

/* -------------------------------- RENDERING ------------------------------- */
  return <TableRow className=""
      style={{
        ...(height ? { height: `${height * emptyRows}px` } : {}),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
};

export default TableEmptyRows;