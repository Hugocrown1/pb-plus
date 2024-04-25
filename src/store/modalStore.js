import { create } from "zustand";

export const useModalStore = create((set) => ({
  showModal: false,

  setShowModal: (show) => set((state) => ({ showModal: show })),

}));
