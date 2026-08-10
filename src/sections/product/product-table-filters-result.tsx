/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import type React from "react";

// UI Lib Components
import { Badge, Button } from "@/components/ui";
import { Trash2, X } from "lucide-react";

// Packages
import type { IProductTableFilters, IProductTableFilterValue } from "@/types";
import { useCallback } from "react";

/* -------------------------------------------------------------------------- */
/*                   PRODUCT TABLE FILTERS RESULT COMPOENNT                   */
/* -------------------------------------------------------------------------- */
type Props = {
  filters: IProductTableFilters;
  onFilters: (search: string, value: IProductTableFilterValue) => void;
  onResetFilters: VoidFunction;
  results: number;
};

function ProductTableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results,
  ...other
}: Props) {
/* --------------------------------- CONSTS --------------------------------- */
  const handleRemoveStatus = useCallback(
    (stockStatus: string) => {
        const newValue = filters.stockStatus.filter((status) => status !== stockStatus);
        onFilters('stockStatus', newValue);
    },
    [filters.stockStatus, onFilters]
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className='flex flex-col gap-1.5 px-4 md:px-6' {...other}>
        <div className="text-sm">
            <strong className="font-semibold">{results}</strong>
            <span className="ml-1 text-muted-foreground">
                Found results
            </span>
        </div>

        <div className="flex flex-1 flex-row flex-wrap items-center gap-2">
            {filters.stockStatus.length && (
                <Block label="Status:">
                    {filters.stockStatus.map((stockStatus, index) => (
                        <Badge key={index} variant="secondary" className="gap-1 pr-1.5 font-normal capitalize">
                            {stockStatus}
                            <button
                            type="button"
                            onClick={() => handleRemoveStatus(stockStatus)}
                            className="rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none"
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove status</span>
                            </button>
                        </Badge>
                    ))}
                </Block>
            )}

            <Button
                variant="destructive"
                size="sm"
                onClick={onResetFilters}
                className="bg-transparent text-red-500 gap-2"
            >
                <Trash2 className="h-4 w-4" />
                Effacer
            </Button>
        </div>
    </div>
  );
};

export default ProductTableFiltersResult;

/* -------------------------------------------------------------------------- */
/*                                    BLOCK                                   */
/* -------------------------------------------------------------------------- */
interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  children: React.ReactNode;
}

function Block({ label, children, className = '', ...other }: BlockProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg border border-dashed border-border p-2 overflow-hidden ${className}`}
      {...other}
    >
      <span className="text-sm font-semibold leading-none text-foreground">
        {label}
      </span>

      <div className="flex flex-row flex-wrap items-center gap-2">
        {children}
      </div>
    </div>
  );
};