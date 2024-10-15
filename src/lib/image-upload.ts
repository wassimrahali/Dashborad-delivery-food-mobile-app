import toast from "react-hot-toast";
import { apiInstance } from "./axios";

export const imageUpload = async (file: File) => {
    const formData = new FormData();
    if (file) {
        formData.append("image", file);
    }
    try {
        const response = await apiInstance.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.secure_url;
    } catch (error) {
        toast.error("An error occurred during image upload");
    }
};
