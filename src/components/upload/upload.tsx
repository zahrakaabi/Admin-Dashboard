/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useDropzone } from "react-dropzone";

// UI Lib Components
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { UploadIcon, X } from "lucide-react";

// UI Local Components
import SingleFilePreview from "./preview-single-file";
import MultiFilePreview from "./preview-multi-file";
import ErrorRejectionsFiles from "./errors-rejection-files";

// Utils
import type { UploadProps } from "./types";
import { UploadIllustration } from "@/assets/illustrations";

/* -------------------------------------------------------------------------- */
/*                              UPLOAD COMPONENT                              */
/* -------------------------------------------------------------------------- */
function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,

  ...other
}: UploadProps) {
/* --------------------------------- CONSTS --------------------------------- */
  const { getRootProps, getInputProps, isDragReject, isDragActive, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });

  const hasFile = !!file && !multiple;
  const hasFiles = !!files && multiple && !!files.length;
  const hasError = isDragReject || !!error;

/* ----------------------------- SINGLE PREVIEW ---------------------------- */
  const renderSinglePreview = (
    <SingleFilePreview imgUrl={typeof file === 'string' ? file : file?.preview || ""} />
  ); 

  const removeSinglePreview = hasFile && onDelete && (
    <Button
      size="icon"
      variant="ghost"
      onClick={onDelete}
      className="absolute top-4 right-4 z-[9] h-8 w-8 rounded-full bg-neutral-900/70 text-white/80 hover:bg-neutral-900/50 hover:text-white"
    >
      <X className="h-4.5 w-4.5" />
      <span className="sr-only">Close</span>
    </Button>
  );

/* ---------------------------- MULTI PREVIEW UI ---------------------------- */
  const renderMultiPreview = hasFiles && (
    <>
      <div className="my-3">
        <MultiFilePreview files={files} thumbnail={thumbnail} onRemove={onRemove} />
      </div>

      <div className="flex flex-row justify-end gap-3">
        {onRemoveAll && (
          <Button color="inherit" variant="outline" size="sm" onClick={onRemoveAll}>
            Remove All
          </Button>
        )}
        {onUpload && (
          <Button className="cursor-pointer" size="sm" onClick={onUpload}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload
          </Button>
        )}
      </div>
    </>
  );

/* ----------------------------- PLACEHOLDER UI ----------------------------- */
  const renderPlaceholder = (
    <div className="my-3 flex items-center justify-center flex-wrap">
      <UploadIllustration />
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold">Drop or Select file</h2>
        <p className="text-sm text-muted-foreground">
          Drop files here or click{" "}
          <span className="mx-1 text-primary underline cursor-pointer">
            browse
          </span>{" "}
          through your machine
        </p>
      </div>
    </div>
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="relative w-full">
      <div className={cn(
        "relative overflow-hidden cursor-pointer rounded p-5 outline-none border border-gray-500/40 transition-[opacity,padding] duration-200 hover:opacity-[0.72]",
        
        isDragActive && "opacity-[0.72]",
        disabled && "opacity-50 pointer-events-none",
        hasError && "text-destructive border-destructive bg-destructive/10",
        hasFile && "py-[24%]"
      )} 
      {...getRootProps()}
      >
        <input {...getInputProps()} />
        {hasFile ? renderSinglePreview : renderPlaceholder}
      </div>

      {removeSinglePreview}

      {helperText && helperText}

      <ErrorRejectionsFiles fileRejections={fileRejections} />

      {renderMultiPreview}
    </div>
  )
};

export default Upload;