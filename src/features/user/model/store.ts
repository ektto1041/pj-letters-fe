import { create } from "zustand";
import { User } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  setUser: (newUser: User) => void;
  setUserNull: () => void;
}

export const useUserState = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (newUser: User) => set({ user: newUser }),
      setUserNull: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
