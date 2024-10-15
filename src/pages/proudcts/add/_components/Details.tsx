import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Info, Trash2, X } from "lucide-react";
import { useState } from "react";
import useStore from "../store";

export default function Details() {
    const sizes = useStore((s) => s.sizes);
    const setSizes = useStore((s) => s.setSizes);
    const [sizeInput, setSizeInput] = useState("");

    const description = useStore((s) => s.description);
    const setDescription = useStore((s) => s.setDescription);

    const duration = useStore((s) => s.duration);
    const setDuration = useStore((s) => s.setDuration);

    return (
        <section className={cn("p-5 w-full  border-2  rounded-xl")}>
            <div className="flex items-center text-black pb-3 font-semibold text-[20px] ">
                Other details <Info className="ml-auto opacity-40" />
            </div>
            <div>
                <Label>Preparation duration (in minutes)</Label>
                <Input
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                    type="number"
                    placeholder="Duration in minuts"
                />
                <div className="mt-3">
                    <Label>Description</Label>
                    <Textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Description"
                        className={cn("w-full p-2 border rounded-md h-fit")}
                    />
                </div>
                <div className="mt-3">
                    <Label>Sizes</Label>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!sizes.includes(sizeInput) && sizeInput) {
                                setSizes([...sizes, sizeInput]);
                            }
                            setSizeInput("");
                        }}
                        className="flex items-center gap-2">
                        <Input
                            value={sizeInput}
                            onChange={(e) => setSizeInput(e.target.value)}
                            type="text"
                            placeholder="Sizes"
                            className="flex-grow"
                        />
                        <Button
                            className="w-fit border-mainColor text-mainColor opacity-80  border-2 flex items-center px-3 h-[40px]   justify-center"
                            variant={"outline"}>
                            Add size
                        </Button>
                    </form>
                    <div className="mt-4 flex items-center gap-1 flex-wrap">
                        {sizes.map((item) => (
                            <span
                                key={item}
                                className="bg-black text-sm flex items-center w-fit gap-1 text-white font-medium pl-2 pr-1 py-1 rounded-md">
                                {item}
                                <X
                                    onClick={() => {
                                        setSizes(
                                            sizes.filter((s) => s !== item)
                                        );
                                    }}
                                    className="bg-white/90 text-black p-[3px] scale-75 stroke-[4] rounded-full"
                                />
                            </span>
                        ))}
                        {sizes.length > 0 && (
                            <Trash2
                                onClick={() => setSizes([])}
                                className="bg-red-500 h-[32px] w-[32px] text-white p-[6px] hover:cursor-pointer transition-all hover:bg-red-600 active:scale-95 rounded"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
