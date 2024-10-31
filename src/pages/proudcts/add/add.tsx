import TopBar from "@/components/shared/topBar";
import Buttons from "./_components/Button";
import Details from "./_components/Details";
import GeneralInfo from "./_components/GeneralInfo";
import ImageUploader from "./_components/ImageUploader";
export default function AddProduct() {
    return (
        <main className="flex ">
            <section className="w-full pb-10">
                <TopBar text="Add new product">
                    <Buttons />
                </TopBar>
                <section className="grid gap-8 grid-cols-2 h-auto pt-5 px-10  w-full  ">
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
