import { create } from "zustand";

type State = {
    name: string;
    price: number;
    categoryId: number | null;
    duration: string;
    description: string;
    sizes: string[];
    mainImage: string | null;
    otherImages: string[];
    rating: number;
};

type Actions = {
    setRating: (rating: number) => void;
    setName: (name: string) => void;
    setPrice: (price: number) => void;
    setCategoryId: (categoryId: number | null) => void;
    setDuration: (duration: string) => void;
    setDescription: (description: string) => void;
    setSizes: (sizes: string[]) => void;
    setMainImage: (mainImage: string | null) => void;
    setOtherImages: (otherImages: string[]) => void;
};

type Store = State & Actions;

const initialState: State = {
    rating: 4.9,
    categoryId: null,
    description: "",
    duration: "",
    mainImage: null,
    name: "",
    otherImages: [],
    price: 0,
    sizes: [],
};

const useStore = create<Store>((set) => ({
    ...initialState,
    setRating: (rating) => set({ rating }),
    setName: (name) => set({ name }),
    setPrice: (price) => set({ price }),
    setCategoryId: (categoryId) => set({ categoryId }),
    setDuration: (duration) => set({ duration }),
    setDescription: (description) => set({ description }),
    setSizes: (sizes) => set({ sizes }),
    setMainImage: (mainImage) => set({ mainImage }),
    setOtherImages: (otherImages) => set({ otherImages }),
}));

export default useStore;
