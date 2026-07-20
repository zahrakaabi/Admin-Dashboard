/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useDropzone } from "react-dropzone";

// Utils
import type { UploadProps } from "./types";

/* -------------------------------------------------------------------------- */
/*                            UPLOAD BOX COMPOENNT                            */
/* -------------------------------------------------------------------------- */
function UploadBox({ placeholder, error, disabled, ...other }: UploadProps) {
/* --------------------------------- CONSTS --------------------------------- */
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        disabled,
        ...other,
    });

    const hasError = isDragReject || error;

/* -------------------------------- RENDERING ------------------------------- */
    return (
        <div
          {...getRootProps()} 
          className={`
            flex flex-col gap-3 items-center justify-center
            transition-all duration-200
            hover:opacity-[0.72]
            ${isDragActive ? 'opacity-[0.72]' : ''}
            ${disabled ? 'opacity-[0.48] pointer-events-none' : ''}
            ${hasError ? 'text-red-600 border-red-600 bg-red-600/[0.08]' : ''}
          `}
        >
            <input { ...getInputProps() } />
            {placeholder}
        </div>
    )
};

export default UploadBox;