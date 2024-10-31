import LoadingPage from "@/components/shared/LoadingPage";
import TopBar from "@/components/shared/topBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiInstance } from "@/lib/axios";
import { PlusSquare, Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Table from "./_components/table";

export default function AllCategories() {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories()
            .then((data) => setCategories(data))
            .catch(() => {
                toast.error("Il ya des erreurs...");
            })
            .finally(() => setIsLoading(false));
    }, []);
    if (isLoading) {
        return <LoadingPage />;
    }
    return (
        <main className="flex">
            <section className="w-full">
                <TopBar text="All categories"></TopBar>
                <div className="h-[80px] px-10 flex items-center  border">
                    <div className="w-[400px] relative">
                        <Search className="absolute top-1/2 left-2 w-5 -translate-y-1/2 opacity-40" />
                        <Input
                            type="text"
                            className="pl-8 focus-visible:pl-9"
                            autoComplete="off"
                            placeholder="Search"
                        />
                    </div>
                    <Link to={"/categories/add"} className="ml-auto">
                        <Button className="ml-auto opacity-90 bg-zinc-800 font-medium text-sm h-[40px]">
                            <PlusSquare className="stroke-[2] mr-2  w-5" /> Add
                            Category
                        </Button>
                    </Link>
                </div>
                <Table categories={categories} />
            </section>
        </main>
    );
}

async function fetchCategories() {
    const { data } = await apiInstance.get("/categories");
    return data as Category[];
}
export type Category = {
    id: number;
    name: string;
    image: string;
    createdAt: string;
    products: any[];
};
