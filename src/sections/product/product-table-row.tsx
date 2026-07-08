/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { Button, DropdownMenu, DropdownMenuItem, DropdownMenuTrigger,TableCell, TableRow } from "@/components/ui";
import { EllipsisVertical, Eye, Pencil, Trash2 } from 'lucide-react';

// UI Local Components
import { CustomPopover } from "@/components/custom-popover";

// Utils
import type { PRODUCT } from "@/types";
import { fDate, fTime } from "@/utils";

/* -------------------------------------------------------------------------- */
/*                         PRODUCT TABLE ROW COMPONENT                        */
/* -------------------------------------------------------------------------- */
type Props = {
  row: PRODUCT;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
};

function ProductTableRow({
  row,
  onDeleteRow,
  onEditRow
}: Props) {
/* --------------------------------- CONSTS --------------------------------- */
  const {
    title, 
    prices: { sale }, 
    images,
    creationAt,
    category,
    stock = 0,
    maxStock = 200,
  } = row;

  // Manage stock percentage
  const getStockPercentage = (stock: number, max: number) =>
    Math.min(100, Math.max(0, Math.round((stock / max) * 100)));

  const getStockColor = (percentage: number) => {
    if (percentage <= 30) return 'bg-red-500';
    if (percentage <= 70) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const getStockLabel = () => {
    if (stock === 0) return 'out of stock';
    if (stock <= 30) return `${stock} low stock`;
    return `${stock} in stock`;
  };

  const percentage = getStockPercentage(stock, maxStock);
  const color = getStockColor(percentage);

  const renderProductPreview = (images: (File | string)[], title: string) => {
    if (!Array.isArray(images) || images.length === 0) {
      return <div className="w-[4rem] h-[4rem] rounded-xl bg-gray-300" />;
    }

    const firstItem = images[0];

    if (firstItem instanceof File) {
      return (
        <img 
          className="w-[4rem] h-[4rem] rounded-xl object-cover" 
          src={URL.createObjectURL(firstItem)}
          alt={title} 
        />
      );
    }

    if (typeof firstItem === 'string') {
      return (
        <img 
          className="w-[4rem] h-[4rem] rounded-xl object-cover" 
          src={firstItem} 
          alt={title} 
        />
      );
    }

    return <div className="w-[4rem] h-[4rem] rounded-xl bg-gray-300" />;
  };

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <TableRow>
      <TableCell className="max-w-xs p-4">
        <div className="flex items-center gap-3">
          {renderProductPreview(images, title)}
          <div className="flex flex-col gap-1">
            <h1 className="text-sm font-semibold whitespace-nowrap text-ellipsis overflow-hidden 
            cursor-pointer hover:text-blue-500 hover:underline transition-all duration-200">
              <a>{title ? title : 'Title'}</a>
            </h1>
            <h2 className="text-sm font-normal text-[#919EAB] cursor-text">
              {category}
            </h2>
          </div>
        </div>
      </TableCell>
      
      <TableCell className="text-sm font-normal">
        <div className="flex flex-col gap-1 p-4">
          <span className="hover:text-blue-500 transition-all duration-200">
            {creationAt ? fDate(creationAt) : fDate(new Date())}
          </span>
          <span className="text-sm lowercase font-normal text-[#919EAB]">
            {creationAt ? fTime(creationAt) : fTime(new Date())}
          </span>
        </div>
      </TableCell>

      <TableCell className="text-sm p-4">
        <div className="flex flex-col gap-2">
          <div className="h-1 w-[5rem] overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full rounded-full transition-all duration-300 ease-in-out ${color}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <h2 className="text-sm font-normal text-[#919EAB] cursor-text">
            {getStockLabel()}
          </h2>
        </div>
      </TableCell>

      <TableCell className="text-sm font-normal p-4 hover:text-blue-500 transition-all duration-200">${sale}</TableCell>

      <TableCell align="right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="border-0 shadow-none bg-transparent rounded-full cursor-pointer">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <CustomPopover align="end">
            <DropdownMenuItem className="cursor-pointer">
              <Eye />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={onEditRow}>
              <Pencil />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={onDeleteRow}>
              <Trash2 className="text-orange-500 " />
              <span className="text-orange-500">Delete</span>
            </DropdownMenuItem>
          </CustomPopover>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
};

export default ProductTableRow;