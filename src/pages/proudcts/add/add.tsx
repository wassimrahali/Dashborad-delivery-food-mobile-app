import SaveAndCancelBtns from "@/components/shared/saveAndCancelBtns";
import { Sidebar } from "@/components/shared/sidebar";
import Details from "./_components/Details";
import GeneralInfo from "./_components/GeneralInfo";
import ImageUploader from "./_components/ImageUploader";
import TopBar from "@/components/shared/topBar";

export default function AddProduct() {
    return (
        <main className="flex ">
            <Sidebar selected="Products" />
            <section className="w-full pb-10">
                <TopBar text="Add new product">
                    <SaveAndCancelBtns className="ml-auto" />
                </TopBar>
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
