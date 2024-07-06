import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

export interface BearState {
  bears: number;
  addABear: () => void;
}

export const useBearStore = create(
  devtools(
    persist<BearState>(
      (set, get) => ({
        bears: 0,
        addABear: () => set({ bears: get().bears + 1 }),
      }),
      {
        name: "food-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
