import React, { useState } from "react";
import {
    Eye,
    PenBox,
    ChevronDown,
    ChevronUp,
    MapPin,
    Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";

type Props = {
    orders: Array<{
        id: number;
        totalPrice: string;
        status: string;
        location: string;
        createdAt: string;
        customer: {
            name: string;
            phone: string;
        };
        deliveryMan: {
            name: string;
            phone: string;
        };
        orderItems: Array<{
            id: number;
            product: {
                id: number;
                name: string;
                mainImage: string;
                price: string;
                description: string;
                preparationDuration: string;
                rating: string;
                sizes: string[];
            };
            quantity: number;
        }>;
    }>;
};

export default function OrdersTable({ orders }: Props) {
    const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

    const toggleDropdown = (orderId: number) => {
        setOpenDropdowns((prev) =>
            prev.includes(orderId)
                ? prev.filter((id) => id !== orderId)
                : [...prev, orderId]
        );
    };

    return (
        <div className="w-full px-10 bg-white shadow-md pb-10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full mt-5 rounded-2xl overflow-hidden">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Total Price
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Delivery Person
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Items
                            </th>
                            <th className="px-6 py-5 text-center font-bold text-sm tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y border">
                        {orders.map((order) => (
                            <React.Fragment key={order.id}>
                                <tr className="text-center">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        #{order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">
                                                {order.customer.name}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {order.customer.phone}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                        ${order.totalPrice}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-1">
                                            <MapPin className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">
                                                {order.location}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${
                                                order.status === "PENDING"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : ""
                                            }
                                            ${
                                                order.status === "DELIVERED"
                                                    ? "bg-green-100 text-green-800"
                                                    : ""
                                            }
                                            ${
                                                order.status === "CANCELLED"
                                                    ? "bg-red-100 text-red-800"
                                                    : ""
                                            }
                                        `}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {order.deliveryMan ? (
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-700">
                                                    {order.deliveryMan.name}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {order.deliveryMan.phone}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-500">
                                                Not Assigned
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() =>
                                                toggleDropdown(order.id)
                                            }
                                            className="flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-all">
                                            <Package className="w-4 h-4" />
                                            <span className="text-sm font-medium">
                                                {order.orderItems.length}
                                            </span>
                                            {openDropdowns.includes(
                                                order.id
                                            ) ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                to={`/orders/${order.id}`}
                                                className="bg-blue-500 active:scale-95 transition-all hover:bg-blue-600 p-2 text-white rounded-md">
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                            <DeleteBtn id={order.id} />
                                            <Link
                                                to={`/orders/update/${order.id}`}
                                                className="bg-stone-700 active:scale-95 transition-all hover:bg-stone-800 p-2 text-white rounded-md">
                                                <PenBox className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                                {openDropdowns.includes(order.id) && (
                                    <tr>
                                        <td colSpan={9} className="bg-gray-50">
                                            <div className="p-4">
                                                <h4 className="text-sm font-semibold mb-4">
                                                    Order Items
                                                </h4>
                                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {order.orderItems.map(
                                                        (item) => (
                                                            <div
                                                                key={item.id}
                                                                className="bg-white p-4 rounded-lg shadow-sm">
                                                                <div className="flex gap-4">
                                                                    <img
                                                                        src={
                                                                            item
                                                                                .product
                                                                                .mainImage
                                                                        }
                                                                        alt={
                                                                            item
                                                                                .product
                                                                                .name
                                                                        }
                                                                        className="w-24 h-24 object-cover rounded-md"
                                                                    />
                                                                    <div className="flex flex-col flex-1">
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <h5 className="text-sm font-semibold text-gray-800">
                                                                                {
                                                                                    item
                                                                                        .product
                                                                                        .name
                                                                                }
                                                                            </h5>
                                                                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                                                x
                                                                                {
                                                                                    item.quantity
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                                            {
                                                                                item
                                                                                    .product
                                                                                    .description
                                                                            }
                                                                        </p>
                                                                        <div className="flex justify-between items-center mt-auto">
                                                                            <span className="text-sm font-semibold text-gray-700">
                                                                                $
                                                                                {
                                                                                    item
                                                                                        .product
                                                                                        .price
                                                                                }
                                                                            </span>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-xs text-gray-500">
                                                                                    Prep
                                                                                    time:
                                                                                </span>
                                                                                <span className="text-xs font-medium text-gray-700">
                                                                                    {
                                                                                        item
                                                                                            .product
                                                                                            .preparationDuration
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
