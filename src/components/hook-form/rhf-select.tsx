/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

// UI Lib Components
import { 
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select, 
  SelectContent,
  SelectTrigger, 
  SelectValue 
} from "../ui";
import { ChevronDown } from "lucide-react";

// UI Local Components
import { RHFCheckbox } from "./rhf-checkbox";

/* -------------------------------------------------------------------------- */
/*                                 RHF SELECT                                 */
/* -------------------------------------------------------------------------- */
type RHFSelectProps = {
  name: string
  label?: string;
  placeholder: string,
  children?: React.ReactNode
};

export function RHFSelect({name, label, placeholder, children}: RHFSelectProps) {
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
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {children}
            </SelectContent>
          </Select>
          {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  )
};

/* -------------------------------------------------------------------------- */
/*                              RHF MULTI SELECT                              */
/* -------------------------------------------------------------------------- */
type RHFMultiSelectProps = RHFSelectProps & {
  options: string[];
};

export function RHFMultiSelect({ name, placeholder, label, options }: RHFMultiSelectProps) {
/* ---------------------------------- HOOKS --------------------------------- */
  const [open, setOpen] = useState(false);
  const [popoverWidth, setPopoverWidth] = useState<number>(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { control } = useFormContext();

  useEffect(() => {
    if (buttonRef.current) setPopoverWidth(buttonRef.current.offsetWidth)
  }, []);

/* -------------------------------- RENDERING ------------------------------- */
  return ( 
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="grid gap-2 w-full">
          <Label htmlFor={name}>{label}</Label>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button ref={buttonRef}
              variant="outline"
              className="group justify-between font-normal w-full hover:bg-white cursor-pointer"
              type="button">
                {field.value.length > 0 
                  ? <span className="truncate max-w-[140px]">{field.value.join(", ")}</span> 
                  : <span className="text-gray-500">{placeholder}</span>
                }
                <ChevronDown className="ml-2 h-4 w-4 opacity-50 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-1" style={{ width: popoverWidth }}>
              <div className="grid w-full">
                {options.map((option) => {
                  const isChecked = field.value.includes(option);
                  const toggle = () => {
                    const newValue = isChecked
                      ? field.value.filter((value: string) => value !== option)
                      : [...field.value, option];
                    field.onChange(newValue);
                  };
                  return (
                    <RHFCheckbox
                      key={option}
                      name={`${name}-${option}`}
                      className="hover:bg-gray-100 rounded-md p-2"
                      label={option}
                      checked={isChecked}
                      onClick={toggle}
                      onCheckedChange={toggle}
                    />
                  )}
                )}
              </div>
            </PopoverContent>
          </Popover>
          {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
      )} 
    />
  )
};