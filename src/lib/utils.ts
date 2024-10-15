import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function wait(t: number) {
    return new Promise((res) => {
        setTimeout(res, t);
    });
}
