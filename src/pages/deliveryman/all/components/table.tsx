
import { Eye, PenBox } from "lucide-react";
import { Link } from "react-router-dom";
import { DeliveryMan } from '../all';
import DeleteBtn from './DeleteBtn';
type Props = {
    delivery: DeliveryMan[];
};
export default function DeliveryTable({ delivery }: Props) {
    return (
        <div className="w-full px-10 bg-white shadow-md pb-10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full mt-5 rounded-2xl overflow-hidden">
                    <thead className="bg-mainColor/20">
                        <tr>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Phone
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Salary
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Created At
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y border">
                        {delivery.map((delivery) => (
                            <tr key={delivery.id} className="text-center">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                    {delivery.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                    {delivery.phone}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                    {delivery.salary}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                    {new Date(
                                        delivery.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <Link
                                            to={`/drivers/${delivery.id}`}
                                            className="bg-blue-500 active:scale-95 transition-all hover:bg-blue-600 p-2 text-white rounded-md">
                                            <Eye className="w-5 h-5" />
                                        </Link>
                                        <DeleteBtn id={delivery.id} />

                                        <Link
                                            to={`/products/update/${delivery.id}`}
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


