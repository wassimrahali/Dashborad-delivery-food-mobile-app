import SaveAndCancelBtns from "@/components/shared/saveAndCancelBtns";
import { Sidebar } from "@/components/shared/sidebar";
import TopBar from "@/components/shared/topBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ImageUploader from "./_components/ImageUploader";
import { apiInstance } from "@/lib/axios";
import { imageUpload } from "@/lib/image-upload";

export default function AddCategory() {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File>();
    const [name, setName] = useState("");

    const handleSubmit = async () => {
        if (!file) {
            return toast.error("Image is empty");
        }
        if (!name) {
            return toast.error("Name is empty");
        }
        setIsLoading(true);
        toast.loading("Creating your category.... ");
        try {
            const url = await imageUpload(file);
            if (!url) {
                toast.dismiss();
                toast.error("Error while uploading the image");
            }
            await apiInstance.post("/categories", {
                name,
                image: url,
            });
            toast.dismiss();
            toast.success("Created successfully");
        } catch (error) {
            toast.dismiss();
            toast.error("Error while creating the category");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex">
            <Sidebar selected="Categories" />
            <section className="w-full">
                <TopBar text="Add new category">
                    <SaveAndCancelBtns
                        disabled={isLoading}
                        onSaveClick={handleSubmit}
                        className="ml-auto"
                    />
                </TopBar>
                <form
                    className="w-full px-10 pt-5"
                    onSubmit={(e) => e.preventDefault()}>
                    <div className="mt-5">
                        <Label>Category name</Label>
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Name"
                            className="mt-1"
                            type="text"
                        />
                    </div>
                    <div className="mt-4">
                        <Label>Category image</Label>
                        <ImageUploader
                            file={file}
                            setFile={setFile}
                            className="mt-1"
                        />
                    </div>
                </form>
            </section>
            <span className="font-semibold">
                <Toaster position="top-center" reverseOrder={false} />{" "}
            </span>
        </main>
    );
}
