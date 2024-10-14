import { Sidebar } from "@/components/shared/sidebar";

export default function Home() {
    return (
        <main className="flex">
            {" "}
            <Sidebar selected="Dashboard" />
        </main>
    );
}
