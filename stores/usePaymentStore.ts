// // stores/usePaymentStore.ts
// import { create } from 'zustand';

// interface PaymentMethod {
//   id: string;
//   label: string;
//   icon: string;
//   color: string;
// }

// interface PaymentStore {
//   selectedPaymentMethod: PaymentMethod | null;
//   setSelectedPaymentMethod: (method: PaymentMethod | null) => void;
//   clearPaymentMethod: () => void;
// }

// export const usePaymentStore = create<PaymentStore>((set) => ({
//   selectedPaymentMethod: null,
//   setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
//   clearPaymentMethod: () => set({ selectedPaymentMethod: null }),
// }));



import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface PaymentCard {
  id: string
  type: "visa" | "mastercard"
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  isDefault: boolean
  lastFourDigits: string
  createdAt: Date
}

export interface PaymentMethod {
  id: string
  label: string
  icon: string
  color: string
  type: "card" | "cash" | "digital"
  cardData?: PaymentCard
}

interface PaymentStore {
  selectedPaymentMethod: PaymentMethod | null
  savedCards: PaymentCard[]
  setSelectedPaymentMethod: (method: PaymentMethod | null) => void
  addCard: (card: Omit<PaymentCard, "id" | "createdAt" | "lastFourDigits">) => void
  updateCard: (cardId: string, updates: Partial<PaymentCard>) => void
  deleteCard: (cardId: string) => void
  setDefaultCard: (cardId: string) => void
  getPaymentMethods: () => PaymentMethod[]
  clearPaymentMethods: () => void
}

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set, get) => ({
      selectedPaymentMethod: null,
      savedCards: [],

      setSelectedPaymentMethod: (method) => {
        set({ selectedPaymentMethod: method })
      },

      addCard: (cardData) => {
        const newCard: PaymentCard = {
          ...cardData,
          id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          lastFourDigits: cardData.cardNumber.slice(-4),
          createdAt: new Date(),
        }

        set((state) => ({
          savedCards: [...state.savedCards, newCard],
        }))
      },

      updateCard: (cardId, updates) => {
        set((state) => ({
          savedCards: state.savedCards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  ...updates,
                  lastFourDigits: updates.cardNumber ? updates.cardNumber.slice(-4) : card.lastFourDigits,
                }
              : card,
          ),
        }))
      },

      deleteCard: (cardId) => {
        set((state) => {
          const updatedCards = state.savedCards.filter((card) => card.id !== cardId)
          // If deleted card was selected, clear selection
          const selectedMethod = state.selectedPaymentMethod
          const shouldClearSelection = selectedMethod?.cardData?.id === cardId

          return {
            savedCards: updatedCards,
            selectedPaymentMethod: shouldClearSelection ? null : selectedMethod,
          }
        })
      },

      setDefaultCard: (cardId) => {
        set((state) => ({
          savedCards: state.savedCards.map((card) => ({
            ...card,
            isDefault: card.id === cardId,
          })),
        }))
      },

      getPaymentMethods: () => {
        const { savedCards } = get()
        const methods: PaymentMethod[] = []

        // Add saved cards
        savedCards.forEach((card) => {
          methods.push({
            id: card.id,
            label: `${card.type.charAt(0).toUpperCase() + card.type.slice(1)} ****${card.lastFourDigits}`,
            icon: "card",
            color: card.type === "visa" ? "#1A1F71" : "#EB001B",
            type: "card",
            cardData: card,
          })
        })

        // Add cash option
        methods.push({
          id: "cash",
          label: "Cash",
          icon: "cash",
          color: "#10B981",
          type: "cash",
        })

        return methods
      },

      clearPaymentMethods: () => {
        set({ selectedPaymentMethod: null, savedCards: [] })
      },
    }),
    {
      name: "payment-storage",
    },
  ),
)
