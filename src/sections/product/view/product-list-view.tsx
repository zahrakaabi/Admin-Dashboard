/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui";

// UI Local Components
import ProductTableRow from "../product-table-row";

// Utils
import { useProducts } from "../context/use-products";

/* -------------------------------------------------------------------------- */
/*                         PRODUCT LIST VIEW COMPONENT                        */
/* -------------------------------------------------------------------------- */
function ProductListView() {
/* --------------------------------- CONSTS --------------------------------- */
  const { products } = useProducts();

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

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="mx-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-700">
            {TABLE_HEAD.map((head) => <TableHead key={head.label} className="text-[#637381] font-semibold">
              {head.label}
            </TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((row, index) => <ProductTableRow 
            key={index} 
            row={row}
            onDeleteRow={() => handleDeleteRow(row.id)}
          />)}
        </TableBody>
      </Table>
    </div>
  )
};

export default ProductListView;