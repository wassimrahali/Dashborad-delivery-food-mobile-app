import { create } from "zustand";

type State = {
    name: string;
    description: string;
    reference: string;
    price: string;
    quantity: number;
    mainImage: File | null;
    otherImages: File[];
    isSoldOut: boolean;
    isPublished: boolean;
    categoryIds: number[];
    brand: string;
    colors: string[];
    details: { index: number; name: string; value: string }[];
    isTop: boolean;
    isTrending: boolean;
    promotion: {
        name?: string;
        startDate?: Date;
        endDate?: Date;
        discountedPrice?: string;
    } | null;
};

type Actions = {
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setReference: (reference: string) => void;
    setPrice: (price: string) => void;
    setQuantity: (quantity: number) => void;
    setMainImage: (mainImage: File) => void;
    addOtherImage: (image: File) => void;
    removeOtherImage: (index: number) => void;
    setIsSoldOut: (isSoldOut: boolean) => void;
    setIsPublished: (isPublished: boolean) => void;
    setCategoryIds: (categoryIds: number[]) => void;
    setBrand: (brand: string) => void;
    setColors: (colors: string[]) => void;
    setDetails: (details: State["details"]) => void;
    reset: () => void;
    setIsTop: (isTop: boolean) => void;
    setIsTrending: (isTop: boolean) => void;
    setPromotion: (promotion: State["promotion"]) => void;
};

type Store = State & Actions;

const initialState: State = {
    name: "",
    description: "",
    reference: "",
    price: "",
    quantity: 1,
    mainImage: null,
    otherImages: [],
    isSoldOut: false,
    isPublished: true,
    categoryIds: [],
    brand: "",
    isTop: false,
    isTrending: false,
    colors: [],
    details: [
        {
            index: 0,
            name: "",
            value: "",
        },
        {
            index: 1,
            name: "",
            value: "",
        },
    ],
    promotion: {
        name: "",
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    },
};

const useStore = create<Store>((set) => ({
    ...initialState,
    setName: (name) => set({ name }),
    setDescription: (description) => set({ description }),
    setReference: (reference) => set({ reference }),
    setPrice: (price) => set({ price }),
    setQuantity: (quantity) => set({ quantity }),
    setMainImage: (mainImage) => set({ mainImage }),
    addOtherImage: (image) =>
        set((state) => ({ otherImages: [...state.otherImages, image] })),
    removeOtherImage: (index) =>
        set((state) => ({
            otherImages: state.otherImages.filter((_, i) => i !== index),
        })),
    setIsSoldOut: (isSoldOut) => set({ isSoldOut }),
    setCategoryIds: (categoryIds) => set({ categoryIds }),
    setBrand: (brand) => set({ brand }),
    setIsPublished: (isPublished) => set({ isPublished }),
    reset: () => set(initialState),
    setColors: (colors) => set({ colors }),
    setDetails: (details) => set({ details }),
    setIsTop: (isTop) => set({ isTop }),
    setIsTrending: (isTrending) => set({ isTrending }),
    setPromotion: (promotion) => set({ promotion }),
}));

export default useStore;
