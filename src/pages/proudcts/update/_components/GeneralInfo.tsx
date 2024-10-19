import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import CategorySelect from "./CategorySelect";
import useStore from "../store";

export default function GeneralInfo() {
    const name = useStore((s) => s.name);
    const setName = useStore((s) => s.setName);
    const price = useStore((s) => s.price);
    const setPrice = useStore((s) => s.setPrice);
    const setRating = useStore((s) => s.setRating);
    const rating = useStore((s) => s.rating);

    return (
        <section className={cn("p-5 w-full border-2  rounded-xl")}>
            <div className="flex items-center text-black pb-3 font-semibold text-[20px] ">
                Information <Info className="ml-auto opacity-40" />
            </div>
            <div>
                <Label>Name</Label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Product name"
                />

                <div className="flex space-x-4 mt-3">
                    <div className="flex-1">
                        <Label>Price</Label>
                        <Input
                            value={price}
                            onChange={(e) =>
                                setPrice(Number(e.target.value || 0))
                            }
                            type="number"
                            placeholder="Prix"
                        />
                    </div>
                </div>
                <CategorySelect />
                <div className="flex space-x-4 mt-3">
                    <div className="flex-1">
                        <Label>Rating</Label>
                        <Input
                            max={5}
                            min={0}
                            value={rating || ""}
                            onChange={(e) =>
                                setRating(Number(e.target.value || 0))
                            }
                            type="number"
                            placeholder="Prix"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
