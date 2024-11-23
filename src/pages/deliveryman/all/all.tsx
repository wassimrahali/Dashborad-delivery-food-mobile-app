import LoadingPage from "@/components/shared/LoadingPage";
import TopBar from "@/components/shared/topBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiInstance } from "@/lib/axios";
import { PlusSquare, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Table from "./components/table"
export type DeliveryMan={
    id:number,
    phone:string,
    name :string,
    password :string,
    salary:string,
    createdAt:string,
}
export default function AllDeliveryMan() {
    const [isLoading, setIsLoading] = useState(true);
    const [deliveryman, setProducts] = useState<DeliveryMan[]>([]);

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
                <TopBar text="All DeliveryMans"></TopBar>
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
                    <Link to={"/drivers/add"} className="ml-auto">
                        <Button className="ml-auto opacity-90 bg-zinc-800 font-medium text-sm h-[40px]">
                            <PlusSquare className="stroke-[2] mr-2  w-5" /> Add
                            Deliveryman
                        </Button>
                    </Link>
                </div>
                <Table delivery={deliveryman ?? []} />
            </section>
        </main>
    );
}

async function fetchCategories() {
    const { data } = await apiInstance.get("/auth/DileveryMan");
    console.log("data is ", data);
    return data as DeliveryMan[];
}
