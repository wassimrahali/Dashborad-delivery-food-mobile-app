import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export default function GeneralInfo() {
    return (
        <section className={cn("p-5 w-full h-[350px] border-2  rounded-xl")}>
            <div className="flex items-center text-black pb-3 font-semibold text-[20px] ">
                Information <Info className="ml-auto opacity-40" />
            </div>
            <div>
                <Label>Name</Label>
                <Input type="text" placeholder="Product name" />

                <div className="flex space-x-4 mt-3">
                    <div className="flex-1">
                        <Label>Price</Label>
                        <Input type="number" placeholder="Prix" />
                    </div>
                </div>
                <div className=" mt-3">
                    <Label>Category</Label>
                    <Select>
                        <SelectTrigger className="h-[40px]">
                            <SelectValue placeholder="Category"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Pizza</SelectItem>
                            <SelectItem value="2">Burger</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
}
