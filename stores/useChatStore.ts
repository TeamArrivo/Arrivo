import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ChatMessage {
  id: string
  text: string
  sender: "user" | "driver"
  timestamp: Date
  rideId?: string // Associate messages with specific rides
}

interface ChatStore {
  messages: ChatMessage[]
  currentRideId: string | null
  addMessage: (message: Omit<ChatMessage, "id">) => void
  clearMessagesForRide: (rideId: string) => void
  getMessagesForRide: (rideId: string) => ChatMessage[]
  setCurrentRideId: (rideId: string | null) => void
  clearAllMessages: () => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      currentRideId: null,

      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          rideId: get().currentRideId || undefined,
        }

        set((state) => ({
          messages: [...state.messages, newMessage],
        }))
      },

      clearMessagesForRide: (rideId) => {
        set((state) => ({
          messages: state.messages.filter((msg) => msg.rideId !== rideId),
        }))
      },

      getMessagesForRide: (rideId) => {
        return get().messages.filter((msg) => msg.rideId === rideId)
      },

      setCurrentRideId: (rideId) => {
        set({ currentRideId: rideId })
      },

      clearAllMessages: () => {
        set({ messages: [] })
      },
    }),
    {
      name: "chat-storage",
    },
  ),
)
