import SaveAndCancelBtns from "@/components/shared/saveAndCancelBtns";
import useStore from "../store";
import { z } from "zod";
import toast from "react-hot-toast";
import { apiInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { wait } from "@/lib/utils";
import { useParams } from "react-router-dom";

type Props = {
    stopPageLoading: () => void;
};
export default function Buttons(props: Props) {
    const data = useStore();
    const [isLoading, setIsLoading] = useState(false);

    const productId = useParams().id;
    useEffect(() => {
        apiInstance
            .get(`/products/${productId}`)
            .then((res) => {
                const product = res.data as ApiProduct;
                data.setName(product.name);
                data.setCategoryId(product.category.id);
                data.setDescription(product.description);
                data.setDuration(
                    product.preparationDuration.split("min").join("")
                );
                data.setMainImage(product.mainImage);
                data.setOtherImages(product.otherImages);
                data.setPrice(Number(product.price));
                data.setRating(Number(product.rating));
                data.setSizes(product.sizes);
            })
            .catch(() => toast.error("Product was not found"))
            .finally(() => props.stopPageLoading());
    }, []);

    const handleSave = async () => {
        const payload = {
            name: data.name,
            mainImage: data.mainImage,
            price: data.price,
            otherImages: data.otherImages,
            description: data.description,
            preparationDuration: data.duration + "min",
            rating: data.rating,
            sizes: data.sizes,
            categoryId: data.categoryId,
            id: Number(productId),
        };

        const { error, success } = ProductSchema.safeParse(payload);
        error?.errors.forEach((err) =>
            toast.error(`${err.path.join(" / ")} ${err.message}`)
        );

        if (!success) {
            return;
        }

        toast.loading("Creating your product");
        setIsLoading(true);
        apiInstance
            .put(`/products/update/${productId}`, payload)
            .then(() => {
                toast.dismiss();
                toast.success("Product updated successfully");
                wait(100).then(() => window.location.reload());
            })
            .catch(() => {
                toast.dismiss();
                toast.error("Error while creating you product");
            })
            .finally(() => setIsLoading(false));
    };
    return (
        <SaveAndCancelBtns
            onSaveClick={handleSave}
            disabled={isLoading}
            className="ml-auto"
        />
    );
}

// Zod schema for product validation
const ProductSchema = z.object({
    name: z.string().min(1),
    mainImage: z.string().url(),
    price: z.number().positive(),
    otherImages: z.array(z.string().url()).default([]),
    description: z.string().default(""),
    preparationDuration: z.string(),
    rating: z.number().min(0).max(5).default(5),
    sizes: z.array(z.string()).default([]),
    categoryId: z.number().int().positive(),
    id: z.number(),
});

type ApiProduct = {
    id: number;
    name: string;
    mainImage: string;
    price: string;
    otherImages: string[];
    description: string;
    preparationDuration: string;
    rating: string;
    createdAt: string;
    sizes: [];
    category: {
        id: number;
        name: string;
        image: string;
        createdAt: string;
    };
};
