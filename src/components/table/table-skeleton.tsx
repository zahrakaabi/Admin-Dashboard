/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { Skeleton, TableCell, TableRow } from "../ui";

/* -------------------------------------------------------------------------- */
/*                          TABLE SKELETON COMPONENT                          */
/* -------------------------------------------------------------------------- */
function TableSkeleton() {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <TableRow>
        <TableCell colSpan={12}>
            <div className="flex flex-row items-center gap-6">
                <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[180px]" />
                <Skeleton className="h-3 w-[180px]" />
                <Skeleton className="h-3 w-[180px]" />
                <Skeleton className="h-3 w-[180px]" />
            </div>
      </TableCell>
    </TableRow>
  )
};

export default TableSkeleton;