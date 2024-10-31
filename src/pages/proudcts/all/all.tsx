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

export default function AllProducts() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchCategories()
            .then((data) => setProducts(data))
            .catch((err) => {
                console.error(err);
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
                <TopBar text="All products"></TopBar>
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
                    <Link to={"/products/add"} className="ml-auto">
                        <Button className="ml-auto opacity-90 bg-zinc-800 font-medium text-sm h-[40px]">
                            <PlusSquare className="stroke-[2] mr-2  w-5" /> Add
                            Product
                        </Button>
                    </Link>
                </div>
                <Table products={products ?? []} />
            </section>
        </main>
    );
}

async function fetchCategories() {
    const { data } = await apiInstance.get("/products");
    console.log("data is ", data);
    return data as Product[];
}
export type Product = {
    id: number;
    name: string;
    mainImage: string;
    price: string;
    otherImages: string[];
    description: string;
    preparationDuration: string;
    rating: string;
    createdAt: string;
    sizes: string[];
    categoryId: number;
    category: {
        id: number;
        name: string;
        image: string;
        createdAt: string;
    };
};
