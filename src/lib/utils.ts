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
export const formatDate = (date: string | Date) => {
    const d = new Date(date);

    // Format date
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    // Format time
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    const formattedDate = d.toLocaleDateString("en-US", dateOptions);
    const formattedTime = d.toLocaleTimeString("en-US", timeOptions);

    // Calculate how long ago
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    let timeAgo;
    if (diffInSeconds < 60) {
        timeAgo = "just now";
    } else if (diffInMinutes < 60) {
        timeAgo = `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
        timeAgo = `${diffInHours}h ago`;
    } else if (diffInDays === 1) {
        timeAgo = "yesterday";
    } else if (diffInDays < 7) {
        timeAgo = `${diffInDays}d ago`;
    } else {
        timeAgo = formattedDate;
    }

    return {
        formattedTime,
        formattedDate,
        fullDateTime: `${formattedDate} ${`at ${formattedTime}`}`,
        timeAgo,
    };
};
