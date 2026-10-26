/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useState, type ComponentProps } from "react";
import FullCalendar, { useCalendarController } from "@fullcalendar/react"
import themePlugin from "@fullcalendar/react/themes/monarch";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import listPlugin from "@fullcalendar/react/list";
import interactionPlugin from "@fullcalendar/react/interaction";

// UI Local Components
import CalendarToolbar from "../calendar-toolbar";
import EventNewEditForm from "../event-new-edit-form";

// Utils
import { EVENTS } from "@/_mock";
import type { EVENT } from "@/types";

// Styles
import '@fullcalendar/react/skeleton.css';
import '@fullcalendar/react/themes/monarch/theme.css';
import '@fullcalendar/react/themes/monarch/palettes/purple.css';

/* -------------------------------------------------------------------------- */
/*                           CALENDAR VIEW COMPONENT                          */
/* -------------------------------------------------------------------------- */
type DateClickHandler = NonNullable<ComponentProps<typeof FullCalendar>["dateClick"]>;

function CalendarView() {
/* ---------------------------------- HOOKS --------------------------------- */
  const [events, setEvents] = useState<EVENT[]>(EVENTS);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

/* --------------------------------- CONSTS --------------------------------- */
  const controller = useCalendarController();
      
  const handleDateClick: DateClickHandler = (info) => {
    setSelectedDate(info.dateStr);
  };

  const firstDate = [...events].map((e) => String(e.start)).sort()[0];

/* ---------------------------- HANDLERS HELPERS ---------------------------- */
  const handleSaveEvent = (event: EVENT) =>
    setEvents((prev) =>
      prev.some((e) => e.id === event.id)
        ? prev.map((e) => (e.id === event.id ? event : e)) // edit
        : [...prev, event] // create
    );

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
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
        events={events}
        controller={controller}
        initialView='dayGridMonth'
        initialDate={firstDate}
        dateClick={handleDateClick}
        aspectRatio={2.2}
      />

      <EventNewEditForm
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  )
};

export default CalendarView;