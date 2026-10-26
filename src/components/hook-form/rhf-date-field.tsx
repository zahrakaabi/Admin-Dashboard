/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Controller, useFormContext } from "react-hook-form";

// UI Lib Components
import { Input, Label } from "../ui";

/* -------------------------------------------------------------------------- */
/*                          RHF DATE FIELD COMPONENT                          */
/* -------------------------------------------------------------------------- */
export type DateFieldProps = {
  name: string;
  label: string;
  type?: "date" | "datetime-local";
  min?: string; // pass the start date to the end field
};

function RHFDateField({ name, label, type = "date", min }: DateFieldProps) {
/* ---------------------------------- HOOKS --------------------------------- */
  const { control } = useFormContext();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="form-group grid w-full items-center gap-3">
          <Label htmlFor={name}>{label}</Label>
          <Input
            ref={field.ref}
            id={name}
            type={type}
            min={min}
            className="w-full"
            value={field.value ?? ""}
            onChange={(event) => field.onChange(event.target.value)}
            onBlur={field.onBlur}
            aria-invalid={!!error}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default RHFDateField;