import { getEvents } from "@/lib/events";
import { create } from "zustand";
import { getEvents as getAllEvents } from "@/lib/events";

export const useEventsStore = create((set) => ({
  events: [],

  setEvents: (eventsList) => set((state) => ({ events: eventsList })),

  getEvents: async () => {
    const eventsList = await getAllEvents();
    set((state) => ({ events: eventsList }));
  },
}));