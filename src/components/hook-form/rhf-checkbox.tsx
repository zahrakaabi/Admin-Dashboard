/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Controller, useFormContext } from "react-hook-form";

// UI Lib Components
import { Checkbox, Label } from "../ui";

/* -------------------------------------------------------------------------- */
/*                                RHF CHECKBOX                                */
/* -------------------------------------------------------------------------- */
type RHFCheckboxProps = {
  name: string;
  label: string;
  className?: string;
  checked: boolean;
  onClick: () => void;
  onCheckedChange: (checked: boolean) => void;
};

function RHFCheckbox({ name, label, className, checked, onClick, onCheckedChange }: RHFCheckboxProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className={`${className} flex items-center gap-2 cursor-pointer`} 
    onClick={onClick}>
      <Checkbox id={name}
        className="cursor-pointer data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
        checked={checked}
        onClick={(e) => e.stopPropagation()}
        onCheckedChange={onCheckedChange}
      />
      <Label className="text-sm font-normal cursor-pointer" htmlFor={name}>
        {label}
      </Label>
    </div>
  )
};

/* -------------------------------------------------------------------------- */
/*                         HRF MUTI CHECKBOX COMPONENT                        */
/* -------------------------------------------------------------------------- */
type RHFMultiCheckboxProps = {
  name: string;
  label?: string;
  options: string[];
  multiple?: boolean
};

function RHFMultiCheckbox({ name, label, options, multiple }: RHFMultiCheckboxProps) {
/* ---------------------------------- HOOKS --------------------------------- */
  const { control } = useFormContext();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const isChecked = (option: string) =>
          multiple
            ? Array.isArray(field.value) && field.value.includes(option)
            : field.value === option;

        const handleChange = (option: string) => {
          if (multiple) {
            const newValue = isChecked(option)
              ? field.value.filter((value: string) => value !== option)
              : [...field.value, option];

            field.onChange(newValue);
          } else {
            field.onChange(option);
          };
        };
        return (
          <div className="form-group grid w-full items-center gap-3">
            {label && <Label>{label}</Label>}
            <div className="flex gap-4">
              {options.map((option) => (
                <RHFCheckbox
                  key={option}
                  name={`${name}-${option}`}
                  label={option}
                  checked={isChecked(option)}
                  onClick={() => handleChange(option)}
                  onCheckedChange={() => handleChange(option)}
                />
              ))}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
          </div>
        )
      }}
    />
  );
};

export { RHFCheckbox, RHFMultiCheckbox };