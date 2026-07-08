/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

// UI Lib Components
import { Card, Label } from "../ui";

// Assets
import { UploadIllustration } from "@/assets/illustrations";

/* -------------------------------------------------------------------------- */
/*                            RHF UPLOAD COMPONENT                            */
/* -------------------------------------------------------------------------- */
type RHFUploadProps = {
  name: string;
};

function RHFUpload({ name }: RHFUploadProps) {
/* ---------------------------------- HOOKS --------------------------------- */
  const { control, setValue, getValues, watch } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const files = watch(name) as File[] | undefined;

  console.log('files', files)

/* -------------------------------- CONSTANTS ------------------------------- */
  const handleFiles = (filesList: FileList | null) => {
    if (!filesList) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    const newFiles = Array.from(filesList).filter((file) =>
      validTypes.includes(file.type)
    );

    if (newFiles.length === 0) {
      alert("Only PDF, PNG, JPG, or JPEG files are allowed.");
      return;
    };

    const prevFiles = getValues(name) || [];
    const updatedFiles = [...prevFiles, ...newFiles];

    setValue(name, updatedFiles, { shouldValidate: true });
  };

/* -------------------------- RENDER PLACEHOLDER UI ------------------------- */
  const renderPlaceholder = (
    <div className="flex flex-col gap-3 items-center justify-center">
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

/* ----------------------------- RENDER FILES UI ---------------------------- */
  const renderFiles = (
    <div className="flex gap-3 flex-wrap">
      {/* {files?.map((file, index) => {
        const isImage = file.type.startsWith("image/");
        const url = isImage ? URL.createObjectURL(file) : null;

        return (
          <div key={index}
          className="relative w-20 h-20 border border-gray-300 rounded overflow-hidden flex items-center justify-center text-xs">
            {isImage ? (
              <img
                src={url!}
                alt={file.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex flex-col items-center">
                <img 
                  src='https://cdn-icons-png.flaticon.com/512/4726/4726010.png'
                  alt='pdf-icon'
                  className="object-contain w-10 h-10"
                />
                <p className="text-center mt-2 px-1 max-w-[10ch] truncate">{file.name}</p>
              </div>
            )}
          </div>
        );
      })} */}
    </div>
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div className="group-form grid w-full gap-3">
          <Label htmlFor="upload">Images</Label>
          <Card className="p-5 outline-none rounded cursor-pointer overflow-hidden relative bg-gray-100 border border-dashed border-gray-300 transition-all duration-200 hover:opacity-70"
          id="upload"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}>
            {renderPlaceholder}
            <input
              type="file"
              multiple
              accept=".png,.jpg,.jpeg,.pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </Card>
          {files && renderFiles}
          {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  )
};

export default RHFUpload;