import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewNote } from "@/lib/api/clientApi";

type NoteDraftStore = {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
};

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

const createInitialDraft = (): NewNote => ({
  title: "",
  content: "",
  tag: "Todo",
});

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: createInitialDraft() }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
