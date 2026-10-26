/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Controller, useFormContext } from "react-hook-form";

// UI Lib Components
import { Label, Switch } from "../ui";

/* -------------------------------------------------------------------------- */
/*                            RHF SWITCH COMPONENT                            */
/* -------------------------------------------------------------------------- */
type RHFSwitchProps = { 
    name: string; 
    label: string;
    onChange?: (checked: boolean) => void 
};

function RHFSwitch({ name, label, onChange }: RHFSwitchProps) {
/* ------------------------------ CUSTOM HOOKS ------------------------------ */
  const { control } = useFormContext();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          <Switch
            id={name}
            checked={!!field.value}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              onChange?.(checked);
            }}
          />
          <Label htmlFor={name}>{label}</Label>
        </div>
      )}
    />
  );
};

export default RHFSwitch;