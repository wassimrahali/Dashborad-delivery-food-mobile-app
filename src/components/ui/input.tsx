import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 focus-visible:pl-4  focus-visible:outline-mainColor/40 font-medium placeholder:font-normal focus-visible:outline-offset-0 outline-offset-0 outline-mainColor/40   transition-all w-full rounded-md border border-zinc-300/80 bg-white px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500/70 disabled:cursor-not-allowed disabled:opacity-50  dark:placeholder:text-zinc-400 ",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
