export type EVENT = {
    id: string;
    title: string;
    description?: string;
    start: string;
    end?: string;
    allDay?: boolean;
    color?: string;
};