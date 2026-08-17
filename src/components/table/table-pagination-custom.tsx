/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import type { ChangeEvent } from 'react';

// UI Lib Components
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Button, 
  Checkbox, 
  Field, 
  FieldLabel, 
  Label, 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui';

/* -------------------------------------------------------------------------- */
/*                      TABLE PAGINATION CUSTOM COMPONENT                     */
/* -------------------------------------------------------------------------- */
type Props = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function TablePaginationCustom({
  count,
  page,
  rowsPerPage = 5,
  onPageChange,
  onRowsPerPageChange,
  dense,
  onChangeDense
}: Props) {
/* --------------------------------- CONSTS --------------------------------- */
  const totalPages = Math.ceil(count / rowsPerPage);

  const firstRow = count === 0 ? 0 : page * rowsPerPage + 1;

  const lastRow = Math.min((page + 1) * rowsPerPage, count);

  const canGoPrevious = page > 0;
  const canGoNext = page < totalPages - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(null, page - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(null, page + 1);
    }
  };

  const handleRowsPerPageChange = (value: string) => {
    const event = {
      target: {
        value,
      },
    } as ChangeEvent<HTMLInputElement>;

    onRowsPerPageChange(event);
  };

  const handleDenseChange = (checked: boolean) => {
    if (!onChangeDense) return;

    const event = {
      target: {
        checked,
      },
    } as ChangeEvent<HTMLInputElement>;

    onChangeDense(event);
  };

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="flex items-center justify-end gap-4 p-4">
      {/* Rows per page */}
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select
          value={String(rowsPerPage)}
          onValueChange={handleRowsPerPageChange}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {[5,10,20].map((option: number) => (
                <SelectItem key={option} value={option.toString()}>{option.toString()}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      
      {/* Current range */}
      <div className="whitespace-nowrap text-sm text-muted-foreground">
        {firstRow}-{lastRow} of {count}
      </div>
      
      {/* Dense */}
      {onChangeDense && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="table-dense"
            checked={dense}
            onCheckedChange={handleDenseChange}
          />

          <Label
            htmlFor="table-dense"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Dense
          </Label>
        </div>
      )}

      {/* Pagination buttons */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          disabled={!canGoPrevious}
          onClick={handlePrevious}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          disabled={!canGoNext}
          onClick={handleNext}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default TablePaginationCustom;