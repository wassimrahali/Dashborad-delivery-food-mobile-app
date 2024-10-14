import { cn } from "@/lib/utils";
import { Info, UploadCloud, X } from "lucide-react";
import { useState, useCallback } from "react";
import useStore from "../store";

export default function ImageUploader(props: { className?: string }) {
    const [mainPreview, setMainPreview] = useState<string | null>(null);
    const [secondaryPreviews, setSecondaryPreviews] = useState<string[]>([]);
    const setMainImage = useStore((s) => s.setMainImage);
    const addOtherImage = useStore((s) => s.addOtherImage);
    const removeOtherImage = useStore((s) => s.removeOtherImage);

    const handleMainImageUpload = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                setMainImage(file);
                if (mainPreview) {
                    URL.revokeObjectURL(mainPreview);
                }
                setMainPreview(URL.createObjectURL(file));
            }
        },
        [setMainImage, mainPreview]
    );

    const handleSecondaryImageUpload = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files || []);
            files.forEach((file) => {
                addOtherImage(file);
                const previewUrl = URL.createObjectURL(file);
                setSecondaryPreviews((prev) => [...prev, previewUrl]);
            });
        },
        [addOtherImage]
    );

    const handleRemoveSecondaryImage = useCallback(
        (index: number) => {
            removeOtherImage(index);
            URL.revokeObjectURL(secondaryPreviews[index]);
            setSecondaryPreviews((prev) => prev.filter((_, i) => i !== index));
        },
        [removeOtherImage, secondaryPreviews]
    );

    return (
        <div
            className={cn(
                "shadow-[0px_0px_20px] h-[450px] flex flex-col rounded-xl shadow-neutral-100",
                props.className
            )}>
            <div className="hover:bg-neutral-100 transition-colors px-5 pt-5 rounded-t-xl flex-grow h-[310px] relative border-2">
                {mainPreview && (
                    <img
                        alt=""
                        src={mainPreview}
                        className="absolute top-1/2 left-1/2 w-full object-contain h-full -translate-x-1/2 -translate-y-1/2 z-40"
                    />
                )}
                {!mainPreview && (
                    <div className="flex items-center text-black font-semibold text-[20px]">
                        Product images <Info className="ml-auto opacity-40" />
                    </div>
                )}
                <input
                    onChange={handleMainImageUpload}
                    accept="image/*"
                    type="file"
                    className="w-full h-full absolute opacity-0 hover:cursor-pointer z-40 border-2 left-0 top-0"
                />
                {!mainPreview && (
                    <>
                        <UploadCloud className="w-[160px] mx-auto mt-8 opacity-30 stroke-[1.5] h-[160px]" />
                        <p className="text-center font-semibold opacity-50 text-[18px]">
                            Glissez et déposez l&apos;image ici
                        </p>
                    </>
                )}
            </div>
            <div className="h-[110px] w-full border-b-2 border-x-2 py-2 px-2 rounded-b-xl flex overflow-x-auto">
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
