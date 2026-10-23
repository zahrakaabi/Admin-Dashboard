/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import type { ComponentProps } from "react";
import FullCalendar, { useCalendarController } from "@fullcalendar/react"
import themePlugin from "@fullcalendar/react/themes/monarch";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import listPlugin from "@fullcalendar/react/list";
import interactionPlugin from "@fullcalendar/react/interaction";

// UI Local Components
import CalendarToolbar from "../calendar-toolbar";

// Styles
import '@fullcalendar/react/skeleton.css';
import '@fullcalendar/react/themes/monarch/theme.css';
import '@fullcalendar/react/themes/monarch/palettes/purple.css';

/* -------------------------------------------------------------------------- */
/*                           CALENDAR VIEW COMPONENT                          */
/* -------------------------------------------------------------------------- */
type DateClickHandler = NonNullable<ComponentProps<typeof FullCalendar>["dateClick"]>;

function CalendarView() {
/* --------------------------------- CONSTS --------------------------------- */
  const controller = useCalendarController();
      
  const handleDateClick: DateClickHandler = (info) => {
    alert('handle add event...' + info.dateStr)
  };

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="border border-black-200 rounded-xl">
      <CalendarToolbar controller={controller} />

      <FullCalendar
        plugins={[
          themePlugin,
          dayGridPlugin,
          interactionPlugin,
          listPlugin,
        ]}
        controller={controller}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
      />
    </div>
  )
};

export default CalendarView;