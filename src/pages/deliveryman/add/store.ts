import { create } from "zustand";

type State = {
    name: string;
    salary: number;
    phone: string;
    password: string,
};

type Actions = {
    setName: (name: string) => void;
    setPhone: (phone: string) => void;
    setSalary: (salary: number) => void;
    setPassword: (salary: string) => void;
    reset: () => void;
};

type Store = State & Actions;

const initialState: State = {

    name: "",
    phone: "",
    salary:0,
    password: "",

};

const useStore = create<Store>((set) => ({
    ...initialState,
    reset: () => set(initialState),
    setName: (name) => set({ name }),
    setPhone: (phone) => set({ phone }),
    setSalary: (salary) => set({ salary }),
    setPassword: (password) => set({ password }),
}));

export default useStore;
