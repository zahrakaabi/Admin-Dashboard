/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useDropzone } from "react-dropzone";

// UI Lib Packages
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";

// UI Local Components
import Image from "../image";
import ErrorRejectionsFiles from "./errors-rejection-files";

// Types & helpers
import type { UploadProps } from "./types";

/* -------------------------------------------------------------------------- */
/*                           UPLOAD AVATAR COMPONENT                          */
/* -------------------------------------------------------------------------- */
function UploadAvatar({
  error,
  file,
  disabled,
  helperText,
  ...other
}: UploadProps) {
/* --------------------------------- CONSTS --------------------------------- */
    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        multiple: false,
        disabled,
        accept: {
        'image/*': [],
        },
        ...other,
    });

    const hasFile = !!file;
    const hasError = isDragReject || !!error;
    const imgUrl = typeof file === 'string' ? file : file?.preview;

/* -------------------------------- PREVIEW UI ------------------------------- */
    const renderPreview = hasFile && (
        <Image
            alt="avatar"
            src={imgUrl}
            disabledEffect
            visibleByDefault
            className="w-full h-full object-cover rounded-full"
        />
    );

/* ----------------------------- PLACEHOLDER UI ----------------------------- */
    const renderPlaceholder = (
        <div className={cn(
            "upload-placeholder flex flex-col items-center justify-center gap-1 absolute inset-0 z-10 rounded-full transition-opacity duration-200 cursor-pointer",
            "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
            
            hasFile ? "opacity-0 hover:opacity-100 bg-slate-900/60 text-white dark:bg-slate-900/75" : "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
            hasError && "text-destructive bg-destructive/10 border-2 border-dashed border-destructive"
        )}>
            <Camera className="size-8" />
            <span className="text-xs font-normal text-muted-foreground">
                {file ? 'Update photo' : 'Upload photo'}
            </span>
        </div>
    );

/* ------------------------------- CONTENT UI ------------------------------- */
    const renderContent = (
        <div className="relative w-full h-full overflow-hidden rounded-full">
            {renderPreview}
            {renderPlaceholder}
        </div>
    );

/* -------------------------------- RENDERING ------------------------------- */
    return (
        <>
            <div className={cn(
                "relative w-full h-full group [&_.upload-placeholder]:hover:opacity-100 m-auto p-2 size-36 cursor-pointer overflow-hidden rounded-full",
                
                isDragActive && "opacity-[0.72]",
                disabled && "pointer-events-none opacity-[0.48]",
                hasError && "bg-destructive/10",
            )}
            {...getRootProps()}
            >
                <input {...getInputProps()} />
                {renderContent}
            </div>

            {helperText && helperText}

            <ErrorRejectionsFiles fileRejections={fileRejections} />
        </>
    )
};

export default UploadAvatar;