/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { cn } from "@/lib/utils";

// UI Lib Components
import { Controller, useFormContext } from "react-hook-form";

// UI Local Components
import { Upload, UploadBox } from "../upload";

// Utils
import type { UploadProps } from "../upload/types";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  multiple?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                          RHF UMPLAOD BOX COMPONENT                         */
/* -------------------------------------------------------------------------- */
export function RHFUploadBox({ name, ...other }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { control } = useFormContext();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox files={field.value} error={!!error} {...other} />
      )}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                            RHF UPLOAD COMPONENT                            */
/* -------------------------------------------------------------------------- */
function RHFUpload({ name, multiple, helperText, ...other }: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
  const { control } = useFormContext();

/* ----------------------------- RENDER FILES UI ---------------------------- */
  // const renderFiles = (
  //   <div className="flex gap-3 flex-wrap">
  //     {files?.map((file, index) => {
  //       const isImage = typeof file === 'string' 
  //         ? (file?.includes('.png') || file?.includes('.jpg') || file?.includes('.jpeg'))
  //         : file.type.startsWith('image/');

  //       const displayUrl = typeof file === 'string'
  //         ? file
  //         : (isImage ? URL.createObjectURL(file) : null);
  //       // const isImage = file.type.startsWith("image/");
  //       // const url = isImage ? URL.createObjectURL(file) : null;

  //       return (
  //         <div key={index}
  //         className="relative w-20 h-20 border border-gray-300 rounded overflow-hidden flex items-center justify-center text-xs">
  //           {isImage ? (
  //             <img
  //               src={URL!}
  //               alt={file.name}
  //               className="object-cover w-full h-full"
  //             />
  //           ) : (
  //             <div className="flex flex-col items-center">
  //               <img 
  //                 src='https://cdn-icons-png.flaticon.com/512/4726/4726010.png'
  //                 alt='pdf-icon'
  //                 className="object-contain w-10 h-10"
  //               />
  //               <p className="text-center mt-2 px-1 max-w-[10ch] truncate">{file.name}</p>
  //             </div>
  //           )}
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => 
        multiple ? (
          <Upload
            multiple
            accept={{ 'application/pdf': [], "image/*": [] }}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <p
                  className={cn(
                    "text-[0.8rem] font-medium px-2", 
                    error ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {error ? error?.message : helperText}
                </p>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            accept={{ 'application/pdf': [], "image/*": [] }}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <p
                  className={cn(
                    "text-[0.8rem] font-medium px-2", 
                    error ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {error ? error?.message : helperText}
                </p>
              )
            }
            {...other}
          />
        )}
    />
  )
};

export default RHFUpload;