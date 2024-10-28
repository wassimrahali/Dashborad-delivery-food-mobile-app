import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

type Props = {
    file: File | undefined;
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
    className?: string;
};
export default function ImageUploader({ file, setFile, className }: Props) {
    const [previewUrl, setPreviewUrl] = useState("");

    return (
        <div
            className={cn(
                "shadow-[0px_0px_20px] h-[450px] flex flex-col rounded-xl shadow-neutral-100",
                className
            )}>
            <div className="hover:bg-neutral-100 transition-colors px-5 pt-5 rounded-t-xl flex-grow h-[310px] relative border-2">
                {previewUrl && (
                    <img
                        alt=""
                        src={previewUrl}
                        className="absolute top-1/2 left-1/2 w-full object-contain h-full -translate-x-1/2 -translate-y-1/2 z-40"
                    />
                )}
                <input
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setFile(file);
                            setPreviewUrl(URL.createObjectURL(file));
                        }
                    }}
                    accept="image/*"
                    type="file"
                    className="w-full h-full absolute opacity-0 hover:cursor-pointer z-40 border-2 left-0 top-0"
                />
                {!file && (
                    <>
                        <UploadCloud className="w-[160px] mx-auto mt-20 opacity-30 stroke-[1.5] h-[160px]" />
                        <p className="text-center font-semibold opacity-50 text-[18px]">
                            Drag and drop your image here
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
