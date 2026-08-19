/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { 
    Button, 
    Dialog, 
    DialogClose,
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "../ui";

// Types
import type { ConfirmDialogProps } from "./types";

/* -------------------------------------------------------------------------- */
/*                               CONFIRM DIALOG                               */
/* -------------------------------------------------------------------------- */
function ConfirmDialog({ title, content, action, open, onClose }: ConfirmDialogProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {content && <DialogDescription>{content}</DialogDescription>}
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          {action}
          <DialogClose asChild>
            <Button className="bg-transparent rounded-md border border-gray-300 text-black" type="button" onClick={onClose}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export default ConfirmDialog;