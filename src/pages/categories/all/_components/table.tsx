import { Eye, PenBox } from "lucide-react";
import { Link } from "react-router-dom";
import { Category } from "../all";
import DeleteCategoryBtn from "./DeleteBtn";

type Props = {
    categories: Category[];
};
export default function Table({ categories }: Props) {
    return (
        <div className="w-full px-10 bg-white shadow-md pb-10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full mt-5 rounded-2xl overflow-hidden">
                    <thead className="bg-mainColor/20 ">
                        <tr>
                            <th className="px-6 py-5 text-center  font-bold text-sm   tracking-wider">
                                Image
                            </th>
                            <th className="px-6 py-5 text-center  font-bold text-sm   tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-5 text-center  font-bold text-sm   tracking-wider">
                                Prouduct count
                            </th>
                            <th className="px-6 py-5 text-center  font-bold text-sm   tracking-wider">
                                Created At
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y  border">
                        {categories.map((category) => (
                            <tr key={category.id} className="text-center">
                                <td className="px-6 py-4  text-sm font-medium ">
                                    <img
                                        alt=""
                                        src={category.image}
                                        className="bg-gray-100 mx-auto rounded-md  w-16 h-16"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                    {category.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {category.products.length}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                    {new Date(
                                        category.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <Link
                                            to={`/categories/${category.id}`}
                                            className="bg-blue-500   active:scale-95 transition-all hover:bg-blue-600 p-2 text-white rounded-md">
                                            <Eye className="w-5 h-5" />
                                        </Link>
                                        <DeleteCategoryBtn id={category.id} />
                                        <Link
                                            to={`/categories/update/${category.id}`}
                                            className="bg-stone-700 ml-2 active:scale-95 transition-all hover:bg-stone-800 p-2 text-white rounded-md">
                                            <PenBox className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
