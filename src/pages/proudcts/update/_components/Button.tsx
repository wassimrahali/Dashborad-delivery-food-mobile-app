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
                console.log(product);
            })
            .catch(() => toast.error("Product was not found"))
            .finally(() => props.stopPageLoading());
    }, []);

    const handleSave = async () => {
        const payoad = {
            name: data.name,
            mainImage: data.mainImage,
            price: data.price,
            otherImages: data.otherImages,
            description: data.description,
            preparationDuration: data.duration + "min",
            rating: data.rating,
            sizes: data.sizes,
            categoryId: data.categoryId,
        };

        const { error, success } = ProductSchema.safeParse(payoad);
        error?.errors.forEach((err) =>
            toast.error(`${err.path.join(" / ")} ${err.message}`)
        );

        if (!success) {
            return;
        }

        toast.loading("Creating your product");
        setIsLoading(true);
        apiInstance
            .post("/products", payoad)
            .then(() => {
                toast.dismiss();
                toast.success("Product created successfully");
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
