/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Types
import type { EVENT } from "@/types";

/* -------------------------------------------------------------------------- */
/*                              EVENTS DATA MOCK                              */
/* -------------------------------------------------------------------------- */
export const EVENTS: EVENT[] = [
  // October
  { id: "1", title: "Sprint kickoff", start: "2026-10-26" },
  { id: "2", title: "Design review", start: "2026-10-28T10:00:00", end: "2026-10-28T11:30:00" },
  { id: "3", title: "Client call", start: "2026-10-28T15:00:00", end: "2026-10-28T16:00:00" },
  { id: "4", title: "1:1 with manager", start: "2026-10-28T17:00:00", end: "2026-10-28T17:30:00" },
  { id: "5", title: "Release freeze", start: "2026-10-30", end: "2026-11-02" }, // Oct 30 to Nov 1

  // November
  { id: "6", title: "Team lunch", start: "2026-11-04T12:30:00", end: "2026-11-04T14:00:00" },
  { id: "7", title: "Retro", start: "2026-11-06" },
  { id: "8", title: "Product roadmap workshop", start: "2026-11-09", end: "2026-11-11" }, // Nov 9 to 10
  { id: "9", title: "Standup", start: "2026-11-12T09:30:00", end: "2026-11-12T09:45:00" },
  { id: "10", title: "Code review session", start: "2026-11-12T11:00:00", end: "2026-11-12T12:00:00" },
  { id: "11", title: "Dentist appointment", start: "2026-11-12T16:00:00", end: "2026-11-12T17:00:00" },
  { id: "12", title: "Sprint planning", start: "2026-11-16T10:00:00", end: "2026-11-16T12:00:00" },
  { id: "13", title: "Stakeholder demo", start: "2026-11-18T14:00:00", end: "2026-11-18T15:30:00" },
  { id: "14", title: "Hackathon", start: "2026-11-19", end: "2026-11-21" }, // Nov 19 to 20
  { id: "15", title: "Usability testing", start: "2026-11-19T10:00:00", end: "2026-11-19T12:00:00" },
  { id: "16", title: "Team offsite", start: "2026-11-23", end: "2026-11-26" }, // Nov 23 to 25
  { id: "17", title: "Quarterly review", start: "2026-11-27T13:00:00", end: "2026-11-27T15:00:00" },
  { id: "18", title: "Launch day", start: "2026-11-30" },

  // December
  { id: "19", title: "Bug bash", start: "2026-12-02T10:00:00", end: "2026-12-02T13:00:00" },
  { id: "20", title: "Year-end planning", start: "2026-12-04", end: "2026-12-07" }, // Dec 4 to 6
];