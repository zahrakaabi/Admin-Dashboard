/* -------------------------------------------------------------------------- */
/*                                 EMPTY ROWS                                 */
/* -------------------------------------------------------------------------- */
export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
};

/* -------------------------------------------------------------------------- */
/*                            DESCENDING COMPARATOR                           */
/* -------------------------------------------------------------------------- */
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (a[orderBy] === null || a[orderBy] === undefined) {
    return 1;
  }
  if (b[orderBy] === null || b[orderBy] === undefined) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

/* -------------------------------------------------------------------------- */
/*                               GET COMPARATOR                               */
/* -------------------------------------------------------------------------- */
export function getComparator<Key extends PropertyKey>(
  order: 'asc' | 'desc',
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

/* -------------------------------------------------------------------------- */
/*                                 APPLY SORT                                 */
/* -------------------------------------------------------------------------- */
export function applySort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilized = array.map((el, index) => [el, index] as [T, number]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
};