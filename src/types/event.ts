export type EVENT = {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    color?: string;
    extendedProps?: { description: string };
};