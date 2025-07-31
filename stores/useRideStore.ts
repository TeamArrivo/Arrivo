import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Ride {
  id: string
  from: string
  fromAddress: string
  to: string
  toAddress: string
  date: string
  time: string
  fare?: string
  status: "upcoming" | "completed" | "cancelled"
  rideType: "go" | "courier"
  driver?: {
    name: string
    rating: number
    vehicleInfo: {
      make: string
      model: string
      plateNumber: string
    }
  }
  estimatedTime?: string
  distance?: number
}

interface RideStore {
  rides: Ride[]
  addRide: (ride: Omit<Ride, "id">) => void
  updateRideStatus: (rideId: string, status: Ride["status"]) => void
  getRidesByStatus: (status: Ride["status"]) => Ride[]
  clearRides: () => void
}

export const useRideStore = create<RideStore>()(
  persist(
    (set, get) => ({
      rides: [],

      addRide: (ride) => {
        const newRide: Ride = {
          ...ride,
          id: `ride_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        }

        set((state) => ({
          rides: [newRide, ...state.rides],
        }))
      },

      updateRideStatus: (rideId, status) => {
        set((state) => ({
          rides: state.rides.map((ride) => (ride.id === rideId ? { ...ride, status } : ride)),
        }))
      },

      getRidesByStatus: (status) => {
        return get().rides.filter((ride) => ride.status === status)
      },

      clearRides: () => {
        set({ rides: [] })
      },
    }),
    {
      name: "ride-storage",
    },
  ),
)
