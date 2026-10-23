/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import type { useCalendarController } from "@fullcalendar/react";

/* -------------------------------------------------------------------------- */
/*                               CALENDAR TYPES                               */
/* -------------------------------------------------------------------------- */
type EventColor = "purple" | "amber" | "green" | "cyan" | "red" | "slate";

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay: boolean;
  color: EventColor;
};

type CalendarControllerType = ReturnType<typeof useCalendarController>;

export type CalendarToolbarProps = {
  controller: CalendarControllerType;
};