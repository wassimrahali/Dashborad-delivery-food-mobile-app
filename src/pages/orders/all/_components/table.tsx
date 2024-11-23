import { Button } from "@/components/ui/button";
import { apiInstance } from "@/lib/axios";
import { formatDate } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp, Eye, Package } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import OrderLocation from "./orderLocation";
import Status from "./status";
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
    const navigate = useNavigate();

    const toggleDropdown = (orderId: number) => {
        setOpenDropdowns((prev) =>
            prev.includes(orderId)
                ? prev.filter((id) => id !== orderId)
                : [...prev, orderId]
        );
    };

    const validateOrder = (orderId: number) => {
        toast.loading("loading...");

        apiInstance
            .patch(`/orders/update-status/${orderId}`, {
                status: "VALIDATED",
            })
            .then(() => {
                toast.dismiss();
                toast.success("Updated successfully");
                navigate(0);
            })
            .catch(() => {
                toast.dismiss();
                toast.error("There is an error");
            });
    };

    // const refuseOrder = (orderId: number) => {
    //     toast.loading("loading...");

    //     apiInstance
    //         .patch(`/orders/update-status/${orderId}`, {
    //             status: "NOT_VALIDATED",
    //         })
    //         .then(() => {
    //             toast.dismiss();
    //             toast.success("Updated successfully");
    //             navigate(0);
    //         })
    //         .catch(() => {
    //             toast.dismiss();
    //             toast.error("There is an error");
    //         });
    // };

    return (
        <div className="w-full px-10 bg-white shadow-md pb-10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full mt-5 rounded-2xl overflow-hidden">
                    <thead className="bg-mainColor/20">
                        <tr>
                            <th className="px-6 py-3 text-center font-bold text-sm tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-center font-bold text-sm tracking-wider">
                                Total Price
                            </th>
                            <th className="px-6 py-3 text-center font-bold text-sm tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-center font-bold text-sm tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-center font-bold text-sm tracking-wider">
                                Delivery Person
                            </th>
                            <th className="px-6 py-3 text-center font-bold text-sm tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-center font-bold text-sm tracking-wider">
                                Items
                            </th>
                            <th className="px-6 py-3 text-center font-bold text-sm tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y border">
                        {orders.map((order) => (
                            <React.Fragment key={order.id}>
                                <tr className="text-center">
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
                                        {order.totalPrice} DT
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <OrderLocation
                                            location={order.location}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {order.status && (
                                            <Status
                                                status={order?.status as any}
                                            />
                                        )}
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
                                    <td className="px-6 font-medium py-4 whitespace-nowrap text-sm text-gray-700">
                                        {
                                            formatDate(order.createdAt)
                                                .fullDateTime
                                        }
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
                                                <ChevronUp className="w-4 h-4 transition-transform duration-200" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                                            )}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-2 scale-95 pr-2">
                                            {order.status ===
                                                "NOT_VALIDATED" && (
                                                <Button
                                                    onClick={() => {
                                                        validateOrder(order.id);
                                                    }}
                                                    className="bg-green-500 active:scale-95 transition-all hover:bg-green-600 p-2 text-white rounded-md">
                                                    <Check className="w-5 h-5 stroke-[3]" />
                                                </Button>
                                            )}
                                            <Link
                                                to={`/orders/${order.id}`}
                                                className="bg-blue-500 active:scale-95 transition-all hover:bg-blue-600 p-2 text-white rounded-md">
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                            <DeleteBtn id={order.id} />
                                            {/* <button
                                                onClick={() => {
                                                    refuseOrder(order.id);
                                                }}
                                                className={cn(
                                                    "bg-red-500  active:scale-95 transition-all hover:bg-red-600 p-2 text-white rounded-md"
                                                )}>
                                                <X className="w-5 h-5" />
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>
                                <tr className="transition-all ">
                                    <td colSpan={9} className="p-0">
                                        <div
                                            className={`transform transition-all  origin-top ${
                                                openDropdowns.includes(order.id)
                                                    ? "scale-y-100 opacity-100"
                                                    : "scale-y-0 opacity-0 h-0"
                                            }`}>
                                            <div className="bg-gray-50 p-4">
                                                <h4 className="text-sm font-semibold mb-4">
                                                    Order Items
                                                </h4>
                                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {order.orderItems.map(
                                                        (item) => (
                                                            <div
                                                                key={item.id}
                                                                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
