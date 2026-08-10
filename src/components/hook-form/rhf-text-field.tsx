/* -------------------------------------------------------------------------- */
/*                                DEPENDNECIES                                */
/* -------------------------------------------------------------------------- */
// Packages

// UI Lib Components
import { Controller, useFormContext } from "react-hook-form";
import { Input, Label, Textarea } from "../ui";

/* -------------------------------------------------------------------------- */
/*                          RHF YEXY FIELD COMPOENNT                          */
/* -------------------------------------------------------------------------- */
type TextFieldProps = {
  type: string;
  label?: string;
  name: string;
  placeholder: string;
};

function RHFTextField({type, label, name, placeholder}: TextFieldProps) {
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
          <Input className="w-full" 
            id={name}
            type={type}  
            placeholder={placeholder} 
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  )
};

/* -------------------------------------------------------------------------- */
/*                           RHF TEXT AREA COMPONENT                          */
/* -------------------------------------------------------------------------- */
type TextAreaProps = {
  name: string;
  label: string;
  placeholder: string;
};

function RHFTextArea({name, label, placeholder}: TextAreaProps) {
/* ---------------------------------- HOOKS --------------------------------- */
  const { control } = useFormContext();
  
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="group-form grid w-full gap-3">
          <Label htmlFor={name}>{label}</Label>
          <Textarea 
            id={name} 
            placeholder={placeholder} 
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  )
};

export {RHFTextField, RHFTextArea};