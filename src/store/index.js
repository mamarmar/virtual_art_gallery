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
      ui: {
        loading: false
      },
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
        getArtworks: (artworks) =>
        set((state) => ({
          ...state,
          artworks,
        })),
    }),
    {
      name: "virtual-gallery-storage",
    }
  )
);
