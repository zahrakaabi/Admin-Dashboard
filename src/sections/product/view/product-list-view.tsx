/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

// UI Lib Components
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui";

// UI Local Components
import ProductTableRow from "../product-table-row";
import ProductTableToolbar from "../product-table-toolbar";

// Utils
import { useProducts } from "../context/use-products";
import { paths } from "@/routes/paths";
import type { PRODUCT, IProductTableFilters, IProductTableFilterValue } from "@/types";

/* -------------------------------------------------------------------------- */
/*                         PRODUCT LIST VIEW COMPONENT                        */
/* -------------------------------------------------------------------------- */
function ProductListView() {
/* ---------------------------------- HOOKS --------------------------------- */
  const [filters, setFilters] = useState<IProductTableFilters>({ search: '', stockStatus: [] });
  const { products } = useProducts();
  const navigate = useNavigate();

/* ----------------------------- HANDLE FILTERS ----------------------------- */
  const handleFilters = useCallback(
    (name: string, value: IProductTableFilterValue) => {
      // table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }, []
  );

  const dataFiltered = applyFilter({
    inputData: products,
    filters
  });

/* --------------------------------- CONSTS --------------------------------- */
  const TABLE_HEAD = [
    { label: 'Product', minWidth: 200 },
    { label: 'Create at', minWidth: 200 },
    { label: 'Stock', minWidth: 200 },
    { label: 'Price', width: 200 },
    { label: ''} //action
  ];

/* ------------------------------- HANDLE ROW ------------------------------- */
  const handleDeleteRow = (productId: string) => {
    console.log('Delete product with id:', productId);
  };

  const handleEditRow = (productId: string) => {
    navigate(paths.dashboard.product.edit(productId));
  };

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="mx-auto">
      <ProductTableToolbar
        filters={filters}
        onFilters={handleFilters}
        data={dataFiltered}
      />

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-700">
            {TABLE_HEAD.map((head) => <TableHead key={head.label} className="text-[#637381] font-semibold">
              {head.label}
            </TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataFiltered.map((row, index) => <ProductTableRow 
            key={index} 
            row={row}
            onDeleteRow={() => handleDeleteRow(row.id)}
            onEditRow={() => handleEditRow(row.id)}
          />)}
        </TableBody>
      </Table>
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