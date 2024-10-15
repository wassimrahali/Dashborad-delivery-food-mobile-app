import { Sidebar } from "@/components/shared/sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AllProducts() {
    return (
        <main className="flex">
            <Sidebar selected="Products" />
            <section className="flex-grow justify-center flex items-center">
                <Link to={"/products/add"}>
                    <Button className="bg-zinc-700">add product</Button>
                </Link>
            </section>
        </main>
    );
}
