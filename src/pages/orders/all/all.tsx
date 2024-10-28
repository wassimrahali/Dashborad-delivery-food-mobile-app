import LoadingPage from "@/components/shared/LoadingPage";
import TopBar from "@/components/shared/topBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiInstance } from "@/lib/axios";
import { PlusSquare, Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Table from "./_components/table";

export default function AllOrders() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);

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
                </div>
                <Table orders={orders} />
            </section>
            <Toaster />
        </main>
    );
}

async function fetchData() {
    const { data } = await apiInstance.get("/orders");

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
