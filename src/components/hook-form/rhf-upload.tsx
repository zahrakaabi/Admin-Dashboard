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
/*                            HELPER TEXT COMPONENT                           */
/* -------------------------------------------------------------------------- */
interface FormHelperTextProps {
  error?: string;
  helperText?: React.ReactNode
};

function FormHelperText({ error, helperText }: FormHelperTextProps) {
  if (!error && !helperText) return null;

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <p
      className={cn(
        "text-[0.8rem] font-medium px-2 mt-1.5",
        error ? "text-destructive" : "text-muted-foreground"
      )}
    >
      {error || helperText}
    </p>
  );
}

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
        <UploadBox 
          files={field.value} 
          error={!!error} 
          onDrop={field.onChange} 
          {...other} 
        />
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
              <FormHelperText error={error?.message} helperText={helperText} />
            }
            onDrop={field.onChange}
            {...other}
          />
        ) : (
          <Upload
            accept={{ 'application/pdf': [], "image/*": [] }}
            file={field.value}
            error={!!error}
            helperText={
              <FormHelperText error={error?.message} helperText={helperText} />
            }
            onDrop={field.onChange}
            {...other}
          />
        )}
    />
  )
};

export default RHFUpload;