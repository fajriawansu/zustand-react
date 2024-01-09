import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserSlice {
  userId: number
  setUserId: (id: number) => void
}

interface BearSlice {
  bears: number
  addBear: () => void
  eatFish: () => void
}

interface FishSlice {
  fishes: number
  addFish: () => void
  addFishNum: (num: number) => void
}

interface SharedSlice {
  addBoth: () => void
  getBoth: () => void
}

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  userId: 0,
  setUserId: (id) => set(() => ({userId: id}))
})

const createBearSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})

const createFishSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  FishSlice
> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
  addFishNum: (num) => set((state) => ({fishes: state.fishes + num}))
})

const createSharedSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  SharedSlice
> = (set, get) => ({
  addBoth: () => {
    // you can reuse previous methods
    get().addBear()
    get().addFish()
    // or do them from scratch
    // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
  },
  getBoth: () => get().bears + get().fishes,
})

export const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
  ...createSharedSlice(...a),
}))

export const useBoundPersistStore = create<UserSlice>()(persist(
  (...a) => ({
    ...createUserSlice(...a)
  }), {name: "user-store"}
))