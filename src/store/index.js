import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchArtworks, fetchArtists } from "../utils/artworkUtils";

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
      collection: {},
      artworks: [],
      artists: [],
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
      //   getArtists: async (params) => {
      //     const response = await fetchArtists(params);
      //     set((state) => ({
      //       ...state,
      //       artists: response,
      //     }));
      //   },
      getCollection: (collection) =>
        set((state) => ({
          ...state,
          collection,
        })),
    }),
    {
      name: "virtual-gallery-storage",
    }
  )
);
