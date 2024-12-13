import { create } from "zustand";
import { User } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  setUser: (newUser: User) => void;
}

export const useUserState = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (newUser: User) => set({ user: newUser }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
