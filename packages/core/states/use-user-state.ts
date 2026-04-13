import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  hydrated: boolean;
  token: string | null;
  setToken: (token: string) => void;
  setHydrated: (hydrated: boolean) => void;
  clear: () => void;
}

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      hydrated: false,
      token: null,
      setToken: (token) => set({ token }),
      setHydrated: (hydrated) => set({ hydrated }),
      clear: () => set({ token: null }),
    }),
    {
      name: "user-state",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
