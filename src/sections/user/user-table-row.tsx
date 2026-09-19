/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { Button, DropdownMenu, DropdownMenuItem, DropdownMenuTrigger,TableCell, TableRow } from "@/components/ui";
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';

// UI Local Components
import { CustomPopover } from "@/components/custom-popover";

// Utils
import type { USER, UserStatus } from "@/types";
import { ConfirmDialog } from "@/components/custom-dialog";
import { useBoolean } from "@/hooks";

/* -------------------------------------------------------------------------- */
/*                           USER TABLE ROW COMPONENT                         */
/* -------------------------------------------------------------------------- */
type Props = {
  row: USER;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
};

function UserTableRow({
  row,
  onDeleteRow,
  onEditRow
}: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
  const confirm = useBoolean();

/* --------------------------------- CONSTS --------------------------------- */
  const {
    images,
    name, 
    email,
    phoneNumber,
    company,
    role,
    status
  } = row;

  const renderProductPreview = (images: string[], name: string) => {
    if (!Array.isArray(images) || images.length === 0) {
      return <div className="w-[4rem] h-[4rem] rounded-xl bg-gray-300" />;
    }

    const firstItem = images[0];

    return (
        <img 
            className="w-[4rem] h-[4rem] rounded-xl object-cover" 
            src={firstItem} 
            alt={name} 
        />
    );
  };

  const statusStyles: Record<UserStatus, string> = {
    Active: "bg-green-100 text-green-700 ring-1 ring-green-600/20",
    Pending: "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-600/20",
    Banned: "bg-red-100 text-red-700 ring-1 ring-red-600/20",
  };

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <>
      <TableRow>
        <TableCell className="max-w-xs p-4">
          <div className="flex items-center gap-3">
            {renderProductPreview(images, name)}
            <div className="flex flex-col gap-1">
              <h1 className="text-sm font-semibold whitespace-nowrap text-ellipsis overflow-hidden 
              cursor-pointer hover:text-blue-500 hover:underline transition-all duration-200">
                <a>{name ? name : 'Name'}</a>
              </h1>
              <h2 className="text-sm font-normal text-[#919EAB] cursor-text">
                {email}
              </h2>
            </div>
          </div>
        </TableCell>

        <TableCell className="text-sm font-normal">{phoneNumber}</TableCell>
        
        <TableCell className="text-sm font-normal">{company}</TableCell>
        
        <TableCell className="text-sm font-normal">{role}</TableCell>

        <TableCell>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
                {status}
            </span>
        </TableCell>

        <TableCell align="right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="border-0 shadow-none bg-transparent rounded-full cursor-pointer">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <CustomPopover align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={onEditRow}>
                <Pencil />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={confirm.onTrue}>
                <Trash2 className="text-orange-500 " />
                <span className="text-orange-500">Delete</span>
              </DropdownMenuItem>
            </CustomPopover>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button 
            className="bg-red-500" 
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  )
};

export default UserTableRow;