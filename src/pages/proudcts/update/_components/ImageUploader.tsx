import { imageUpload } from "@/lib/image-upload";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useStore from "../store";

export default function ImageUploader(props: { className?: string }) {
    // global state
    const setMainImageUrl = useStore((s) => s.setMainImage);
    const mainImageUrl = useStore((s) => s.mainImage);
    const setOtherImagesUrls = useStore((s) => s.setOtherImages);
    const otherImagesUrls = useStore((s) => s.otherImages);

    const [isUploadingMain, setIsUploadingMain] = useState(false);
    const [isUploadingSecondary, setIsUploadingSecondary] = useState(false);

    const [mainPreview, setMainPreview] = useState<string | null>(null);
    const [secondaryPreviews, setSecondaryPreviews] = useState<string[]>([]);

    const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isUploadingMain) {
            return;
        }
        const file = e.target.files?.[0];
        if (file) {
            if (mainPreview) {
                URL.revokeObjectURL(mainPreview);
            }
            setMainPreview(URL.createObjectURL(file));
            setIsUploadingMain(true);
            toast.loading("Uploading your image...");

            imageUpload(file)
                .then((data) => {
                    toast.dismiss();
                    toast.success("Image uploaded successfully.");
                    setMainImageUrl(data);
                })
                .catch(() => {
                    toast.dismiss();
                    toast.error("Error while uploading your image...");
                    if (mainPreview) URL.revokeObjectURL(mainPreview);
                })
                .finally(() => {
                    setIsUploadingMain(false);
                });
        }
    };

    const handleSecondaryImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (isUploadingSecondary) {
            return;
        }
        const files = Array.from(e.target.files || []);

        files.forEach((file) => {
            const previewUrl = URL.createObjectURL(file);
            setSecondaryPreviews((prev) => [...prev, previewUrl]);
        });
        // handling the upload

        const uploadPromises = files.map(async (f) => {
            return await imageUpload(f);
        });

        toast.loading("uploading your iamges ...");
        setIsUploadingSecondary(true);

        Promise.all(uploadPromises)
            .then((data) => {
                toast.dismiss();
                toast.success("Uploaded successfully");
                setOtherImagesUrls([...otherImagesUrls, ...data]);
                setSecondaryPreviews([]);
            })
            .catch((err) => {
                toast.dismiss();
                console.error(err);
                toast.error("Error while uploading the image");
                setSecondaryPreviews([]);
            })
            .finally(() => setIsUploadingSecondary(false));
    };

    const handleRemoveSecondaryImage = (index: number) => {
        if (isUploadingSecondary) {
            return;
        }
        URL.revokeObjectURL(secondaryPreviews[index]);
        setSecondaryPreviews((prev) => prev.filter((_, i) => i !== index));
        setOtherImagesUrls(otherImagesUrls.filter((_, i) => i !== index));
    };

    return (
        <div
            className={cn(
                "shadow-[0px_0px_20px] h-[450px] flex flex-col rounded-xl shadow-neutral-100",
                props.className
            )}>
            <div className="hover:bg-neutral-100 transition-colors px-5 pt-5 rounded-t-xl flex-grow h-[310px] relative border-2">
                <img
                    alt=""
                    src={mainPreview || mainImageUrl!}
                    className="absolute top-1/2 left-1/2 w-full object-contain h-full -translate-x-1/2 -translate-y-1/2 z-40"
                />

                <input
                    onChange={handleMainImageUpload}
                    accept="image/*"
                    type="file"
                    className="w-full h-full absolute opacity-0 hover:cursor-pointer z-40 border-2 left-0 top-0"
                />
            </div>
            <div className="h-[110px] w-full border-b-2 border-x-2 py-2 px-2 rounded-b-xl flex overflow-x-auto">
                {otherImagesUrls.map((preview, index) => (
                    <div key={index} className="relative mr-2 h-full">
                        <img
                            src={preview}
                            alt={`Secondary preview ${index + 1}`}
                            className="h-full w-[90px] object-contain rounded-md"
                        />
                        <button
                            onClick={() => handleRemoveSecondaryImage(index)}
                            className="absolute top-1 right-1 bg-red-500 rounded-full p-1">
                            <X size={12} color="white" />
                        </button>
                    </div>
                ))}
                {secondaryPreviews.map((preview, index) => (
                    <div key={index} className="relative mr-2 h-full">
                        <img
                            src={preview}
                            alt={`Secondary preview ${index + 1}`}
                            className="h-full w-[90px] object-contain rounded-md"
                        />
                        <button
                            onClick={() => handleRemoveSecondaryImage(index)}
                            className="absolute top-1 right-1 bg-red-500 rounded-full p-1">
                            <X size={12} color="white" />
                        </button>
                    </div>
                ))}
                <div className="border-2 relative text-6xl text-black/30 flex items-center justify-center rounded-md border-dashed border-black/20 h-full w-[90px] min-w-[90px]">
                    <input
                        onChange={handleSecondaryImageUpload}
                        accept="image/*"
                        type="file"
                        multiple
                        className="w-full h-full absolute opacity-0 hover:cursor-pointer z-40"
                    />
                    +
                </div>
            </div>
        </div>
    );
}
