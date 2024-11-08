import LoadingPage from "@/components/shared/LoadingPage";
import TopBar from "@/components/shared/topBar";
import { Input } from "@/components/ui/input";
import { apiInstance } from "@/lib/axios";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Table from "./_components/table";

export default function AllOrders() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        fetchData()
            .then((data) => setOrders(data))
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
                <TopBar text="All orders"></TopBar>
                <div className="h-[80px] px-10 flex items-center border bg-gray-50/50">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setIsLoading(true);
                            fetchData(searchInput)
                                .then((data) => setOrders(data))
                                .catch(() => {
                                    toast.error("Il ya des erreurs...");
                                })
                                .finally(() => setIsLoading(false));
                        }}
                        className="w-[400px] flex gap-2 relative group">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 w-4 h-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-gray-900" />
                            <Input
                                value={searchInput}
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        setIsLoading(true);
                                        fetchData()
                                            .then((data) => setOrders(data))
                                            .catch(() => {
                                                toast.error(
                                                    "Il ya des erreurs..."
                                                );
                                            })
                                            .finally(() => setIsLoading(false));
                                    }
                                    setSearchInput(e.target.value);
                                }}
                                type="text"
                                className="pl-10 pr-8  h-10 bg-stone-100  !border-2 rounded-lg placeholder:text-sm shadow-stone-200 transition-all "
                                autoComplete="off"
                                placeholder="Search orders by customer name..."
                            />
                            {!!searchInput && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchInput("");
                                        setIsLoading(true);
                                        fetchData()
                                            .then((data) => setOrders(data))
                                            .catch(() => {
                                                toast.error(
                                                    "Il ya des erreurs..."
                                                );
                                            })
                                            .finally(() => setIsLoading(false));
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors">
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <Table orders={orders} />
            </section>
        </main>
    );
}

async function fetchData(searchValue?: string) {
    const { data } = await apiInstance.get(
        `/orders?searchValue=${searchValue || ""}`
    );
    return data as Order[];
}

export type Order = {
    id: number;
    totalPrice: string;
    status: string;
    location: string;
    customerId: number;
    deliveryManId: number;
    createdAt: string;
    customer: {
        id: number;
        phone: string;
        name: string;
        email: string;
        password: string;
        resetCode: string;
        resetCodeExpiry: string;
        createdAt: string;
    };
    deliveryMan: {
        id: number;
        phone: string;
        name: string;
        password: string;
        salary: string;
        createdAt: string;
    };
    orderItems: Array<{
        id: number;
        product: {
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
        };
        quantity: number;
        productId: number;
        orderId: number;
        createdAt: string;
    }>;
};
