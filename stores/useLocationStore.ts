import { create } from 'zustand';

interface LocationState {
  destination: {
    name: string;
    address: string;
  } | null;
  setDestination: (location: { name: string; address: string }) => void;
  clearDestination: () => void;
}

export const useLocationStore = create<LocationState>((set: (arg0: { destination: any; }) => any) => ({
  destination: null,
  setDestination: (location: any) => set({ destination: location }),
  clearDestination: () => set({ destination: null }),
}));
