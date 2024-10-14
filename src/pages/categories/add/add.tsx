import { Sidebar } from "@/components/shared/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "./_components/ImageUploader";
import SaveAndCancelBtns from "@/components/shared/saveAndCancelBtns";
import TopBar from "@/components/shared/topBar";

export default function AddCategory() {
    return (
        <main className="flex">
            <Sidebar selected="Categories" />
            <section className="w-full">
                <TopBar text="Add new category">
                    <SaveAndCancelBtns className="ml-auto" />
                </TopBar>
                <form
                    className="w-full px-10 pt-5"
                    onSubmit={(e) => e.preventDefault()}>
                    <div className="mt-5">
                        <Label>Category name</Label>
                        <Input
                            placeholder="Name"
                            className="mt-1"
                            type="text"
                        />
                    </div>
                    <div className="mt-4">
                        <Label>Category image</Label>
                        <ImageUploader className="mt-1" />
                    </div>
                </form>
            </section>
        </main>
    );
}
