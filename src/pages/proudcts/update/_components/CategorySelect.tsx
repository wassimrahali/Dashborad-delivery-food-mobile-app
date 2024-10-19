import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { apiInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useStore from "../store";

export default function CategorySelect() {
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    useEffect(() => {
        fetchCategories()
            .then((data) => setAllCategories(data))
            .catch((err) => {
                console.error(err);
                toast.error("There is an error while fetching the categories");
            });
    }, []);
    const setSelectedCategory = useStore((s) => s.setCategoryId);
    return (
        <div className=" mt-3">
            <Label>Category</Label>
            <Select onValueChange={(v) => setSelectedCategory(Number(v))}>
                <SelectTrigger className="h-[40px]">
                    <SelectValue placeholder="Category"></SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-[400px]">
                    {allCategories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

async function fetchCategories() {
    const { data } = await apiInstance.get("/categories");
    return data as Category[];
}

type Category = {
    id: number;
    name: string;
    image: string;
    createdAt: string;
};
