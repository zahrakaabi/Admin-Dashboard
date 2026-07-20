/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useDropzone } from "react-dropzone";

// UI Lib Components
import { Button } from "../ui";

// UI Local Components
import SingleFilePreview from "./preview-single-file";
import MultiFilePreview from "./preview-multi-file";

// Utils
import type { UploadProps } from "./types";
import { UploadIllustration } from "@/assets/illustrations";

/* -------------------------------------------------------------------------- */
/*                              UPLOAD COMPONENT                              */
/* -------------------------------------------------------------------------- */
function Upload({
  disabled,
  multiple = false,
  //error,
  helperText,
  //
  file,
  //
  files,
  thumbnail,
  onRemove,
  onRemoveAll,

  ...other
}: UploadProps) {
/* --------------------------------- CONSTS --------------------------------- */
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });

  console.log('file', file)

  const hasFile = !!file && !multiple;
  const hasFiles = !!files && multiple && !!files.length;
  // const hasError = isDragReject || !!error;

  const renderSinglePreview = (
    <SingleFilePreview imgUrl={typeof file === 'string' ? file : file?.preview || ""} />
  );

  const renderMultiPreview = hasFiles && (
    <>
      <div className="my-12">
        <MultiFilePreview files={files} thumbnail={thumbnail} onRemove={onRemove} />
      </div>

      <div className="flex flex-row justify-end gap-3">
        {onRemoveAll && (
          <Button color="inherit" variant="outline" size="sm" onClick={onRemoveAll}>
            Remove All
          </Button>
        )}
        {/*{onUpload && (
          <Button
            size="small"
            variant="contained"
            onClick={onUpload}
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          >
            Upload
          </Button>
        )}*/}
      </div>
    </>
  );

/* ----------------------------- PLACEHOLDER UI ----------------------------- */
  const renderPlaceholder = (
    <div>
      <UploadIllustration />
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold">Drop or Select file</h2>
        <p className="text-sm text-muted-foreground">
          Drop files here or click{" "}
          <span className="mx-1 text-primary underline cursor-pointer">
            browse
          </span>
          through your machine
        </p>
      </div>
    </div>
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {hasFile ? renderSinglePreview : renderPlaceholder}
      </div>
      {helperText && helperText}
      {renderMultiPreview}
    </div>
  )
}

export default Upload;