import TopBar from "@/components/shared/topBar";
import Buttons from "./_components/Button";
import GeneralInfo from "./_components/GeneralInfo";
export default function AddDeliveryman() {
    return (
        <main className="flex ">
            <section className="w-full pb-10">
                <TopBar text="Add new deliveryman">
                    <Buttons />
                </TopBar>
                <section className="grid gap-8 grid-cols-2 h-auto pt-5 px-10  w-full  ">
                    <GeneralInfo />
                </section>
            </section>
        </main>
    );
}
