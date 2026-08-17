/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { TableCell, TableRow } from "../ui";

// UI Local Components
import { EmptyContent } from "../empty-content";

/* -------------------------------------------------------------------------- */
/*                           TABLE NO DATA COMPONENT                          */
/* -------------------------------------------------------------------------- */
function TableNoData({ notFound }: { notFound: boolean }) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
     <TableRow>
      {notFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            filled
            title="No Data"
            className="py-10"
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} className="p-0" />
      )}
    </TableRow>
  )
};

export default TableNoData;