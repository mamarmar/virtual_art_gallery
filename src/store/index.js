import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialUserState = {
  id: null,
  email: "",
  session: {
    accessToken: "",
    expiresAt: null,
  },
};

export const useStore = create(
  persist(
    (set, get) => ({
      user: initialUserState,
      collections: [],
      artworks: [],
      logIn: (user) =>
        set((state) => ({
          ...state,
          user,
        })),
      logOut: () =>
        set((state) => ({
          ...state,
          user: initialUserState,
          collections: [],
        })),
    }),
    {
      name: "virtual-gallery-storage",
    }
  )
);
