import { Sidebar } from "@/components/shared/sidebar";
import GeneralInfo from "./_components/GeneralInfo";
import ImageUploader from "./_components/ImageUploader";
import Details from "./_components/Details";
import { Button } from "@/components/ui/button";

export default function AddProduct() {
    return (
        <main className="flex ">
            <Sidebar selected="Products" />
            <section className="w-full pb-10">
                <div className="flex items-center bg-white sticky top-0 justify-end px-10 gap-2 pt-10">
                    <Button
                        variant={"outline"}
                        className="bg-neutral-200 h-[40px]">
                        Cancel
                    </Button>
                    <Button className="h-[40px]">Save product</Button>
                </div>
                <section className="grid gap-8 grid-cols-2 pt-5 px-10  w-full  ">
                    <GeneralInfo />
                    <Details />
                </section>
                <section className="grid px grid-cols-1 px-10 mt-8">
                    <ImageUploader />
                </section>
            </section>
        </main>
    );
}
