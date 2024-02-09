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

export const useStore = create((set) => ({
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
}));

//Persist state 

// const useStore2 = create((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
//   }))

// export const useBearStore = create(
//     persist(
//       (set, get) => ({
//         bears: 0,
//         addABear: () => set({ bears: get().bears + 1 }),
//       }),
//       {
//         name: 'virtual-gallery-storage', // name of the item in the storage (must be unique)
//       },
//     ),
//   )
