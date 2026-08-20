/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { DropdownMenuContent } from "../ui";

/* -------------------------------------------------------------------------- */
/*                           CUSTOM POOVER COMPONENT                          */
/* -------------------------------------------------------------------------- */
interface customPopoverProps {
   align?: 'center' | 'end' | 'start';
   children?: React.ReactNode;
};

function CustomPopover({ align, children }: customPopoverProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <DropdownMenuContent align={align}>
      {children}
    </DropdownMenuContent>
  )
}

export default CustomPopover;