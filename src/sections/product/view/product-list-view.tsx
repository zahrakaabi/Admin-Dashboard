/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import isEqual from 'lodash/isEqual';
import { useSnackbar } from "notistack";

// UI Lib Components
import { Plus } from "lucide-react";
import { Button, Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui";

// UI Local Components
import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import ProductTableFiltersResult from "../product-table-filters-result";
import ProductTableRow from "../product-table-row";
import ProductTableToolbar from "../product-table-toolbar";
import { 
  emptyRows, 
  TableEmptyRows, 
  TableNoData, 
  TablePaginationCustom, 
  useTable 
} from "@/components/table";

// Utils
import { useProducts } from "../context/use-products";
import { paths } from "@/routes/paths";
import type { PRODUCT, IProductTableFilters, IProductTableFilterValue } from "@/types";

/* -------------------------------------------------------------------------- */
/*                         PRODUCT LIST VIEW COMPONENT                        */
/* -------------------------------------------------------------------------- */
const defaultFilters: IProductTableFilters = {
  search: '',
  stockStatus: []
};

function ProductListView() {
/* ---------------------------------- HOOKS --------------------------------- */
  const [filters, setFilters] = useState(defaultFilters);
  const { products, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const table = useTable();
  const { enqueueSnackbar } = useSnackbar();

/* ----------------------------- HANDLE FILTERS ----------------------------- */
  const dataFiltered = applyFilter({
    inputData: products,
    filters
  });

  const handleFilters = useCallback(
    (name: string, value: IProductTableFilterValue) => {
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
    { label: 'Product', minWidth: 200 },
    { label: 'Create at', minWidth: 200 },
    { label: 'Stock', minWidth: 200 },
    { label: 'Price', width: 200 },
    { label: ''} //action
  ];

/* ------------------------------- HANDLE ROW ------------------------------- */
  const handleDeleteRow = (rowId: string) => {
    deleteProduct(rowId);
    enqueueSnackbar('Deleted successfully !');
  };

  const handleEditRow = (productId: string) => {
    navigate(paths.dashboard.product.edit(productId));
  };

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="mx-auto w-full max-w-7xl">
      <CustomBreadcrumbs
        heading='List'
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.dashboard.product.list },
          { name: 'List', href: paths.dashboard.product.list }
        ]}
        action={
          <Button 
            className="cursor-pointer" 
            aria-label="Add product"
            title="Add product"
            onClick={() => navigate(paths.dashboard.product.create)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add product
          </Button>
        }
      />

      <div className="rounded-xl border shadow-sm mx-1 mt-8">
        {/* -------------------------- START PRODUCT FILTERS ------------------------- */}
        <ProductTableToolbar
          filters={filters}
          onFilters={handleFilters}
          data={dataFiltered}
        />

        {canReset && (
          <ProductTableFiltersResult
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
              {TABLE_HEAD.map((head) => <TableHead key={head.label} className="text-[#637381] font-semibold">
                {head.label}
              </TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataFiltered?.slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
              ?.map((row, index) => <ProductTableRow 
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

export default ProductListView;


/* -------------------------------------------------------------------------- */
/*                           APPLY FILTER HELPER                              */
/* -------------------------------------------------------------------------- */
function applyFilter({
  inputData,
  filters
}: {
  inputData: PRODUCT[];
  filters: IProductTableFilters;
}) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { search, stockStatus } = filters;

  if (search) {
    inputData = inputData?.filter(
      (product) => product.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  };

  if (stockStatus.length) {
    const normalizedStatus = stockStatus.map((stockStatus) => stockStatus.toLowerCase());
    inputData = inputData?.filter((product) =>
      normalizedStatus.includes(product.inventoryType.toLowerCase())
    );
  };

/* -------------------------------- RENDERING ------------------------------- */
  return inputData;
};