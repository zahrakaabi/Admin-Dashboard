/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { Download } from "lucide-react";
import { Button } from "../ui";

/* -------------------------------------------------------------------------- */
/*                          DOWNLOAD BUTTON COMPONENT                         */
/* -------------------------------------------------------------------------- */
type Props = {
  onDownload?: VoidFunction;
};

function DownloadButton({ onDownload }: Props) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Button
        variant="ghost"
        onClick={onDownload}
        className="absolute inset-0 z-[9] h-full w-full rounded-none p-0 opacity-0 transition-opacity duration-200 hover:bg-neutral-900/64 hover:opacity-100 hover:backdrop-blur-sm text-white hover:text-white"
    >
        <Download className="h-6 w-6" />
        <span className="sr-only">Download</span>
    </Button>
  );
};

export default DownloadButton;