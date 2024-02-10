import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchArtworks } from "../utils/artworkUtils";

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
        loading: false,
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
      getArtworks: async (params) => {
        set((state) => ({
          ...state,
          ui: {
            loading: true,
          },
        }));
        const response = await fetchArtworks(params);
        set((state) => ({
          ...state,
          artworks: response,
          ui: {
            loading: false,
          },
        }));
      },
    }),
    {
      name: "virtual-gallery-storage",
    }
  )
);
