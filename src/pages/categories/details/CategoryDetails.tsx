import LoadingPage from "@/components/shared/LoadingPage";
import TopBar from "@/components/shared/topBar";
import { Button } from "@/components/ui/button";
import { apiInstance } from "@/lib/axios";
import { Calendar, Edit, Eye, Package, PenBox, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CategoryDetails() {
    const params = useParams();
    const id = params.id;
    const [category, setCategory] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiInstance
            .get(`/categories/${id}`)
            .then(({ data }) => {
                setCategory(data);
            })
            .finally(() => setIsLoading(false));
    }, []);
    if (isLoading) {
        return <LoadingPage />;
    }
    return (
        <main className="flex">
            <div className="w-full">
                <TopBar text="Detail Category" />
                <section className="p-10 w-full">
                    <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">
                                {category.name}
                            </h1>
                            <Link to={`/categories/update/${id}`}>
                                <Button className="bg-blue-500 font-medium text-white px-4 py-2  text-center rounded-md hover:bg-blue-600 flex items-center">
                                    <Edit className="mr-2" size={18} />
                                    Edit Category
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Category Image */}
                            <div className="md:col-span-1">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            </div>

                            {/* Category Details */}
                            <div className="md:col-span-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoCard
                                        icon={<Calendar />}
                                        title="Created At"
                                        value={new Date(
                                            category.createdAt
                                        ).toLocaleDateString()}
                                    />
                                    <InfoCard
                                        icon={<Package />}
                                        title="Total Products"
                                        value={category.products.length.toString()}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Products List */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">
                                Products in this Category
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2  text-center px-4 ">
                                                Image
                                            </th>
                                            <th className="py-2  text-center px-4 ">
                                                Name
                                            </th>
                                            <th className="py-2  text-center px-4 ">
                                                Price
                                            </th>
                                            <th className="py-2  text-center px-4 ">
                                                Created At
                                            </th>
                                            <th className="py-2  text-center px-4 ">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {category.products.map(
                                            (product: any) => (
                                                <tr
                                                    key={product.id}
                                                    className="border-b">
                                                    <td className="py-2  text-center px-4">
                                                        <img
                                                            src={
                                                                product.mainImage
                                                            }
                                                            alt={""}
                                                            className="w-12 mx-auto h-12 object-cover rounded-md"
                                                        />
                                                    </td>
                                                    <td className="py-2  text-center px-4">
                                                        {product.name}
                                                    </td>
                                                    <td className="py-2  text-center px-4">
                                                        ${product.price}
                                                    </td>
                                                    <td className="py-2  text-center px-4">
                                                        {new Date(
                                                            product.createdAt
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-center">
                                                            <Link
                                                                to={`/products/${product.id}`}
                                                                className="bg-blue-500 active:scale-95 transition-all hover:bg-blue-600 p-2 text-white rounded-md">
                                                                <Eye className="w-5 h-5" />
                                                            </Link>
                                                            <button className="bg-red-500 ml-2 active:scale-95 transition-all hover:bg-red-600 p-2 text-white rounded-md">
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                            <button className="bg-stone-700 ml-2 active:scale-95 transition-all hover:bg-stone-800 p-2 text-white rounded-md">
                                                                <PenBox className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
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
