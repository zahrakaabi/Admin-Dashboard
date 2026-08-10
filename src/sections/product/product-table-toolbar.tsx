/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isEqual } from "lodash";

// UI Lib Components
import { 
    Button, 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui";
import { Download, Printer, Search } from "lucide-react";

// UI Local Components
import { FormProvider, RHFMultiSelect } from "@/components/hook-form";

// Utils
import type { IProductTableFilters, IProductTableFilterValue, PRODUCT } from "@/types";
import { exportToCsv, printPage } from "@/utils";

/* -------------------------------------------------------------------------- */
/*                       PRODUCT TABLE TOLLBAR COMPONENT                      */
/* -------------------------------------------------------------------------- */
type Props = {
    filters: IProductTableFilters;
    onFilters: (name: string, value: IProductTableFilterValue) => void;
    data: PRODUCT[]
};

function ProductTableToolbar({ filters, onFilters, data }: Props) {
/* --------------------------- HANDLE STOCK STATUS -------------------------- */
  const methods = useForm({
    defaultValues: { stockStatus: filters.stockStatus },
  });

  const { watch, setValue } = methods;
  const stockStatus = watch('stockStatus');

  useEffect(() => {
    if (!isEqual(stockStatus, filters.stockStatus)) {
      onFilters('stockStatus', stockStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockStatus]);

  // filters -> form (external change: badge removed, reset, etc.)
  useEffect(() => {
    if (!isEqual(filters.stockStatus, stockStatus)) {
      setValue('stockStatus', filters.stockStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.stockStatus]);

/* ------------------------------ HANDLE SEARCH ----------------------------- */
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('search', event.target.value);
    },
    [onFilters]
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="flex flex-between px-4 md:px-6 p-4">
      <div className="flex items-end gap-4 w-full max-w-l mx-auto">
        <div className="w-full max-w-[13rem]">
          <FormProvider methods={methods}>
            <RHFMultiSelect
              name="stockStatus"
              placeholder="Stock"
              options={['In stock', 'Out of stock', 'Low stock']}
            />
          </FormProvider>
        </div>

        <div className="w-full max-w-[20rem]">
          <InputGroup>
            <InputGroupInput 
              className="w-full outline-none" 
              placeholder="Search..."
              value={filters.search}
              onChange={handleSearch}
            />
            <InputGroupAddon align="inline-start">
              <Search className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-none px-0 shadow-none gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem className="gap-2 cursor-pointer"
              onSelect={printPage}
            >
                <Printer className="h-4 w-4" />
                Print
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer"
              onSelect={() =>
                exportToCsv({
                data,
                columns: [
                    { key: "title", label: "Product" },
                    { get: (item: PRODUCT) => new Date(item.creationAt).toLocaleDateString("fr-FR"), label: "Create at" },
                    { key: "stock", label: "Stock" },
                    { get: (item: PRODUCT) => item.prices.sale, label: "Price" }
                ],
                filename: "Product list _ Dashboard",
                })
            }>
                <Download className="mr-2 size-4" />
                Download CSV
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
};

export default ProductTableToolbar;