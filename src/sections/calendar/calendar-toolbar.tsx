/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { Button, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { CalendarDays, CalendarMinus2, CalendarRange, ChevronLeft, ChevronRight, List, ListFilter } from "lucide-react";

// Types
import type { CalendarToolbarProps } from "@/types";

/* -------------------------------------------------------------------------- */
/*                         CALENDAR TOOLBAR COMPONENT                         */
/* -------------------------------------------------------------------------- */
function CalendarToolbar({ controller }: CalendarToolbarProps) {
/* --------------------------------- CONSTS --------------------------------- */
    const buttons = controller.getButtonState();

    const VIEWS = [
        { value: "dayGridMonth", label: "Month", icon: CalendarDays },
        { value: "dayGridWeek", label: "Week", icon: CalendarRange },
        { value: "dayGridDay", label: "Day", icon: CalendarMinus2 },
        { value: "listWeek", label: "List", icon: List },
    ];

/* -------------------------------- RENDERING ------------------------------- */
    return (
      <div className="flex items-center justify-between p-4">
        {/* start: view icons switchers */}
        <ToggleGroup
            className="flex items-center gap-1 border border-back-200 rounded-sm p-1"
            type="single"
            value={controller.view?.type ?? "dayGridMonth"}
            onValueChange={(v) => v && controller.changeView(v)}
        >
            {VIEWS.map(({ value, label, icon: Icon }) => (
                <Tooltip key={value}>
                    <TooltipTrigger asChild>
                        <ToggleGroupItem
                            value={value}
                            aria-label={label}
                            className="group !h-6 !min-w-6 !p-1 !rounded-sm cursor-pointer aria-checked:bg-accent"
                        >
                            <Icon className="size-4 text-muted-foreground group-aria-checked:text-foreground" />
                        </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>{label}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </ToggleGroup>

        {/* center: prev / title / next */}
        <div className="flex items-center gap-2">
            <Button 
                className="min-h-4 p-2 rounded-full cursor-pointer" 
                variant="ghost" 
                size="icon" 
                aria-label="Previo
                us" onClick={() => controller.prev()}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="min-w-20 text-center font-semibold">{controller.view?.title}</h2>
            <Button 
                className="min-h-4 p-2 rounded-full cursor-pointer" 
                variant="ghost" 
                size="icon" 
                aria-label="Next" 
                onClick={() => controller.next()}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>

        {/* end: today + filter */}
        <div className="flex items-center">
          <Button
            className="text-xs bg-blue-500 text-white hover:bg-blue-700 hover:text-white cursor-pointer p-2"
            variant="outline"
            onClick={() => controller.today()}
            disabled={buttons.today.isDisabled}
          >
            {buttons.today.text}
          </Button>
          <Button
            className="border-0 shadow-none" 
            variant="outline" 
            size="icon" 
            aria-label="Filter" 
            onClick={() => {/* open filter popover */}}
          >
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
};

export default CalendarToolbar;