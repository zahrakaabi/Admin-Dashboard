/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import isEqual from 'lodash/isEqual';
import { useSnackbar } from "notistack";

// UI Lib Components
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { Button, Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui";

// UI Local Components
import UserTableFiltersResult from "../user-table-filters-result";
import UserTableRow from "../user-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { 
  applySort,
  emptyRows, 
  getComparator, 
  TableEmptyRows, 
  TableNoData, 
  TablePaginationCustom, 
  useTable 
} from "@/components/table";

// Utils
import { useUser } from "../context/use-user";
import { paths } from "@/routes/paths";
import type { IUserTableFilters, IUserTableFilterValue, USER } from "@/types";
import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";

/* -------------------------------------------------------------------------- */
/*                          USER LIST VIEW COMPONENT                          */
/* -------------------------------------------------------------------------- */
const defaultFilters: IUserTableFilters = {
  search: '',
  role: []
};

function UserListView() {
/* ---------------------------------- HOOKS --------------------------------- */
  const [filters, setFilters] = useState(defaultFilters);
  const { users, deleteUser } = useUser();
  const navigate = useNavigate();
  const table = useTable();
  const { enqueueSnackbar } = useSnackbar();

/* ----------------------------- HANDLE FILTERS ----------------------------- */
  const dataFiltered = applyFilter({
    inputData: users,
    filters,
    comparator: getComparator(table.order, table.orderBy)
  });

  const handleFilters = useCallback(
    (name: string, value: IUserTableFilterValue) => {
      // table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }, []
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const denseHeight = table.dense ? 56 : 56 + 20;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

/* --------------------------------- CONSTS --------------------------------- */
  const TABLE_HEAD = [
    { id: 0, label: 'Name', minWidth: 200 },
    { id: 1, label: 'Phone number', minWidth: 200 },
    { id: 2, label: 'Company', minWidth: 200 },
    { id: 3, label: 'Role', width: 200 },
    { id: 4, label: 'Status', width: 200 },
    { id: 5, label: '' } //action
  ];

/* ------------------------------- HANDLE ROW ------------------------------- */
  const handleDeleteRow = (rowId: string) => {
    deleteUser(rowId);
    enqueueSnackbar('Deleted successfully !');
  };

  const handleEditRow = (userId: string) => {
    navigate(paths.dashboard.user.edit(userId));
  };

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="mx-auto w-full max-w-7xl">
      <CustomBreadcrumbs
        heading='List'
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.list },
          { name: 'List', href: paths.dashboard.user.list }
        ]}
        action={
          <Button 
            className="cursor-pointer" 
            aria-label="Add user"
            title="Add user"
            onClick={() => navigate(paths.dashboard.user.create)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add user
          </Button>
        }
      />

      <div className="rounded-xl border shadow-sm mx-1 mt-8">
        {/* -------------------------- START USER FILTERS ------------------------- */}
        <UserTableToolbar
          filters={filters}
          onFilters={handleFilters}
          data={dataFiltered}
        />

        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={dataFiltered.length}
          />
        )}
        {/* --------------------------- END PRODUCT FILTERS -------------------------- */}

        {/* --------------------------- START PRODUCT LIST --------------------------- */}
        <Table className="mt-4">
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-700">
              {TABLE_HEAD.map((head) => (
                <TableHead
                  key={head.id || head.label}
                  className="text-[#637381] font-semibold"
                  style={{ minWidth: head.minWidth, width: head.width }}
                >
                  {head.label ? (
                    <button onClick={() => table.onSort(head.id)} className="flex items-center gap-1 cursor-pointer">
                      {head.label}
                      {table.orderBy === head.id && (
                        table.order === 'asc'
                          ? <ArrowUp className="h-3 w-3" />
                          : <ArrowDown className="h-3 w-3" />
                      )}
                    </button>
                  ) : (
                    head.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {dataFiltered?.slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
              ?.map((row, index) => <UserTableRow 
                key={index} 
                row={row}
                onDeleteRow={() => handleDeleteRow(row.id)}
                onEditRow={() => handleEditRow(row.id)}
              />
            )}

            <TableEmptyRows
              height={denseHeight}
              emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
            />

            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
        {/* ---------------------------- END PRODUCT LIST ---------------------------- */}
      </div>
    </div>
  )
};

export default UserListView;


/* -------------------------------------------------------------------------- */
/*                           APPLY FILTER HELPER                              */
/* -------------------------------------------------------------------------- */
function applyFilter({
  inputData,
  filters,
  comparator
}: {
  inputData: USER[];
  filters: IUserTableFilters;
  comparator: (a: USER, b: USER) => number;
}) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { search, role } = filters;

  inputData = applySort(inputData, comparator);

  if (search) {
    inputData = inputData?.filter(
      (user) => user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  };

  if (role.length) {
    inputData = inputData?.filter((user) =>
      role.includes(user.role)
    );
  };

/* -------------------------------- RENDERING ------------------------------- */
  return inputData;
};