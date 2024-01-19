import { create } from "zustand";

export const useSessionStore = create((set) => ({
  //Estado inicial
  userSession: null,

  setUserSession: (session) =>
    set((state) => ({
      userSession: session,
    })),
}));
