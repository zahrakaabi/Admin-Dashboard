/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isEqual } from "lodash";

// UI Lib Components
import { 
    Button, 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui";
import { Download, EllipsisVertical, Printer, Search } from "lucide-react";

// UI Local Components
import { FormProvider, RHFMultiSelect } from "@/components/hook-form";

// Utils
import type { IUserTableFilters, IUserTableFilterValue, USER } from "@/types";
import { exportToCsv, printPage } from "@/utils";

/* -------------------------------------------------------------------------- */
/*                       PRODUCT TABLE TOLLBAR COMPONENT                      */
/* -------------------------------------------------------------------------- */
type Props = {
    filters: IUserTableFilters;
    onFilters: (name: string, value: IUserTableFilterValue) => void;
    data: USER[]
};

function UserTableToolbar({ filters, onFilters, data }: Props) {
/* --------------------------- HANDLE STOCK STATUS -------------------------- */
  const methods = useForm({
    defaultValues: { role: filters.role },
  });

  const { watch, setValue } = methods;
  const role = watch('role');

  useEffect(() => {
    if (!isEqual(role, filters.role)) {
      onFilters('role', role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  // filters -> form (external change: reset, etc.)
  useEffect(() => {
    if (!isEqual(filters.role, role)) {
      setValue('role', filters.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.role]);

/* ------------------------------ HANDLE SEARCH ----------------------------- */
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('search', event.target.value);
    },
    [onFilters]
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="flex flex-between px-4 md:px-6 p-4">
      <div className="flex items-end gap-4 w-full max-w-l mx-auto">
        <div className="w-full max-w-[13rem]">
          <FormProvider methods={methods}>
            <RHFMultiSelect
              name="role"
              placeholder="Role"
              options={['CEO', 'CTO', 'Project Coordinator', 'Team Leader', 'Software Engineer', 'UI Designer', 'UX Designer', 'Product Manager']}
            />
          </FormProvider>
        </div>

        <div className="w-full max-w-[20rem]">
          <InputGroup>
            <InputGroupInput 
              className="w-full outline-none" 
              placeholder="Search..."
              value={filters.search}
              onChange={handleSearch}
            />
            <InputGroupAddon align="inline-start">
              <Search className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-none px-0 shadow-none gap-2 cursor-pointer">
            <EllipsisVertical className="h-4 w-4" />
            {/* <Download className="h-4 w-4" />
            Export */}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem className="gap-2 cursor-pointer"
              onSelect={printPage}
            >
                <Printer className="h-4 w-4" />
                Print
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer"
              onSelect={() =>
                exportToCsv({
                  data,
                  columns: [
                    { key: "name", label: "User" },
                    { key: "email", label: "Email" },
                    { key: "phoneNumber", label: "Phone number" },
                    { key: "company", label: "Company" },
                    { key: "role", label: "Role" },
                  ],
                  filename: "User list _ Dashboard",
                })
            }>
                <Download className="mr-2 size-4" />
                Download CSV
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
};

export default UserTableToolbar;