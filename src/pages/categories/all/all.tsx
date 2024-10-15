import { Sidebar } from "@/components/shared/sidebar";
import TopBar from "@/components/shared/topBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusSquare, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function AllCategories() {
    return (
        <main className="flex">
            <Sidebar selected="Categories" />
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
            </section>
        </main>
    );
}
