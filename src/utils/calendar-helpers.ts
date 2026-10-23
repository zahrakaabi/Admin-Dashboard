/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { 
    eachDayOfInterval,
    endOfDay,
    endOfMonth,
    endOfWeek, 
    isWithinInterval, 
    startOfDay, 
    startOfMonth, 
    startOfWeek 
} from "date-fns";

// Types
import type { CalendarEvent } from "@/types";

/* -------------------------------------------------------------------------- */
/*                            GET MONTH GRID HELPER                           */
/* -------------------------------------------------------------------------- */
export function getMonthGrid(date: Date) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
};

/* -------------------------------------------------------------------------- */
/*                            EVENTS FOR DAY HELPER                           */
/* -------------------------------------------------------------------------- */
export function eventsForDay(events: CalendarEvent[], day: Date) {
  return events
    .filter(e => isWithinInterval(day, { start: startOfDay(e.start), end: endOfDay(e.end) }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
};