import LoadingPage from "@/components/shared/LoadingPage";
import TopBar from "@/components/shared/topBar";
import { Button } from "@/components/ui/button";
import { apiInstance } from "@/lib/axios";
import { Calendar, Clock, DollarSign, Edit, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

export default function ProductDetails() {
    const params = useParams();
    const id = params.id;
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<Product>();
    useEffect(() => {
        apiInstance
            .get(`/products/${id}`)
            .then((data) => setProduct(data.data))
            .catch(() => toast.error("there is some errors"))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }
    return (
        <main className="flex">
            <div className="w-full ">
                <TopBar text="Product details" />
                <div className="p-10">
                    <div className="container p-10 mx-auto w-full   bg-white border rounded-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">
                                {product?.name}
                            </h1>
                            <Link to={`/products/update/${id}`}>
                                <Button className="bg-blue-500 font-medium  text-white px-4 py-2 rounded-md hover:bg-blue-600    flex items-center">
                                    <Edit className="mr-2" size={18} />
                                    Edit Product
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Main Image */}
                            <div className="md:col-span-1">
                                <img
                                    src={product?.mainImage}
                                    alt={product?.name}
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="md:col-span-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoCard
                                        icon={<DollarSign />}
                                        title="Price"
                                        value={`$${product?.price}`}
                                    />
                                    <InfoCard
                                        icon={<ShoppingBag />}
                                        title="Category"
                                        value={product?.category.name}
                                    />
                                    <InfoCard
                                        icon={<Clock />}
                                        title="Prep Time"
                                        value={product?.preparationDuration}
                                    />
                                    <InfoCard
                                        icon={<Calendar />}
                                        title="Created At"
                                        value={new Date(
                                            product?.createdAt!
                                        ).toLocaleDateString()}
                                    />
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-semibold mb-2">
                                        Description:
                                    </h3>
                                    <p className="text-gray-600">
                                        {product?.description}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <h3 className="font-semibold mb-2">
                                        Available Sizes:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product?.sizes.map((size, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                                                {size}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Other Images */}
                        <div className="mt-8">
                            <h3 className="font-semibold mb-4">
                                Other Images:
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {product?.otherImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${product?.name} ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-md shadow-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

const InfoCard = ({ icon, title, value }: any) => (
    <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center mb-2">
            {icon}
            <h3 className="ml-2 font-semibold">{title}</h3>
        </div>
        <p className="text-lg">{value}</p>
    </div>
);

export type Product = {
    id: number;
    name: string;
    mainImage: string;
    price: string;
    otherImages: string[];
    description: string;
    preparationDuration: string;
    rating: string;
    createdAt: string;
    sizes: string[];
    categoryId: number;
    category: {
        id: number;
        name: string;
        image: string;
        createdAt: string;
    };
};
